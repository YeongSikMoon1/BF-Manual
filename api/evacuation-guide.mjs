import { invokeEvacuationAgent } from '../evacuation-agent.mjs';

export default async function handler(request,response){
 if(request.method!=='POST')return response.status(405).json({error:'Method not allowed'});
 if(!process.env.OPENAI_API_KEY)return response.status(503).json({error:'OPENAI_API_KEY가 설정되지 않았습니다.'});
 try{return response.status(200).json(await invokeEvacuationAgent(request.body))}
 catch(error){return response.status(500).json({error:error.message})}
}
