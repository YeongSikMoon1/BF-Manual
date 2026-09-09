import express from 'express';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { invokeEvacuationAgent } from './evacuation-agent.mjs';

const root=dirname(fileURLToPath(import.meta.url));
const app=express();

async function loadEnv(){
 try{
  const text=await readFile(join(root,'.env'),'utf8');
  text.split(/\r?\n/).forEach(line=>{const match=line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);if(match&&!process.env[match[1]])process.env[match[1]]=match[2].trim()});
 }catch{}
}

await loadEnv();
app.use(express.json({limit:'256kb'}));
app.get('/api/public-config',(_req,res)=>res.json({kakaoJsKey:process.env.KAKAO_JS_KEY||''}));
app.post('/api/evacuation-guide',async(req,res)=>{
 try{
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'OPENAI_API_KEY가 설정되지 않았습니다.'});
  return res.json(await invokeEvacuationAgent(req.body));
 }catch(error){return res.status(500).json({error:error.message})}
});
app.use(express.static(root,{index:'index.html'}));
app.get('*path',(_req,res)=>res.sendFile(join(root,'index.html')));

if(!process.env.VERCEL)app.listen(8000,()=>console.log('BF Manual: http://localhost:8000'));

export default app;
