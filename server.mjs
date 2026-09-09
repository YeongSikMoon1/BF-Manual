import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { invokeEvacuationAgent } from './evacuation-agent.mjs';
const root=process.cwd(); const types={'.html':'text/html;charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png'};
async function loadEnv(){try{const text=await readFile(join(root,'.env'),'utf8');text.split(/\r?\n/).forEach(line=>{const match=line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);if(match&&!process.env[match[1]])process.env[match[1]]=match[2].trim()})}catch{}}
await loadEnv();
function json(res,status,data){res.writeHead(status,{'Content-Type':'application/json;charset=utf-8'});res.end(JSON.stringify(data))}
async function body(req){const chunks=[];for await(const chunk of req)chunks.push(chunk);return JSON.parse(Buffer.concat(chunks).toString('utf8'))}
createServer(async (req,res)=>{try{if(req.method==='POST'&&req.url==='/api/evacuation-guide'){if(!process.env.OPENAI_API_KEY)return json(res,503,{error:'OPENAI_API_KEY가 설정되지 않았습니다.'});const payload=await body(req);return json(res,200,await invokeEvacuationAgent(payload))}const path=normalize(join(root,decodeURIComponent(req.url==='/'?'/index.html':req.url)));if(!path.startsWith(root)){res.writeHead(403);return res.end()}const data=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'});res.end(data)}catch(error){if(req.url==='/api/evacuation-guide')return json(res,500,{error:error.message});res.writeHead(404);res.end('Not found')}}).listen(8000);
