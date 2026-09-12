const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
export const floorData={
 b1:{name:'지하 1층',image:'assets/지하평면도.png',locations:[['west-elevator','서측 엘리베이터 홀'],['control-room','중앙 관리실'],['east-elevator','동측 엘리베이터 홀'],['west-parking','서측 A 주차구역'],['central-parking','중앙 B 주차구역'],['south-parking','남측 C 주차구역'],['east-ramp','동측 D 진입램프']],exits:[['서쪽 비상구',7.3,39],['서측 중앙 비상구',28.3,60.1],['중앙 비상구',53.4,63.1],['남측 중앙 비상구',46.8,78],['동북쪽 비상구',87.5,28.6],['동쪽 비상구',93.4,51.6]]},
 '1f':{name:'1층',image:'assets/전시동 1층.png',locations:[['hall1','제1전시장'],['hall2','제2전시장'],['hall3','제3전시장'],['multi','다목적홀']],exits:[['서쪽 비상구',8.1,49.2],['남서쪽 비상구',50.6,93.3],['남쪽 비상구',74,92.6],['동북쪽 비상구',91.7,41.1],['동쪽 비상구',92.6,67.9],['동남쪽 비상구',90.7,77.9]]},
 '2f':{name:'2층',image:'assets/전시동 2층.png',locations:[['201','201호'],['202','202호'],['203','203호'],['204','204호'],['205','205호'],['206','206호'],['207','207호'],['208','208호'],['209','209호'],['210','210호'],['211','211호'],['212','212호'],['213','213호'],['214','214호']],exits:[['서북쪽 비상구',12.7,40.7],['서쪽 비상구',8.7,65.7],['중앙 비상구 1',36.8,65.7],['중앙 비상구 2',52.1,65.9],['동북쪽 비상구',89.6,32.1],['동쪽 비상구',95.5,46.4],['동측 복도 비상구',76.8,50.4],['동남쪽 비상구',81.4,81.5]]},
 '3f':{name:'3층',image:'assets/전시동 3층.png',locations:[['301','301호'],['302','302호'],['303','303호'],['304','304호'],['305','305호'],['306','306호'],['307','307호']],exits:[['서북쪽 비상구',20.5,25.9],['동쪽 비상구',90.6,54.1]]}
};

// Each selectable place has an interior rectangle, its doorway and a corridor node.
export const navigation={
 b1:{rooms:{
  'west-elevator':[[20,57,23.5,63],[24,63],'w','서측 중앙 비상구',[[[21.5,56.5],'w']]],'control-room':[[42,56,50,62],[48,63],'c2','중앙 비상구',[[[42,59],'c1South']]],
  'east-elevator':[[85,41,90,49],[85,50],'e','동쪽 비상구',[[[88,49.5],'e']]],'west-parking':[[5,45,18,75],[18,65],'wWest','서쪽 비상구',[],'open-zone'],'central-parking':[[25,66,55,82],[45,65],'c2','중앙 비상구',[],'open-zone'],'south-parking':[[30,83,65,94],[47,78],'south','남측 중앙 비상구',[],'open-zone'],'east-ramp':[[84,35,92,76],[84,58],'e','동쪽 비상구',[],'open-zone']},
  nodes:{west:[7.3,39],wWest:[18,65],w:[25,65],c1:[28.3,60.1],c1South:[30,65],c2:[53.4,63.1],south:[46.8,78],c3:[70,65],e:[84,58],eNorth:[83,38],ne:[87.5,28.6],east:[93.4,51.6]},
  links:[['west','wWest'],['wWest','w'],['w','c1'],['c1','c1South'],['c1South','c2'],['c2','south'],['c2','c3'],['c3','e'],['e','eNorth'],['eNorth','ne'],['e','east']],
  exitNodes:{'서쪽 비상구':'west','서측 중앙 비상구':'c1','중앙 비상구':'c2','남측 중앙 비상구':'south','동북쪽 비상구':'ne','동쪽 비상구':'east'}},
 '1f':{rooms:{
  hall1:[[17,25,39,48],[20,50],'c1','서쪽 비상구',[[[32,50],'c2'],[[38,50],'c2']]],hall2:[[40,27,61,51],[42,53],'c2','남서쪽 비상구',[[[51,53],'c3'],[[59,54],'c3']]],
  hall3:[[62,31,82,53],[63,55],'c3','동북쪽 비상구',[[[72,55],'c4'],[[80,56],'c5']]],multi:[[13,64,43,83],[19,62],'c1','서쪽 비상구',[[[31,62],'c2'],[[40,62],'c2']]]},
  nodes:{west:[8.1,49.2],c1:[18,57],c2:[36,57],c3:[55,58],c4:[73,59],c5:[86,59],eastNorth:[89,49],ne:[91.7,41.1],east:[92.6,67.9],se:[90.7,77.9],southWestTop:[49,62],southWestMid:[49,86],south1:[50.6,93.3],southEastTop:[74,64],southEastMid:[74,87],south2:[74,92.6]},
  // All selectable hall doors feed verified corridor centre-lines. The two
  // south exits are reachable through the vertical passages between the lower
  // halls, never through the coloured room blocks.
  links:[['west','c1'],['c1','c2'],['c2','c3'],['c3','c4'],['c4','c5'],['c5','eastNorth'],['eastNorth','ne'],['c5','east'],['east','se'],['c2','southWestTop'],['southWestTop','southWestMid'],['southWestMid','south1'],['c4','southEastTop'],['southEastTop','southEastMid'],['southEastMid','south2']],
  exitNodes:{'서쪽 비상구':'west','남서쪽 비상구':'south1','남쪽 비상구':'south2','동북쪽 비상구':'ne','동쪽 비상구':'east','동남쪽 비상구':'se'}},
 '2f':{rooms:{
  '201':[[13,55.5,18.5,63],[18,54],'u1','서북쪽 비상구'],'202':[[19.5,55.5,26,63],[23,54],'u2','중앙 비상구 1',[[[23,64.2],'d202']]],
  '203':[[27,55.5,33.5,63],[31,54],'u3','중앙 비상구 1',[[[30.5,64.2],'d203']]],'204':[[34.5,55.5,41,63],[39,54],'u4','중앙 비상구 1',[[[38,64.2],'d204']]],
  '205':[[40,55.5,46.5,63],[43.5,54],'u5','중앙 비상구 2',[[[43.5,64.2],'d205']]],'206':[[46.7,55.5,52.8,63],[50,54],'u6','중앙 비상구 2',[[[50,64.2],'d206']]],
  '207':[[53,55.5,57.5,63],[56,54],'u7','중앙 비상구 2',[[[56,64.2],'d207']]],'208':[[57,68,63,74],[57,70],'l1','중앙 비상구 2'],
  '209':[[64,68,69.5,74],[69.5,70],'r1','중앙 비상구 2'],'210':[[57,81.5,63,87],[57,84],'l3','중앙 비상구 2'],
  '211':[[64,75,69.5,81],[69.5,77],'r2','중앙 비상구 2'],'212':[[64,82,69.5,87.5],[69.5,84],'r3','동남쪽 비상구'],
  '213':[[57,87.5,63,92],[57,89.5],'l4','중앙 비상구 2'],'214':[[72,75,80,87],[72,77],'r2','중앙 비상구 2',[[[72,85],'r4']]]},
  nodes:{nw:[12.7,40.7],west:[8.7,65.7],u0:[10,52],u1:[18,52],u2:[23,52],u3:[31,52],u4:[39,52],u5:[43.5,52],u6:[50,52],u7:[56,52],u8:[72,52],hallExit:[76.8,50.4],eastTurn:[83,50.4],eastNorth:[87,40],ne:[89.6,32.1],east:[95.5,46.4],d202:[23,65.8],d203:[30.5,65.8],c1:[36.8,65.7],d204:[38,65.8],d205:[43.5,65.8],c2:[52.1,65.9],d206:[50,65.9],d207:[56,65.9],lowerTop:[69.8,65.9],l1:[55,70],l2:[55,77],l3:[55,84],l4:[55,89.5],r1:[70,70],r2:[70,77],r214:[70,79],r3:[70,84],r4:[70,89.5],se:[81.4,81.5]},
  // The turquoise outlines around the lower rooms and escalator are walls.
  // Black and turquoise strokes are both walls. Links therefore follow only the
  // beige corridor centre-lines and meet at real openings/hinged doors. In
  // particular, the left and right corridors around rooms 208-213 meet in the
  // open passage above the room block; they do not connect to the upper 201-207
  // corridor through the turquoise boundary.
  links:[['nw','u0'],['west','u0'],['u0','u1'],['u1','u2'],['u2','u3'],['u3','u4'],['u4','u5'],['u5','u6'],['u6','u7'],['u7','u8'],['u8','hallExit'],['hallExit','eastTurn'],['eastTurn','eastNorth'],['eastNorth','ne'],['eastTurn','east'],['d202','d203'],['d203','c1'],['c1','d204'],['d204','d205'],['d205','d206'],['d206','c2'],['c2','d207'],['d207','lowerTop'],['c2','l1'],['c2','lowerTop'],['lowerTop','r1'],['l1','l2'],['l2','l3'],['l3','l4'],['r1','r2'],['r2','r214'],['r214','r3'],['r3','r4']],
  exitNodes:{'서북쪽 비상구':'nw','서쪽 비상구':'west','중앙 비상구 1':'c1','중앙 비상구 2':'c2','동북쪽 비상구':'ne','동쪽 비상구':'east','동측 복도 비상구':'hallExit','동남쪽 비상구':'se'}},
 '3f':{rooms:{
  '301':[[23,37,36,53],[25,36],'top1','서북쪽 비상구'],'302':[[37,37,50,53],[38,36],'top2','서북쪽 비상구'],
  '304':[[51,37,64,53],[52,36],'top3','동쪽 비상구',[[[63.5,52],'midR']]],'303':[[23,61,36,75],[24,75.5],'lower1','서북쪽 비상구'],
  '305':[[37,61,50,75],[38,75.5],'lower2','서북쪽 비상구'],'306':[[51,61,64,75],[52,75.5],'lower3','동쪽 비상구',[[[63.5,61],'midR']]],
  '307':[[74,48,86,68],[74,47],'eastTopL','동쪽 비상구',[[[84,47],'eastTopR'],[[86,57],'eastCorr'],[[74,68],'lowerRight']]]},
  nodes:{nw:[20.5,25.9],topL:[20,32],top1:[25,32],top2:[49.5,32],top3:[61,32],upperRight:[66,32],midR:[66,57],eastTopL:[70,44],eastTopR:[88,44],eastCorr:[88,57],east:[90.6,54.1],lowerL:[20,78],lower1:[24,78],lower2:[38,78],lower3:[60,78],lowerRight:[66,78]},
  // upperRight/lowerRight keep the route inside the right-hand corridor. The old
  // lower3 -> midR diagonal crossed the wall and the interior of room 306.
  links:[['nw','topL'],['topL','top1'],['top1','top2'],['top2','top3'],['top3','upperRight'],['upperRight','midR'],['midR','eastTopL'],['eastTopL','eastTopR'],['eastTopR','eastCorr'],['eastCorr','east'],['topL','lowerL'],['lowerL','lower1'],['lower1','lower2'],['lower2','lower3'],['lower3','lowerRight'],['lowerRight','midR']],
  exitNodes:{'서북쪽 비상구':'nw','동쪽 비상구':'east'}}
};

