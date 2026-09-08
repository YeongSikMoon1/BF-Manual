import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const root=process.cwd(); const types={'.html':'text/html;charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png'};
createServer(async (req,res)=>{try{const path=normalize(join(root,decodeURIComponent(req.url==='/'?'/index.html':req.url)));if(!path.startsWith(root)){res.writeHead(403);return res.end()}const data=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'});res.end(data)}catch{res.writeHead(404);res.end('Not found')}}).listen(8000);
