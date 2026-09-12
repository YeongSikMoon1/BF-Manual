import test from 'node:test';
import assert from 'node:assert/strict';
import {advanceArDistance,arrowMode,chooseSafestRoute,directionFromRotation,floorData,isLargeBlockingObstacle,isRouteSegmentClear,navigation,pathLength,pointAlongPath,routeProgress,segmentAtProgress,shortestRoutes} from '../app.js';

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

test('2f maps actual room doors without crossing room 214 east wall',()=>{
 const graph=navigation['2f'];
 assert.equal(graph.rooms['201'][4],undefined,'2f/201: must not have a lower door');
 for(const roomId of ['202','203','204','205','206','207'])assert.equal(graph.rooms[roomId][4].length,1,`2f/${roomId}: missing lower door`);
 assert.deepEqual(graph.rooms['214'][4],[[[72,85],'r4']]);
});

test('2f rooms 208-214 cannot cross the lower glass wall or room 214 east wall',()=>{
 const graph=navigation['2f'];
 for(const roomId of ['208','209','210','211','212','213','214'])assert.equal(reachable(graph,graph.rooms[roomId][2]).has('se'),false,`2f/${roomId}: crosses a wall or glass`);
});

test('all surveyed hinged doors are mapped on every floor',()=>{
 const expected={
  b1:{'west-elevator':2,'control-room':2,'east-elevator':2},
  '1f':{hall1:3,hall2:3,hall3:3,multi:3},
  '2f':{'201':1,'202':2,'203':2,'204':2,'205':2,'206':2,'207':2,'208':1,'209':1,'210':1,'211':1,'212':1,'213':1,'214':2},
  '3f':{'301':1,'302':1,'303':1,'304':2,'305':1,'306':2,'307':4}
 };
 for(const [floor,rooms] of Object.entries(expected))for(const [roomId,count] of Object.entries(rooms)){
  const room=navigation[floor].rooms[roomId],portals=[[room[1],room[2]],...(room[4]||[])];
  assert.equal(portals.length,count,`${floor}/${roomId}: surveyed door count changed`);
  for(const [door,entry] of portals){assert.equal(door.length,2,`${floor}/${roomId}: invalid door coordinate`);assert.ok(navigation[floor].nodes[entry],`${floor}/${roomId}: missing corridor for door`)}
 }
});

function nearestExitWithoutHazards(floor,roomId){
 const graph=navigation[floor],room=graph.rooms[roomId],nodes={...graph.nodes,start:[(room[0][0]+room[0][2])/2,(room[0][1]+room[0][3])/2]},links=[...graph.links];
 [[room[1],room[2]],...(room[4]||[])].forEach(([door,entry],index)=>{nodes[`door${index}`]=door;links.push(['start',`door${index}`],[`door${index}`,entry])});
 const routes=shortestRoutes(nodes,links,{isClear:()=>true,terminalNodes:new Set(Object.values(graph.exitNodes))});
 return floorData[floor].exits.map(exit=>({name:exit[0],path:routes[graph.exitNodes[exit[0]]]})).filter(item=>item.path).sort((a,b)=>pathLength(a.path.map(name=>nodes[name]))-pathLength(b.path.map(name=>nodes[name])))[0]?.name;
}

test('2f rooms choose the nearest reachable exit by corridor distance',()=>{
 const expected={201:'서북쪽 비상구',202:'중앙 비상구 1',203:'중앙 비상구 1',204:'중앙 비상구 1',205:'중앙 비상구 1',206:'중앙 비상구 2',207:'중앙 비상구 2',208:'중앙 비상구 2',209:'중앙 비상구 2',210:'중앙 비상구 2',211:'중앙 비상구 2',212:'중앙 비상구 2',213:'중앙 비상구 2',214:'중앙 비상구 2'};
 for(const [roomId,exit] of Object.entries(expected))assert.equal(nearestExitWithoutHazards('2f',roomId),exit,`2f/${roomId}: should use ${exit}`);
});

test('route selection prioritizes hazard clearance before distance',()=>{
 const short={exit:['가까운 출구'],path:[[0,0],[5,0],[10,0]]},safe={exit:['안전한 출구'],path:[[0,0],[0,10],[10,10]]};
 assert.equal(chooseSafestRoute([short,safe],[{x:5,y:2,radius:1}]).exit[0],'안전한 출구');
 assert.equal(chooseSafestRoute([short,safe],[]).exit[0],'가까운 출구');
});

test('a fire or smoke radius blocks an intersecting route segment',()=>{
 const a=[0,0],b=[10,0],hazard={x:5,y:1,radius:2};
 assert.equal(isRouteSegmentClear(a,b,[hazard],0),false);
 assert.equal(isRouteSegmentClear(a,b,[{...hazard,y:4}],0),true);
});

test('AR distance stays fixed while an obstacle is detected',()=>{
 assert.deepEqual(advanceArDistance(12,{obstacle:true,heading:0,target:0}),{distance:12,reason:'obstacle'});
});

test('obstacle vision ignores small objects and keeps large central blockers',()=>{
 assert.equal(isLargeBlockingObstacle({class:'chair',bbox:[280,300,70,70]},640,480),false);
 assert.equal(isLargeBlockingObstacle({class:'chair',bbox:[180,170,300,270]},640,480),true);
 assert.equal(isLargeBlockingObstacle({class:'person',bbox:[0,80,200,380]},640,480),false);
});

test('AR distance stays fixed when heading is wrong or unavailable',()=>{
 assert.deepEqual(advanceArDistance(12,{heading:180,target:0}),{distance:12,reason:'wrong-direction'});
 assert.deepEqual(advanceArDistance(12,{heading:null,target:0}),{distance:12,reason:'heading-unavailable'});
 assert.deepEqual(advanceArDistance(12,{heading:20,target:0}),{distance:11.3,reason:'advanced'});
});

test('AR arrow mode distinguishes turns from forward movement',()=>{
 assert.equal(arrowMode('왼쪽으로 10미터 걸으세요.'),'left');
 assert.equal(arrowMode('오른쪽으로 8미터 걸으세요.'),'right');
 assert.equal(arrowMode('뒤쪽으로 돌아서세요.'),'back');
 assert.equal(arrowMode('문까지 4미터 이동하세요.'),'forward');
});

test('phone heading is reduced to four clear directions',()=>{
 assert.equal(directionFromRotation(20),'forward');
 assert.equal(directionFromRotation(80),'right');
 assert.equal(directionFromRotation(170),'back');
 assert.equal(directionFromRotation(-80),'left');
});

test('route progress follows completed walking distance',()=>{
 const steps=[{distance:10},{distance:20}];
 assert.deepEqual(routeProgress(steps,0,10),{total:30,remaining:30,percent:0});
 assert.deepEqual(routeProgress(steps,1,15),{total:30,remaining:15,percent:50});
 assert.deepEqual(routeProgress(steps,1,0),{total:30,remaining:0,percent:100});
});

test('map character moves along the drawn route',()=>{
 const path=[[10,10],[20,10],[20,30]];
 assert.deepEqual(pointAlongPath(path,0),[10,10]);
 assert.deepEqual(pointAlongPath(path,50),[20,15]);
 assert.deepEqual(pointAlongPath(path,100),[20,30]);
 assert.deepEqual(segmentAtProgress(path,75),[[20,10],[20,30]]);
});
