import {getTrackingSession,saveTrackingSession} from '../tracking-store.mjs';

export default function handler(request,response){
 const id=String(request.query?.id||request.body?.id||'').replace(/[^a-zA-Z0-9_-]/g,'').slice(0,64);
 if(!id)return response.status(400).json({error:'추적 번호가 필요합니다.'});
 if(request.method==='GET'){
  const session=getTrackingSession(id);
  return session?response.status(200).json(session):response.status(404).json({error:'대피 현황을 찾을 수 없습니다.'});
 }
 if(request.method==='POST')return response.status(200).json(saveTrackingSession(id,request.body||{}));
 return response.status(405).json({error:'Method not allowed'});
}
