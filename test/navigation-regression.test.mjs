import test from 'node:test';
import assert from 'node:assert/strict';
import {advanceArDistance,floorData,isRouteSegmentClear,navigation,pathLength,shortestRoutes} from '../app.js';

function reachable(graph,start){
 const seen=new Set([start]),queue=[start];
 while(queue.length){const at=queue.shift();for(const [a,b] of graph.links){const next=a===at?b:b===at?a:null;if(next&&!seen.has(next)){seen.add(next);queue.push(next)}}}
 return seen;
}

function segmentCrossesInterior(a,b,[x1,y1,x2,y2]){
 for(let i=1;i<20;i++){const t=i/20,x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t;if(x>x1&&x<x2&&y>y1&&y<y2)return true}
 return false;
}

test('every floor keeps each room connected to a mapped exit',()=>{
 for(const [floor,graph] of Object.entries(navigation)){
  const exits=new Set(Object.values(graph.exitNodes));
  for(const [roomId,[,door,entry]] of Object.entries(graph.rooms)){
   assert.ok(graph.nodes[entry],`${floor}/${roomId}: missing corridor entry ${entry}`);
   assert.ok([...reachable(graph,entry)].some(node=>exits.has(node)),`${floor}/${roomId}: no connected exit`);
   assert.ok(door.length===2,`${floor}/${roomId}: missing hinged door`);
  }
  assert.ok(floorData[floor],`${floor}: missing floor metadata`);
 }
});

test('validated corridor links never cut through a room interior',()=>{
 for(const [floor,graph] of Object.entries(navigation))for(const [from,to] of graph.links){
  for(const [roomId,[bounds]] of Object.entries(graph.rooms))assert.equal(segmentCrossesInterior(graph.nodes[from],graph.nodes[to],bounds),false,`${floor} ${from}->${to} crosses ${roomId}`);
 }
});

test('2f lower rooms cannot route through turquoise walls to upper exits',()=>{
 const graph=navigation['2f'],upperExits=new Set(['nw','west','c1','hallExit','ne','east']);
 for(const roomId of ['208','209','210','211','212','213','214']){
  const entry=graph.rooms[roomId][2],connected=reachable(graph,entry);
  assert.equal([...upperExits].some(exit=>connected.has(exit)),false,`2f/${roomId}: crosses a turquoise wall to an upper exit`);
  assert.equal(connected.has('c2'),true,`2f/${roomId}: missing corridor to the exit left of room 208`);
  assert.equal(connected.has('se'),true,`2f/${roomId}: missing lower corridor to south-east exit`);
 }
});

function nearestExitWithoutHazards(floor,roomId){
 const graph=navigation[floor],room=graph.rooms[roomId],nodes={...graph.nodes,door:room[1]},links=[...graph.links,['door',room[2]]];
 const routes=shortestRoutes(nodes,links,{start:'door',isClear:()=>true});
 return floorData[floor].exits.map(exit=>({name:exit[0],path:routes[graph.exitNodes[exit[0]]]})).filter(item=>item.path).sort((a,b)=>pathLength(a.path.map(name=>nodes[name]))-pathLength(b.path.map(name=>nodes[name])))[0]?.name;
}

test('2f rooms choose the nearest reachable exit by corridor distance',()=>{
 const expected={201:'서북쪽 비상구',202:'서북쪽 비상구',203:'서북쪽 비상구',204:'동측 복도 비상구',205:'동측 복도 비상구',206:'동측 복도 비상구',207:'동측 복도 비상구',208:'중앙 비상구 2',209:'중앙 비상구 2',210:'중앙 비상구 2',211:'중앙 비상구 2',212:'동남쪽 비상구',213:'중앙 비상구 2',214:'중앙 비상구 2'};
 for(const [roomId,exit] of Object.entries(expected))assert.equal(nearestExitWithoutHazards('2f',roomId),exit,`2f/${roomId}: should use ${exit}`);
});

test('a fire or smoke radius blocks an intersecting route segment',()=>{
 const a=[0,0],b=[10,0],hazard={x:5,y:1,radius:2};
 assert.equal(isRouteSegmentClear(a,b,[hazard],0),false);
 assert.equal(isRouteSegmentClear(a,b,[{...hazard,y:4}],0),true);
});

test('AR distance stays fixed while an obstacle is detected',()=>{
 assert.deepEqual(advanceArDistance(12,{obstacle:true,heading:0,target:0}),{distance:12,reason:'obstacle'});
});

test('AR distance stays fixed when heading is wrong or unavailable',()=>{
 assert.deepEqual(advanceArDistance(12,{heading:180,target:0}),{distance:12,reason:'wrong-direction'});
 assert.deepEqual(advanceArDistance(12,{heading:null,target:0}),{distance:12,reason:'heading-unavailable'});
 assert.deepEqual(advanceArDistance(12,{heading:20,target:0}),{distance:11.3,reason:'advanced'});
});
