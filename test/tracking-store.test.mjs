import test from 'node:test';
import assert from 'node:assert/strict';
import {getTrackingSession,saveTrackingSession} from '../tracking-store.mjs';

test('guardian tracking session keeps movement and completion state',()=>{
 const id=`test-${Date.now()}`;
 saveTrackingSession(id,{progress:12,location:'303~306호 앞 하부 복도',completed:false,lastMovedAt:100});
 saveTrackingSession(id,{progress:100,location:'안전지대',completed:true});
 const session=getTrackingSession(id);
 assert.equal(session.progress,100);
 assert.equal(session.completed,true);
 assert.equal(session.lastMovedAt,100);
 assert.ok(session.updatedAt>0);
});