const routeAreas={
 b1:[['서측 A 주차통로',13,65],['서측 연결복도',25,65],['중앙 B 주차통로',45,65],['남측 C 주차통로',47,82],['동측 연결통로',72,65],['동측 D 진입램프',87,58],['동북 관리복도',84,38]],
 '1f':[['서측 전시장 복도',18,57],['중앙 전시장 복도',45,58],['동측 전시장 복도',73,59],['동측 비상구 복도',89,59],['남서 연결통로',49,78],['남측 연결통로',74,78]],
 '2f':[['201~203호 앞 복도',24,52],['204~207호 앞 복도',48,52],['중앙 상부 복도',68,52],['208~210호 앞 서측 복도',55,78],['209~213호 앞 동측 복도',70,78],['동측 비상구 연결복도',85,47]],
 '3f':[['301~304호 앞 상부 복도',45,32],['303~306호 앞 하부 복도',45,78],['서측 비상구 연결복도',20,50],['307호 서측 복도',66,57],['307호 북측 복도',80,44],['동측 비상구 복도',88,57]]
};

Object.entries(navigation).forEach(([key,nav])=>floorData[key].locations.forEach(item=>{const b=nav.rooms[item[0]][0];item[2]=(b[0]+b[2])/2;item[3]=(b[1]+b[3])/2}));
let floor='2f',locationId='205',mobility='혼자서 이동할 수 있어요',agentDecision=null;
const hazardsByFloor={},locationPoints=new Map();
function weightedCount(){const roll=Math.random();return roll<.7?0:roll<.9?1:2}
function createHazardsForFloor(key,count=weightedCount()){const data=floorData[key],picked=[];while(picked.length<count){const item=data.locations[Math.floor(Math.random()*data.locations.length)];if(!picked.includes(item))picked.push(item)}hazardsByFloor[key]=picked.map(item=>({item,scale:+(1.5+Math.random()*1.5).toFixed(2)}))}
Object.keys(floorData).forEach(key=>createHazardsForFloor(key));
if(Object.values(hazardsByFloor).every(list=>!list.length)){const keys=Object.keys(floorData),key=keys[Math.floor(Math.random()*keys.length)];createHazardsForFloor(key,1)}
// Evacuation Agent: perceive fire data, rank safe rooms, choose a start, then call routing tools.
function initializeEvacuationAgent(){
 const fireFloors=Object.keys(hazardsByFloor).filter(key=>hazardsByFloor[key].length),chosenFloor=fireFloors[Math.floor(Math.random()*fireFloors.length)],fires=hazardsByFloor[chosenFloor];
 const scored=floorData[chosenFloor].locations.filter(room=>!fires.some(h=>h.item[0]===room[0])).map(room=>{const clearance=Math.min(...fires.map(h=>Math.hypot(room[2]-h.item[2],room[3]-h.item[3])-h.scale*4.3));return{room,clearance}}).sort((a,b)=>b.clearance-a.clearance);
 const safe=scored.filter(candidate=>candidate.clearance>8),pool=safe.length?safe:scored.slice(0,Math.max(1,Math.ceil(scored.length/2))),selected=pool[Math.floor(Math.random()*pool.length)];
 floor=chosenFloor;locationId=selected.room[0];agentDecision={fireRooms:fires.map(h=>h.item[1]),clearance:Math.max(0,selected.clearance),selectedRoom:selected.room[1],floorName:floorData[floor].name};
}
initializeEvacuationAgent();
function hazards(){return hazardsByFloor[floor]}
function randomPointFor(key,id){const cacheKey=`${key}:${id}`;if(locationPoints.has(cacheKey))return locationPoints.get(cacheKey);const [x1,y1,x2,y2]=navigation[key].rooms[id][0],padX=(x2-x1)*.22,padY=(y2-y1)*.22;const point=[x1+padX+Math.random()*(x2-x1-padX*2),y1+padY+Math.random()*(y2-y1-padY*2)];locationPoints.set(cacheKey,point);return point}
function currentLocation(){return floorData[floor].locations.find(x=>x[0]===locationId)||floorData[floor].locations[0]}
function edgeClear(a,b,margin=2.8){return isRouteSegmentClear(a,b,hazards().map(h=>({x:h.item[2],y:h.item[3],radius:h.scale*4.3})),margin)}
export function segmentDistance(x,y,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy||1))),px=a[0]+t*dx,py=a[1]+t*dy;return Math.hypot(x-px,y-py)}
export function isRouteSegmentClear(a,b,hazards,margin=2.8){return hazards.every(h=>segmentDistance(h.x,h.y,a,b)>h.radius+margin)}
export function pathLength(path){return path.slice(1).reduce((n,p,i)=>n+Math.hypot(p[0]-path[i][0],p[1]-path[i][1]),0)}
export function routeRisk(path,hazards,safeClearance=14){
 return path.slice(1).reduce((risk,point,index)=>risk+hazards.reduce((sum,hazard)=>{const clearance=segmentDistance(hazard.x,hazard.y,path[index],point)-hazard.radius;return sum+Math.max(0,safeClearance-clearance)**2},0),0);
}
export function chooseSafestRoute(candidates,hazards){
 return [...candidates].sort((a,b)=>routeRisk(a.path,hazards)-routeRisk(b.path,hazards)||pathLength(a.path)-pathLength(b.path))[0];
}
function planRoute({startPoint=null,blockedSegment=null,excludeExit=null}={}){
 const nav=navigation[floor],selected=currentLocation(),room=nav.rooms[selected[0]],start=startPoint||randomPointFor(floor,selected[0]),portals=startPoint?Object.entries(nav.nodes).sort(([,a],[,b])=>Math.hypot(a[0]-start[0],a[1]-start[1])-Math.hypot(b[0]-start[0],b[1]-start[1])).slice(0,3).map(([name,point])=>[point,name]):[[room[1],room[2]],...(room[4]||[])];
 // A route may leave a room through any mapped hinged door. Every following
 // edge is a pre-validated corridor segment; no arbitrary node-to-node shortcut is
 // generated from the raster image.
 const samePoint=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1])<.2,sameSegment=(a,b)=>blockedSegment&&((samePoint(nav.nodes[a],blockedSegment[0])&&samePoint(nav.nodes[b],blockedSegment[1]))||(samePoint(nav.nodes[a],blockedSegment[1])&&samePoint(nav.nodes[b],blockedSegment[0]))),nodes={...nav.nodes,start},links=nav.links.filter(([a,b])=>!sameSegment(a,b));portals.forEach(([door,entry],index)=>{const name=`door${index}`;nodes[name]=door;links.push(['start',name],[name,entry])});
 const hazardPoints=hazards().map(h=>({x:h.item[2],y:h.item[3],radius:h.scale*4.3}));
 const strict=shortestRoutes(nodes,links,{strict:true,terminalNodes:new Set(Object.values(nav.exitNodes)),edgeCost:(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1])+routeRisk([a,b],hazardPoints)*8});
 const eligibleExits=floorData[floor].exits.filter(exit=>exit[0]!==excludeExit),candidates=eligibleExits.map(exit=>{const names=strict[nav.exitNodes[exit[0]]];return names&&{exit,path:names.map(name=>nodes[name]),blocked:false}}).filter(Boolean);
 if(!candidates.length){const nearest=[...(eligibleExits.length?eligibleExits:floorData[floor].exits)].sort((a,b)=>Math.min(...portals.map(([door])=>Math.hypot(a[1]-door[0],a[2]-door[1])))-Math.min(...portals.map(([door])=>Math.hypot(b[1]-door[0],b[2]-door[1]))))[0];return{exit:nearest,path:[start,portals[0][0]],blocked:true,noPath:true}}
 const route=chooseSafestRoute(candidates,hazardPoints);route.path=route.path.filter((p,i,a)=>!i||p[0]!==a[i-1][0]||p[1]!==a[i-1][1]);return route;
}
export function shortestRoutes(nodes,links,{strict=true,isClear=edgeClear,start='start',terminalNodes=new Set(),edgeCost=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1])}={}){
 const graph={};Object.keys(nodes).forEach(k=>graph[k]=[]);
 links.forEach(([a,b])=>{if(!nodes[a]||!nodes[b])return;const clear=isClear(nodes[a],nodes[b]),risk=clear?0:1000;if(strict&&!clear)return;const cost=edgeCost(nodes[a],nodes[b])+risk;graph[a].push([b,cost]);graph[b].push([a,cost])});
 const dist={[start]:0},paths={[start]:[start]},queue=[start];
 while(queue.length){queue.sort((a,b)=>dist[a]-dist[b]);const at=queue.shift();if(at!==start&&terminalNodes.has(at))continue;graph[at].forEach(([next,cost])=>{const value=dist[at]+cost;if(value<(dist[next]??Infinity)){dist[next]=value;paths[next]=[...paths[at],next];if(!queue.includes(next))queue.push(next)}})}
 return paths;
}
function safestExit(){return planRoute().exit}
function evacuationPayload(){
 const selected=currentLocation(),route=planRoute(),point=randomPointFor(floor,selected[0]);
 const buildingHazards=Object.entries(hazardsByFloor).flatMap(([floorKey,list])=>list.map(({item,scale})=>({floor:floorData[floorKey].name,locationId:item[0],location:item[1],fire:{x:item[2],y:item[3]},smoke:{center:{x:item[2],y:item[3]},scale,radius:+(scale*4.3).toFixed(2)}})));
 return{floor:floorData[floor].name,currentRoom:{id:selected[0],name:selected[1]},currentPosition:{x:+point[0].toFixed(2),y:+point[1].toFixed(2)},mobility,hazards:buildingHazards,currentFloorHazards:buildingHazards.filter(h=>h.floor===floorData[floor].name),selectedExit:{name:route.exit[0],x:route.exit[1],y:route.exit[2]},route:{blocked:!!route.blocked,noPath:!!route.noPath,coordinates:route.path.map(([x,y])=>({x:+x.toFixed(2),y:+y.toFixed(2)}))}};
}
async function requestAiGuide(){const brief=$('#aiBrief'),guide=$('#aiGuide');brief.classList.remove('error');guide.textContent='화재·연기·현재 위치 정보를 분석 중입니다.';try{const response=await fetch('/api/evacuation-guide',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(evacuationPayload())});const data=await response.json();if(!response.ok)throw new Error(data.error||'AI 안내를 불러오지 못했습니다.');brief.querySelector('strong').textContent=data.headline;guide.textContent=data.instructions.join(' ')}catch(error){brief.classList.add('error');brief.querySelector('strong').textContent='기본 대피 안내를 사용합니다.';guide.textContent=error.message}}
function show(step){if(step!==5)stopAr();$('.phone').classList.toggle('ar-mode',step===5);$$('.screen').forEach(x=>x.classList.toggle('active',x.dataset.screen===String(step)));$$('.steps button').forEach(x=>x.classList.toggle('active',x.dataset.step===String(step)));if(step===3)renderFloor();if(step===4)renderResult()}
function renderFloor(){
 const data=floorData[floor],overlay=$('#mapOverlay'),route=planRoute(),selected=currentLocation(),point=randomPointFor(floor,selected[0]),img=$('#map');
 $$('[data-floor]').forEach(tab=>{const active=tab.dataset.floor===floor;tab.classList.toggle('selected',active);tab.setAttribute('aria-selected',String(active))});
 img.src=data.image;img.alt=`전시동 ${data.name} 평면도`;$('#locationGroupTitle').textContent=`${data.name} 공간을 선택하세요`;overlay.replaceChildren();drawRoute(overlay,route);
 const marker=document.createElement('span');marker.className='selected-location';marker.style.cssText=`left:${point[0]}%;top:${point[1]}%`;marker.title=`${selected[1]} 내부 현재 위치`;overlay.append(marker);hazards().forEach(h=>renderHazard(overlay,h));
 const count=hazards().length,activeFloors=Object.entries(hazardsByFloor).filter(([,list])=>list.length).map(([key])=>floorData[key].name);
 $('#hazardTitle').textContent=count?`화재·연기 감지: ${hazards().map(h=>h.item[1]).join(', ')}`:`현재 ${activeFloors.join('과 ')}에 화재가 진행되고 있습니다.`;
 $('#hazardDescription').textContent=route.blocked?'모든 통로가 위험 구역과 겹칩니다. 안내 요원의 지시를 기다리세요.':count?`${route.exit[0]}까지 연기와 화재를 피해 안내합니다.`:'신속히 건물을 빠져나오세요.';
 $('.hazard').classList.add('hazard-live');renderButtons();
}
function drawRoute(overlay,route){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','route-layer');svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');const points=route.path.map(p=>p.join(',')).join(' ');svg.innerHTML=`<polyline class="route-shadow" points="${points}"/><polyline class="route-line" points="${points}"/>${route.noPath?'':`<circle class="route-end" cx="${route.exit[1]}" cy="${route.exit[2]}" r=".7"/>`}`;overlay.append(svg);if(route.noPath)return;const destination=document.createElement('span');destination.className='route-destination';destination.textContent='출구';destination.style.cssText=`left:${route.exit[1]}%;top:${route.exit[2]}%`;destination.title=route.exit[0];overlay.append(destination)}
function renderButtons(){const box=$('#rooms');box.replaceChildren();floorData[floor].locations.forEach(([id,label])=>{const b=document.createElement('button');b.textContent=label;b.classList.toggle('selected',id===locationId);b.onclick=()=>selectLocation(id);box.append(b)})}
function selectLocation(id){
 if(!navigation[floor].rooms[id])return;
 locationId=id;randomPointFor(floor,id);renderFloor();
}
function selectFloor(nextFloor){
 if(!floorData[nextFloor]||!navigation[nextFloor])return;
 floor=nextFloor;locationId=floorData[floor].locations[0][0];
 renderFloor();
}
function renderHazard(overlay,{item,scale}){const [,label,x,y]=item,smoke=document.createElement('span'),fire=document.createElement('span');smoke.className='smoke-zone';smoke.style.cssText=`left:${x}%;top:${y}%;--scale:${scale}`;smoke.title=`${label} 연기 범위`;fire.className='fire-point';fire.style.cssText=`left:${x}%;top:${y}%`;fire.title=`${label} 화재`;fire.innerHTML='<svg aria-hidden="true"><use href="#icon-fire"/></svg>';overlay.append(smoke,fire)}
function renderResult(){const data=floorData[floor],item=currentLocation(),route=planRoute(),exit=route.exit[0];$('#resultLocation').textContent=`${data.name} ${item[1]}`;$('#resultStatus').textContent=mobility;$('#resultExit').textContent=/휠체어|어려워/.test(mobility)?`${exit} 인근 안전 대피장소`:exit;$('.result-hazard strong').textContent=hazards().length?`${hazards().map(h=>h.item[1]).join(', ')}에서 화재와 연기가 감지되었습니다.`:`현재 ${Object.entries(hazardsByFloor).filter(([,v])=>v.length).map(([k])=>floorData[k].name).join('과 ')}에 화재가 진행되고 있습니다.`;$('.result-hazard small').textContent=route.blocked?'안전한 통로가 확보될 때까지 안내 요원의 지시를 기다리세요.':`${exit} 방향으로 연기 구역을 우회하세요.`;requestAiGuide()}
if(typeof document!=='undefined'){$$('[data-step],[data-go]').forEach(b=>b.onclick=()=>show(Number(b.dataset.step||b.dataset.go)));$$('[data-help]').forEach(b=>b.onclick=()=>show(2));$$('[data-next]').forEach(b=>b.onclick=()=>show(Number(b.dataset.next)));$$('[data-status]').forEach(b=>b.onclick=()=>{$$('[data-status]').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');mobility=b.dataset.status;$('.primary.disabled')?.classList.remove('disabled')});$$('[data-floor]').forEach(b=>b.onclick=event=>{event.preventDefault();selectFloor(b.dataset.floor)})}
function modal(title,text){$('#modalTitle').textContent=title;$('#modalText').textContent=text;$('#modal').classList.add('open')}
function alertSummary(recipient){const item=currentLocation(),route=planRoute(),detected=hazards().length?hazards().map(h=>h.item[1]).join(', '):'현재 층 감지 없음';return`${recipient}에게 아래 내용을 전달합니다.\n\n현재 위치: ${floorData[floor].name} ${item[1]}\n이동 상태: ${mobility}\n화재·연기 위치: ${detected}\n추천 대피 지점: ${route.exit[0]}\n안내 상태: ${route.blocked?'안전한 통로 확인 필요':'연기 구역을 우회하는 경로 확보'}`}
function friendLocationSummary(trackingUrl=''){const item=currentLocation();return`친구에게 카카오톡 메시지를 전송합니다.\n\n현재 위치: 김대중컨벤션센터 전시동 ${floorData[floor].name} ${item[1]}\n메시지: 현재 이 위치에 있어요. 제 위치를 확인해주세요.${trackingUrl?`\n보호자 확인: ${trackingUrl}`:''}`}
let kakaoReady=false;
async function initializeKakao(){if(kakaoReady)return true;if(!window.Kakao)throw new Error('카카오 SDK를 불러오지 못했습니다.');const response=await fetch('/api/public-config');const config=await response.json();if(!config.kakaoJsKey)throw new Error('KAKAO_JS_KEY가 설정되지 않았습니다.');if(!Kakao.isInitialized())Kakao.init(config.kakaoJsKey);kakaoReady=Kakao.isInitialized();return kakaoReady}
async function shareKakaoLocation(){
 const item=currentLocation(),route=planRoute(),place=`김대중컨벤션센터 전시동 ${floorData[floor].name} ${item[1]}`,destination=route.exit[0];
 const trackingUrl=await ensureTrackingSession(route),text=`[BF Manual 긴급 위치 공유]\n현재 위치: ${place}\n이동 상태: ${mobility}\n추천 대피 지점: ${destination}\n보호자용 대피 현황에서 이동 여부와 현재 위치를 확인해주세요.`;
 try{await initializeKakao();Kakao.Share.sendDefault({objectType:'text',text,link:{mobileWebUrl:trackingUrl,webUrl:trackingUrl},buttonTitle:'BF Manual 위치 확인'});}
 catch(error){modal('카카오톡 위치 전송 준비 필요',`${error.message}\n\n배포 주소를 카카오 개발자 콘솔의 JavaScript SDK 도메인과 제품 링크 웹 도메인에 등록해주세요.\n\n${friendLocationSummary(trackingUrl)}`)}
}
const AR_HEADING_TOLERANCE=55;
let trackingId='',trackingTimer=null,lastTrackingMoveAt=Date.now();
let cameraStream=null,torchOn=false,sensorActive=false,voiceOn=true,signalOn=false,signalTimer=null,signalVoiceTimer=null,audioContext=null,remainingDistance=24,lastStepAt=0,lastMagnitude=0,targetBearing=0,currentHeading=null,lastDirection='',lastSpokenAt=0,lastDistanceCallout=Infinity,lastWrongWayAt=0,arSteps=[],arStepIndex=0,arCompleted=false,arDestinationName='비상구',arRoute=null;
let obstacleModel=null,obstacleTimer=null,obstacleRetryTimer=null,obstacleBusy=false,obstacleBlocked=false,lastObstacleWarningAt=0,obstacleSince=0,lastDetourAt=0,sceneBlockedFrames=0,sceneCanvas=null,orientationReceived=false,motionReceived=false,sensorCheckTimer=null;
const obstacleLabels=new Set(['person','bicycle','car','motorcycle','bus','truck','bench','chair','couch','bed','dining table','potted plant','suitcase']);
function segmentBearing(a,b){return(Math.atan2(b[0]-a[0],a[1]-b[1])*180/Math.PI+360)%360}
function headingDifference(a,b){return Math.abs(((a-b+540)%360)-180)}
function isHeadingAligned(){return currentHeading!==null&&headingDifference(targetBearing,currentHeading)<=AR_HEADING_TOLERANCE}
export function advanceArDistance(distance,{obstacle=false,heading=null,target=0,tolerance=AR_HEADING_TOLERANCE,step=.7}={}){
 if(obstacle)return{distance,reason:'obstacle'};
 if(heading===null)return{distance,reason:'heading-unavailable'};
 if(headingDifference(target,heading)>tolerance)return{distance,reason:'wrong-direction'};
 return{distance:Math.max(0,+(distance-step).toFixed(1)),reason:'advanced'};
}
function buildArSteps(route){
 const raw=[...route.path],points=raw.filter((point,index)=>index<2||index===raw.length-1||Math.hypot(point[0]-raw[index-1][0],point[1]-raw[index-1][1])>=3.5),last=points[points.length-1],before=points[points.length-2]||last,dx=last[0]-before[0],dy=last[1]-before[1],length=Math.hypot(dx,dy)||1,safe=[last[0]+dx/length*10,last[1]+dy/length*10];points.push(safe);
 return points.slice(1).map((point,index)=>{const from=points[index],bearing=segmentBearing(from,point),distance=Math.max(2,Math.round(Math.hypot(point[0]-from[0],point[1]-from[1])*1.45));let text;if(index===0)text=`문까지 ${distance}미터 이동하세요.`;else if(index===points.length-2)text=`비상구를 지나 안전지대까지 ${distance}미터 이동하세요.`;else{const previous=segmentBearing(points[index-1],from),turn=((bearing-previous+540)%360)-180,direction=Math.abs(turn)<25?'직진으로':turn>0?'오른쪽으로':'왼쪽으로';text=index===points.length-3?`${direction} ${distance}미터 걸으면 비상구에 도착합니다.`:`${direction} ${distance}미터 걸으세요.`}return{bearing,distance,text}})
}
export function arrowMode(text=''){return text.includes('왼쪽')?'left':text.includes('오른쪽')?'right':text.includes('뒤')?'back':'forward'}
export function directionFromRotation(rotation){const angle=((rotation+540)%360)-180;return Math.abs(angle)<=35?'forward':Math.abs(angle)>=145?'back':angle>0?'right':'left'}
export function routeProgress(steps,index,distance){const total=steps.reduce((sum,step)=>sum+step.distance,0),before=steps.slice(0,index).reduce((sum,step)=>sum+step.distance,0),completed=Math.min(total,before+Math.max(0,(steps[index]?.distance||0)-distance));return{total,remaining:Math.max(0,+(total-completed).toFixed(1)),percent:total?Math.min(100,Math.round(completed/total*100)):0}}
export function pointAlongPath(path,percent){if(!path?.length)return[0,0];const lengths=path.slice(1).map((point,index)=>Math.hypot(point[0]-path[index][0],point[1]-path[index][1])),total=lengths.reduce((sum,n)=>sum+n,0),target=total*Math.max(0,Math.min(100,percent))/100;let covered=0;for(let i=0;i<lengths.length;i++){if(covered+lengths[i]>=target){const ratio=lengths[i]?(target-covered)/lengths[i]:0;return[path[i][0]+(path[i+1][0]-path[i][0])*ratio,path[i][1]+(path[i+1][1]-path[i][1])*ratio]}covered+=lengths[i]}return path.at(-1)}
function trackingPayload(route=arRoute){
 const progress=route===arRoute&&arSteps.length?routeProgress(arSteps,arStepIndex,remainingDistance):{percent:0,remaining:Math.round(pathLength(route.path)*1.45)},point=pointAlongPath(route.path,progress.percent);
 return{id:trackingId,floorKey:floor,location:progress.percent<3?`${floorData[floor].name} ${currentLocation()[1]}`:describeArPosition(point,progress.percent),mobility,exit:route.exit[0],path:route.path,point,progress:progress.percent,remaining:progress.remaining,completed:arCompleted,lastMovedAt:lastTrackingMoveAt};
}
async function postTracking(route=arRoute){if(!trackingId||!route)return;try{await fetch('/api/evacuation-session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(trackingPayload(route))})}catch{}}
async function ensureTrackingSession(route){trackingId||=globalThis.crypto?.randomUUID?.().replaceAll('-','')||`${Date.now()}${Math.random().toString(36).slice(2)}`;await postTracking(route);clearInterval(trackingTimer);trackingTimer=setInterval(()=>postTracking(arRoute||route),15000);return`${location.origin}${location.pathname}?track=${encodeURIComponent(trackingId)}`}
function sendTrackingUpdate(){if(trackingId)postTracking()}
function elapsedText(timestamp){const seconds=Math.max(0,Math.floor((Date.now()-timestamp)/1000));if(seconds<60)return`${seconds}초`;const minutes=Math.floor(seconds/60);return minutes<60?`${minutes}분`:`${Math.floor(minutes/60)}시간 ${minutes%60}분`}
function renderTracking(session){
 const screen=$('#trackingScreen'),stopped=!session.completed&&Date.now()-session.lastMovedAt>60000,state=session.completed?'대피 완료':stopped?'이동 멈춤':'이동 중';screen.classList.toggle('is-stopped',stopped);screen.classList.toggle('is-complete',session.completed);$('#trackingState').textContent=state;$('#trackingStopped').textContent=session.completed?'안전지대 도착이 확인되었습니다.':stopped?`${elapsedText(session.lastMovedAt)} 동안 같은 구역에 머물고 있습니다.`:'대피 경로를 따라 이동하고 있습니다.';$('#trackingMapImage').src=floorData[session.floorKey]?.image||'';$('#trackingMapRoute').innerHTML=`<polyline points="${session.path.map(point=>point.join(',')).join(' ')}"/>`;$('#trackingWalker').style.cssText=`left:${session.point[0]}%;top:${session.point[1]}%`;$('#trackingLocation').textContent=session.completed?'안전지대':session.location;$('#trackingProgress').textContent=`${session.progress}% · 약 ${Math.ceil(session.remaining||0)}m 남음`;$('#trackingMobility').textContent=session.mobility;$('#trackingExit').textContent=session.exit;$('#trackingUpdated').textContent=`마지막 갱신 ${elapsedText(session.updatedAt)} 전 · 5초마다 자동 갱신`;
}
async function refreshTracking(id){try{const response=await fetch(`/api/evacuation-session?id=${encodeURIComponent(id)}`),data=await response.json();if(!response.ok)throw new Error(data.error);renderTracking(data)}catch(error){$('#trackingState').textContent='현황 확인 불가';$('#trackingStopped').textContent=error.message||'잠시 후 다시 확인해주세요.'}}
function startTrackingView(id){$('.app-header').hidden=true;$('.steps').hidden=true;$$('.screen').forEach(screen=>screen.classList.remove('active'));$('#trackingScreen').hidden=false;refreshTracking(id);setInterval(()=>refreshTracking(id),5000)}
export function segmentAtProgress(path,percent){if(!path||path.length<2)return null;const point=pointAlongPath(path,percent),segments=path.slice(1).map((end,index)=>({segment:[path[index],end],distance:segmentDistance(point[0],point[1],path[index],end)}));return segments.sort((a,b)=>a.distance-b.distance)[0].segment}
function describeArPosition(point,progress){if(progress<3)return`${floorData[floor].name} ${currentLocation()[1]}`;const nearest=routeAreas[floor].map(([name,x,y])=>({name,distance:Math.hypot(x-point[0],y-point[1])})).sort((a,b)=>a.distance-b.distance)[0];return nearest.name}
function updateRouteProgress(){const progress=routeProgress(arSteps,arStepIndex,remainingDistance),point=pointAlongPath(arRoute?.path,progress.percent);$('#arMapWalker').style.cssText=`left:${point[0]}%;top:${point[1]}%`;$('#arMapProgress').textContent=arCompleted?'안전지대 도착':`${progress.percent}% 이동 · 구간 ${arStepIndex+1}/${arSteps.length}`;$('#arMapRemaining').textContent=arCompleted?'안내 유지 중':`전체 약 ${Math.ceil(progress.remaining)}m 남음`;$('#arLocation').textContent=arCompleted?'안전지대':describeArPosition(point,progress.percent);sendTrackingUpdate()}
function setArrowMode(mode='forward'){const arrow=$('#arArrow'),labels={forward:'정면',right:'오른쪽',back:'뒤쪽',left:'왼쪽'};arrow.classList.remove('arrow-forward','arrow-left','arrow-right','arrow-back');arrow.classList.add(`arrow-${mode}`);arrow.dataset.mode=mode;$('#arDirectionCue').textContent=labels[mode]}
function activateArStep(index,announce=true){const step=arSteps[index];if(!step)return;arStepIndex=index;remainingDistance=step.distance;lastDistanceCallout=remainingDistance;targetBearing=step.bearing;$('#arDistance').textContent=remainingDistance;$('#arDirection').textContent=step.text;$('#arExitName').textContent=`${arDestinationName} · 경로 ${index+1}/${arSteps.length}`;lastDirection=step.text;setArrowMode();updateRouteProgress();if(announce)speakGuide(step.text,true)}
function updateDirection(rotation){setArrowMode(directionFromRotation(rotation))}
function renderArMap(){if(!arRoute)return;const data=floorData[floor],points=arRoute.path.map(point=>point.join(',')).join(' ');$('#arMapImage').src=data.image;$('#arMapImage').alt=`${data.name} 대피 경로 지도`;$('#arMapTitle').textContent=`${data.name} ${currentLocation()[1]} → ${arDestinationName}`;$('#arMapRoute').innerHTML=`<polyline class="ar-map-route-shadow" points="${points}"/><polyline class="ar-map-route-line" points="${points}"/><circle class="ar-map-exit" cx="${arRoute.exit[1]}" cy="${arRoute.exit[2]}" r="1.3"/>`;updateRouteProgress()}
function toggleArMap(force){const modal=$('#arMapModal'),open=force??modal.hidden;modal.hidden=!open;$('#mapButton').classList.toggle('active',open);$('#mapButton').setAttribute('aria-pressed',String(open));if(open)renderArMap()}
function recalculateDetour(source='신고된 통로'){if(!arRoute)return;const previousExit=arDestinationName,progress=routeProgress(arSteps,arStepIndex,remainingDistance),point=pointAlongPath(arRoute.path,progress.percent),blockedSegment=segmentAtProgress(arRoute.path,progress.percent),next=planRoute({startPoint:point,blockedSegment,excludeExit:previousExit});if(next.noPath){$('#arMessage').textContent='현재 출구를 제외하면 확인된 우회로가 없습니다. 안전한 곳에 멈춰 도움을 요청하세요.';speakGuide('다른 안전한 우회로가 없습니다. 안전한 곳에 멈춰 도움을 요청하세요.',true);return}arRoute=next;arDestinationName=next.exit[0];arSteps=buildArSteps(next);arStepIndex=0;arCompleted=false;obstacleBlocked=false;renderArMap();activateArStep(0,false);$('#arMessage').textContent=`사용자가 우회로를 선택했습니다. ${previousExit} 대신 ${arDestinationName}로 안내합니다.`;speakGuide(`${source}를 피해 ${arDestinationName}로 우회 안내합니다. ${arSteps[0].text}`,true)}
async function startAr(){
 const route=planRoute(),item=currentLocation();arRoute=route;arDestinationName=route.exit[0];arSteps=buildArSteps(route);arCompleted=false;currentHeading=null;lastWrongWayAt=0;lastTrackingMoveAt=Date.now();$('#arLocation').textContent=`${floorData[floor].name} ${item[1]}`;show(5);renderArMap();activateArStep(0,false);setArrowMode('forward');
 if(!navigator.mediaDevices?.getUserMedia){$('#arMessage').textContent='이 브라우저에서는 카메라를 사용할 수 없습니다.';return}
 const sensorPromise=enableSensors(false);
 try{const result=await connectBestCamera(),video=$('#arCamera');video.srcObject=cameraStream;await video.play();$('#torchButton').disabled=!result.torch;$('#arMessage').textContent=result.torch?`손전등 지원 카메라 연결됨 · ${result.label}`:`후면 카메라 연결됨 · 손전등 미지원`;speakGuide(`${route.exit[0]}까지 안내를 시작합니다. ${arSteps[0].text}`,true);startObstacleDetection();await sensorPromise}catch(error){$('#arMessage').textContent=error.name==='NotAllowedError'?'카메라 권한이 거부되었습니다. 브라우저 설정에서 허용해주세요.':'후면 카메라를 시작할 수 없습니다.'}
}
async function openCamera(video){return navigator.mediaDevices.getUserMedia({video:{...video,width:{ideal:1280},height:{ideal:720}},audio:false})}
async function connectBestCamera(){
 let fallback=await openCamera({facingMode:{ideal:'environment'}}),fallbackTrack=fallback.getVideoTracks()[0],caps=fallbackTrack.getCapabilities?.()||{};
 if(caps.torch){cameraStream=fallback;return{torch:true,label:fallbackTrack.label||'후면 카메라'}}
 const devices=(await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==='videoinput'),ordered=[...devices].sort((a,b)=>cameraPriority(b.label)-cameraPriority(a.label));
 fallback.getTracks().forEach(track=>track.stop());fallback=null;
 for(const device of ordered){try{const stream=await openCamera({deviceId:{exact:device.deviceId}}),track=stream.getVideoTracks()[0],supported=!!(track.getCapabilities?.()||{}).torch;if(supported){cameraStream=stream;return{torch:true,label:track.label||'플래시 카메라'}}stream.getTracks().forEach(item=>item.stop())}catch{}}
 cameraStream=await openCamera({facingMode:{ideal:'environment'}});const track=cameraStream.getVideoTracks()[0];return{torch:!!(track.getCapabilities?.()||{}).torch,label:track.label||'후면 카메라'}
}
function cameraPriority(label=''){return/(back|rear|environment|후면|뒷면)/i.test(label)?2:/(front|user|전면)/i.test(label)?0:1}
function loadVisionScript(sources,ready){
 const urls=Array.isArray(sources)?sources:[sources];
 if(ready())return Promise.resolve();
 return urls.reduce((attempt,url)=>attempt.catch(()=>new Promise((resolve,reject)=>{
  document.querySelectorAll('script[data-vision-src]').forEach(script=>{if(script.dataset.visionSrc===url)script.remove()});
  const script=document.createElement('script'),timer=setTimeout(()=>{script.remove();reject(new Error(`모델 스크립트 시간 초과: ${url}`))},15000);
  script.src=url;script.async=true;script.dataset.visionSrc=url;script.onload=()=>{clearTimeout(timer);ready()?resolve():reject(new Error(`모델을 사용할 수 없음: ${url}`))};script.onerror=()=>{clearTimeout(timer);script.remove();reject(new Error(`모델 스크립트 실패: ${url}`))};document.head.append(script);
 })),Promise.reject()).then(()=>undefined);
}
async function loadObstacleModel(){
 if(obstacleModel)return obstacleModel;
 setObstacleUi('loading','AI 인식 준비 중');
 await loadVisionScript(['https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js','https://unpkg.com/@tensorflow/tfjs@4.22.0/dist/tf.min.js'],()=>!!window.tf);
 await window.tf.ready();
 await loadVisionScript(['https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js','https://unpkg.com/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js'],()=>!!window.cocoSsd);
 obstacleModel=await window.cocoSsd.load({base:'lite_mobilenet_v2'});return obstacleModel;
}
function setObstacleUi(state,text){const button=$('#obstacleButton'),status=$('#obstacleStatus');if(status)status.textContent=text;if(!button)return;button.disabled=state==='loading';button.classList.toggle('active',state==='active');button.classList.toggle('error',state==='error');button.setAttribute('aria-pressed',String(state==='active'));button.querySelector('span:last-child').textContent=state==='active'?'인식 켜짐':state==='loading'?'인식 준비 중':state==='error'?'다시 시도':'인식 꺼짐'}
function drawObstacleBoxes(predictions,blocking){
 const video=$('#arCamera'),canvas=$('#obstacleCanvas'),ctx=canvas.getContext('2d'),width=video.videoWidth||640,height=video.videoHeight||480;
 if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height}ctx.clearRect(0,0,width,height);
 predictions.forEach(({bbox,class:label,score})=>{const [x,y,w,h]=bbox,isBlocking=blocking.some(item=>item.bbox===bbox);ctx.strokeStyle=isBlocking?'#ff3344':'#40e28d';ctx.lineWidth=Math.max(3,width/180);ctx.strokeRect(x,y,w,h);ctx.fillStyle=isBlocking?'#c51627dd':'#087a4bdd';ctx.font=`bold ${Math.max(14,width/42)}px sans-serif`;ctx.fillText(`${label} ${Math.round(score*100)}%`,x+4,Math.max(20,y-7))})
}
export function isLargeBlockingObstacle({bbox,class:label},width,height){const [x,y,w,h]=bbox,center=x+w/2,area=w*h/(width*height),largeEnough=area>(label==='person'?.12:.08)||w/width>.42||h/height>.48;return center>width*.22&&center<width*.78&&y+h>height*.55&&largeEnough}
export function isVisualPathBlocked({contrast,edgeDensity,darkRatio}){return contrast>38&&edgeDensity>.16||darkRatio>.72}
function visualPathMetrics(video){sceneCanvas??=document.createElement('canvas');sceneCanvas.width=64;sceneCanvas.height=48;const ctx=sceneCanvas.getContext('2d',{willReadFrequently:true}),sourceX=video.videoWidth*.2,sourceY=video.videoHeight*.28,sourceW=video.videoWidth*.6,sourceH=video.videoHeight*.7;ctx.drawImage(video,sourceX,sourceY,sourceW,sourceH,0,0,64,48);const pixels=ctx.getImageData(0,0,64,48).data,values=[];for(let i=0;i<pixels.length;i+=4)values.push(pixels[i]*.299+pixels[i+1]*.587+pixels[i+2]*.114);const mean=values.reduce((sum,n)=>sum+n,0)/values.length,contrast=Math.sqrt(values.reduce((sum,n)=>sum+(n-mean)**2,0)/values.length),darkRatio=values.filter(n=>n<35).length/values.length;let edges=0,total=0;for(let y=1;y<48;y++)for(let x=1;x<64;x++){const i=y*64+x;if(Math.abs(values[i]-values[i-1])>28||Math.abs(values[i]-values[i-64])>28)edges++;total++}return{contrast,edgeDensity:edges/total,darkRatio}}
async function detectObstacles(){
 const video=$('#arCamera');if(obstacleBusy||!cameraStream||!obstacleModel||video.readyState<2)return;obstacleBusy=true;
 try{const predictions=(await obstacleModel.detect(video,8,.6)).filter(item=>obstacleLabels.has(item.class)),width=video.videoWidth||1,height=video.videoHeight||1,blocking=predictions.filter(item=>isLargeBlockingObstacle(item,width,height)),sceneBlocked=isVisualPathBlocked(visualPathMetrics(video));sceneBlockedFrames=sceneBlocked?sceneBlockedFrames+1:Math.max(0,sceneBlockedFrames-1);if(!blocking.length&&sceneBlockedFrames>=3)blocking.push({class:'통로 막힘 의심',score:.7,bbox:[width*.2,height*.28,width*.6,height*.7]});drawObstacleBoxes(blocking,blocking);setObstacleState(blocking)}finally{obstacleBusy=false}
}
function setObstacleState(blocking){
 obstacleBlocked=blocking.length>0;const status=$('#obstacleStatus'),screen=$('.ar-screen');screen.classList.toggle('obstacle-blocked',obstacleBlocked);status.classList.toggle('detected',obstacleBlocked);
 if(!obstacleBlocked){obstacleSince=0;setObstacleUi('active','AI 장애물 인식 켜짐');return}const labels=[...new Set(blocking.map(item=>item.class))].join(', ');status.textContent=`전방 대형 물체 감지 · ${labels}`;$('#arMessage').textContent='멈추세요. 경로 지도를 열어 우회 여부를 선택하세요.';const now=Date.now();obstacleSince||=now;if(now-lastObstacleWarningAt>5000){lastObstacleWarningAt=now;speakGuide('전방 통로가 막혔습니다. 경로 지도에서 우회 여부를 선택하세요.',true)}
}
async function startObstacleDetection(){
 stopObstacleDetection();setObstacleUi('loading','AI 장애물 인식 준비 중');try{await loadObstacleModel();if(!cameraStream){setObstacleUi('off','카메라 연결 후 인식 가능');return}setObstacleUi('active','AI 장애물 인식 자동 작동 중');obstacleTimer=setInterval(detectObstacles,850);detectObstacles()}catch(error){console.error('Obstacle detection failed',error);setObstacleUi('error','AI 장애물 인식 재연결 중');$('#arMessage').textContent='장애물 인식을 자동으로 다시 연결하고 있습니다.';obstacleRetryTimer=setTimeout(()=>{if(cameraStream)startObstacleDetection()},5000)}
}
function stopObstacleDetection(){if(obstacleTimer){clearInterval(obstacleTimer);obstacleTimer=null}if(obstacleRetryTimer){clearTimeout(obstacleRetryTimer);obstacleRetryTimer=null}obstacleBlocked=false;obstacleBusy=false;obstacleSince=0;sceneBlockedFrames=0;const canvas=$('#obstacleCanvas'),ctx=canvas?.getContext('2d');if(ctx)ctx.clearRect(0,0,canvas.width,canvas.height);$('#obstacleStatus')?.classList.remove('detected');$('.ar-screen')?.classList.remove('obstacle-blocked');setObstacleUi('off','AI 장애물 인식 꺼짐')}
function stopAr(){toggleArMap(false);stopObstacleDetection();if(cameraStream){cameraStream.getTracks().forEach(track=>track.stop());cameraStream=null}torchOn=false;stopSignal();window.speechSynthesis?.cancel();$('#torchButton')?.classList.remove('active');if($('#torchButton'))$('#torchButton').disabled=true}
async function toggleTorch(){const track=cameraStream?.getVideoTracks()[0];if(!track)return;try{torchOn=!torchOn;await track.applyConstraints({advanced:[{torch:torchOn}]});$('#torchButton').classList.toggle('active',torchOn);$('#torchButton').setAttribute('aria-pressed',String(torchOn))}catch{torchOn=false;$('#arMessage').textContent='현재 선택된 카메라의 손전등을 제어할 수 없습니다.'}}
function setSensorUi(state,text){const button=$('#sensorButton');if(!button)return;button.classList.toggle('active',state==='active');button.classList.toggle('error',state==='error');button.querySelector('span:last-child').textContent=text}
async function enableSensors(showMessage=true){try{orientationReceived=false;motionReceived=false;const requests=[];if(typeof DeviceOrientationEvent?.requestPermission==='function')requests.push(DeviceOrientationEvent.requestPermission());if(typeof DeviceMotionEvent?.requestPermission==='function')requests.push(DeviceMotionEvent.requestPermission());const results=await Promise.all(requests);if(results.some(result=>result!=='granted'))throw new Error('denied');if(!sensorActive){window.addEventListener('deviceorientation',onOrientation,true);window.addEventListener('devicemotion',onMotion,true);sensorActive=true}clearTimeout(sensorCheckTimer);sensorCheckTimer=setTimeout(()=>{if(!orientationReceived&&!motionReceived&&showMessage)$('#arMessage').textContent='센서 데이터가 들어오지 않습니다. 브라우저의 동작 및 방향 접근을 허용해주세요.'},2500)}catch{if(showMessage)$('#arMessage').textContent='브라우저 설정에서 동작 및 방향 접근을 허용해주세요.'}}
function updateSensorReception(){setSensorUi('active',orientationReceived&&motionReceived?'센서 작동':'센서 일부 수신')}
function onOrientation(event){const heading=event.webkitCompassHeading??(event.alpha==null?null:360-event.alpha);if(heading==null)return;orientationReceived=true;updateSensorReception();currentHeading=heading;updateDirection(targetBearing-heading)}
function onMotion(event){motionReceived=true;updateSensorReception();if(!cameraStream||arCompleted)return;const a=event.accelerationIncludingGravity;if(!a)return;const magnitude=Math.hypot(a.x||0,a.y||0,a.z||0),delta=Math.abs(magnitude-lastMagnitude),now=Date.now();lastMagnitude=magnitude;if(delta>1.8&&delta<7&&now-lastStepAt>380){lastStepAt=now;const progress=advanceArDistance(remainingDistance,{obstacle:obstacleBlocked,heading:currentHeading,target:targetBearing});if(progress.reason==='obstacle'){$('#arMessage').textContent='전방 장애물로 이동 거리를 멈췄습니다. 안전을 확인하세요.';return}if(progress.reason!=='advanced'){$('#arMessage').textContent=currentHeading===null?'방향을 확인하는 중입니다. 센서 안내 후 이동하세요.':'잘못된 방향입니다. 화살표 방향으로 돌아서세요.';if(now-lastWrongWayAt>5000){lastWrongWayAt=now;speakGuide(currentHeading===null?'방향을 확인하고 있습니다. 잠시 기다려 주세요.':'잘못된 방향입니다. 화살표 방향으로 돌아서세요.',true)}return}lastTrackingMoveAt=now;$('#arMessage').textContent='올바른 방향으로 이동 중입니다.';remainingDistance=progress.distance;$('#arDistance').textContent=remainingDistance;updateRouteProgress();if(remainingDistance<=lastDistanceCallout-5&&remainingDistance>0){lastDistanceCallout=remainingDistance;speakGuide(`${Math.ceil(remainingDistance)}미터 남았습니다.`)}if(remainingDistance===0&&arStepIndex<arSteps.length-1)activateArStep(arStepIndex+1);else if(remainingDistance===0){arCompleted=true;$('#arDirection').textContent='안전지대에 도착했습니다. 안내를 계속 유지합니다.';$('#arExitName').textContent='안전지대 도착 · 작동 중';$('#arMessage').textContent='카메라·음성·호출 신호가 계속 작동합니다.';updateRouteProgress();speakGuide('안전지대에 도착했습니다. 안내 기능을 계속 유지합니다.',true)}}}
function speakGuide(text,force=false){if(!voiceOn||!('speechSynthesis'in window)||(!force&&Date.now()-lastSpokenAt<3500))return;const utterance=new SpeechSynthesisUtterance(text);utterance.lang='ko-KR';utterance.rate=.92;utterance.pitch=1;speechSynthesis.cancel();speechSynthesis.speak(utterance);lastSpokenAt=Date.now()}
function toggleVoice(){voiceOn=!voiceOn;$('#voiceButton').classList.toggle('active',voiceOn);$('#voiceButton').setAttribute('aria-pressed',String(voiceOn));if(voiceOn)speakGuide($('#arDirection').textContent,true);else window.speechSynthesis?.cancel()}
function rescueBeep(){navigator.vibrate?.([250,120,250]);const AudioEngine=window.AudioContext||window.webkitAudioContext;if(!AudioEngine)return;audioContext??=new AudioEngine();const osc=audioContext.createOscillator(),gain=audioContext.createGain(),now=audioContext.currentTime;osc.type='square';osc.frequency.setValueAtTime(880,now);osc.frequency.setValueAtTime(1175,now+.18);gain.gain.setValueAtTime(.001,now);gain.gain.linearRampToValueAtTime(.32,now+.02);gain.gain.linearRampToValueAtTime(.001,now+.42);osc.connect(gain).connect(audioContext.destination);osc.start(now);osc.stop(now+.45)}
function repeatRescueVoice(){speakGuide('도움이 필요합니다. 사람이 있습니다.',true)}
function toggleSignal(){signalOn=!signalOn;$('#signalButton').classList.toggle('active',signalOn);$('#signalButton').setAttribute('aria-pressed',String(signalOn));$('.ar-screen').classList.toggle('signal-active',signalOn);if(signalOn){rescueBeep();repeatRescueVoice();signalTimer=setInterval(rescueBeep,1400);signalVoiceTimer=setInterval(repeatRescueVoice,6000);$('#arMessage').textContent='호출 신호와 음성 반복 중 · 다시 누르면 정지합니다.'}else stopSignal()}
function stopSignal(){signalOn=false;if(signalTimer){clearInterval(signalTimer);signalTimer=null}if(signalVoiceTimer){clearInterval(signalVoiceTimer);signalVoiceTimer=null}navigator.vibrate?.(0);$('#signalButton')?.classList.remove('active');$('.ar-screen')?.classList.remove('signal-active');$('#signalButton')?.setAttribute('aria-pressed','false')}
if(typeof document!=='undefined'){$('#close').onclick=$('#modalConfirm').onclick=()=>$('#modal').classList.remove('open');$('#arStart').onclick=startAr;$('#homeArStart').onclick=startAr;$('#kakaoLocation').onclick=shareKakaoLocation;$('#arClose').onclick=()=>show(1);$('#mapButton').onclick=()=>toggleArMap();$('#mapClose').onclick=()=>toggleArMap(false);$('#blockedRouteButton').onclick=()=>recalculateDetour('신고된 막힌 통로');$('#arMapModal').onclick=event=>{if(event.target===$('#arMapModal'))toggleArMap(false)};$('#torchButton').onclick=toggleTorch;$('#voiceButton').onclick=toggleVoice;$('#signalButton').onclick=toggleSignal;$('#guardian').onclick=()=>modal('보호자에게 알리기',alertSummary('보호자'));$('#manager').onclick=()=>modal('관리자에게 알리기',alertSummary('관리자'));window.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('#arMapModal').hidden)toggleArMap(false)});window.addEventListener('pagehide',stopAr);const sharedTrackingId=new URLSearchParams(location.search).get('track');if(sharedTrackingId)startTrackingView(sharedTrackingId);else renderFloor()}
