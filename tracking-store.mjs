const sessions=globalThis.__bfTrackingSessions||(globalThis.__bfTrackingSessions=new Map());
const TTL=1000*60*60*6;

export function saveTrackingSession(id,payload){
 const previous=sessions.get(id)||{};
 const session={...previous,...payload,id,updatedAt:Date.now()};
 sessions.set(id,session);
 for(const [key,value] of sessions)if(Date.now()-value.updatedAt>TTL)sessions.delete(key);
 return session;
}

export function getTrackingSession(id){return sessions.get(id)||null}
