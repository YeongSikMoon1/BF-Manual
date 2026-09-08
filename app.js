const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const floorData={
 b1:{name:'지하 1층',image:'assets/지하평면도.png',locations:[['west-elevator','서측 엘리베이터 홀'],['control-room','중앙 관리실'],['east-elevator','동측 엘리베이터 홀']],exits:[['서쪽 비상구',7.3,39],['서측 중앙 비상구',28.3,60.1],['중앙 비상구',53.4,63.1],['남측 중앙 비상구',46.8,78],['동북쪽 비상구',87.5,28.6],['동쪽 비상구',93.4,51.6]]},
 '1f':{name:'1층',image:'assets/전시동 1층.png',locations:[['hall1','제1전시장'],['hall2','제2전시장'],['hall3','제3전시장'],['multi','다목적홀']],exits:[['서쪽 비상구',8.1,49.2],['남서쪽 비상구',50.6,93.3],['남쪽 비상구',74,92.6],['동북쪽 비상구',91.7,41.1],['동쪽 비상구',92.6,67.9],['동남쪽 비상구',90.7,77.9]]},
 '2f':{name:'2층',image:'assets/전시동 2층.png',locations:[['201','201호'],['202','202호'],['203','203호'],['204','204호'],['205','205호'],['206','206호'],['207','207호'],['208','208호'],['209','209호'],['210','210호'],['211','211호'],['212','212호'],['213','213호'],['214','214호']],exits:[['서북쪽 비상구',12.7,40.7],['서쪽 비상구',8.7,65.7],['중앙 비상구 1',36.8,65.7],['중앙 비상구 2',52.1,65.9],['동북쪽 비상구',89.6,32.1],['동쪽 비상구',95.5,46.4],['동측 복도 비상구',76.8,50.4],['동남쪽 비상구',81.4,81.5]]},
 '3f':{name:'3층',image:'assets/전시동 3층.png',locations:[['301','301호'],['302','302호'],['303','303호'],['304','304호'],['305','305호'],['306','306호'],['307','307호']],exits:[['서북쪽 비상구',20.5,25.9],['동쪽 비상구',90.6,54.1]]}
};

// Each selectable place has an interior rectangle, its doorway and a corridor node.
const navigation={
 b1:{rooms:{
  'west-elevator':[[20,57,23.5,63],[24,63],'w'],'control-room':[[42,56,50,62],[48,63],'c2'],
  'east-elevator':[[85,41,90,49],[85,50],'e']},
  nodes:{west:[7.3,39],w:[25,63],c1:[28.3,60.1],c2:[53.4,63.1],south:[46.8,78],c3:[70,65],e:[84,58],ne:[87.5,28.6],east:[93.4,51.6]},
  links:[['west','w'],['w','c1'],['c1','c2'],['c2','south'],['c2','c3'],['c3','e'],['e','ne'],['e','east']],
  exitNodes:{'서쪽 비상구':'west','서측 중앙 비상구':'c1','중앙 비상구':'c2','남측 중앙 비상구':'south','동북쪽 비상구':'ne','동쪽 비상구':'east'}},
 '1f':{rooms:{
  hall1:[[17,25,39,48],[32,52],'c2'],hall2:[[40,27,61,51],[51,53],'c3'],
  hall3:[[62,31,82,53],[72,55],'c4'],multi:[[13,64,43,83],[38,62],'c2']},
  nodes:{west:[8.1,49.2],c1:[18,57],c2:[36,57],c3:[55,58],c4:[73,59],c5:[86,59],ne:[91.7,41.1],east:[92.6,67.9],se:[90.7,77.9],south1:[50.6,93.3],south2:[74,92.6]},
  links:[['west','c1'],['c1','c2'],['c2','c3'],['c3','c4'],['c4','c5'],['c5','ne'],['c5','east'],['east','se'],['c3','south1'],['c4','south2']],
  exitNodes:{'서쪽 비상구':'west','남서쪽 비상구':'south1','남쪽 비상구':'south2','동북쪽 비상구':'ne','동쪽 비상구':'east','동남쪽 비상구':'se'}},
 '2f':{rooms:{
  '201':[[13,55.5,18.5,63],[18,54],'u1'],'202':[[19.5,55.5,26,63],[23,54],'u2'],
  '203':[[27,55.5,33.5,63],[31,54],'u3'],'204':[[34.5,55.5,41,63],[39,54],'u4'],
  '205':[[42,55.5,48.5,63],[46,54],'u5'],'206':[[49,55.5,56,63],[54,54],'u6'],
  '207':[[57,55.5,64,63],[62,54],'u7'],'208':[[57,68,63,74],[56,71],'v1'],
  '209':[[64,68,69.5,74],[63,71],'v1'],'210':[[57,76,63,82],[56,79],'v2'],
  '211':[[64,76,69.5,82],[63,79],'v2'],'212':[[64,83,69.5,89],[63,86],'v3'],
  '213':[[57,84,63,90],[56,87],'v3'],'214':[[72,75,80,84],[71,79],'r2']},
  nodes:{nw:[12.7,40.7],west:[8.7,65.7],u0:[10,52],u1:[18,52],u2:[23,52],u3:[31,52],u4:[39,52],u5:[46,52],u6:[54,52],u7:[62,52],u8:[72,52],hallExit:[76.8,50.4],u9:[82,52],c1:[36.8,65.7],c2:[52.1,65.9],v1:[55,71],v2:[55,79],v3:[55,87],r1:[70,87],r2:[72,79],right:[84,72],ne:[89.6,32.1],east:[95.5,46.4],se:[81.4,81.5]},
  links:[['nw','u0'],['west','u0'],['u0','u1'],['u1','u2'],['u2','u3'],['u3','u4'],['u4','u5'],['u5','u6'],['u6','u7'],['u7','u8'],['u8','hallExit'],['u8','u9'],['u6','v1'],['v1','v2'],['v2','v3'],['v3','r1'],['r1','r2'],['r2','right'],['u9','ne'],['u9','east'],['u9','right'],['right','se']],
  exitNodes:{'서북쪽 비상구':'nw','서쪽 비상구':'west','중앙 비상구 1':'c1','중앙 비상구 2':'c2','동북쪽 비상구':'ne','동쪽 비상구':'east','동측 복도 비상구':'hallExit','동남쪽 비상구':'se'}},
 '3f':{rooms:{
  '301':[[23,37,36,53],[30,55],'c2'],'302':[[37,37,50,53],[45,55],'c3'],
  '304':[[51,37,64,53],[60,55],'c4'],'303':[[23,61,36,75],[30,59],'c2'],
  '305':[[37,61,50,75],[45,59],'c3'],'306':[[51,61,64,75],[60,59],'c4'],
  '307':[[74,48,86,68],[71,58],'c5']},
  nodes:{nw:[20.5,25.9],c1:[18,57],c2:[30,57],c3:[45,57],c4:[60,57],c5:[71,57],c6:[84,57],east:[90.6,54.1]},
  links:[['nw','c1'],['c1','c2'],['c2','c3'],['c3','c4'],['c4','c5'],['c5','c6'],['c6','east']],
  exitNodes:{'서북쪽 비상구':'nw','동쪽 비상구':'east'}}
};

Object.entries(navigation).forEach(([key,nav])=>floorData[key].locations.forEach(item=>{const b=nav.rooms[item[0]][0];item[2]=(b[0]+b[2])/2;item[3]=(b[1]+b[3])/2}));
let floor='2f',locationId='205',mobility='혼자서 이동할 수 있어요';
const hazardsByFloor={},locationPoints=new Map();
function weightedCount(){const roll=Math.random();return roll<.7?0:roll<.9?1:2}
function createHazardsForFloor(key,count=weightedCount()){const data=floorData[key],picked=[];while(picked.length<count){const item=data.locations[Math.floor(Math.random()*data.locations.length)];if(!picked.includes(item))picked.push(item)}hazardsByFloor[key]=picked.map(item=>({item,scale:+(1.5+Math.random()*1.5).toFixed(2)}))}
Object.keys(floorData).forEach(key=>createHazardsForFloor(key));
if(Object.values(hazardsByFloor).every(list=>!list.length)){const keys=Object.keys(floorData),key=keys[Math.floor(Math.random()*keys.length)];createHazardsForFloor(key,1)}
function hazards(){return hazardsByFloor[floor]}
function randomPointFor(key,id){const cacheKey=`${key}:${id}`;if(locationPoints.has(cacheKey))return locationPoints.get(cacheKey);const [x1,y1,x2,y2]=navigation[key].rooms[id][0],padX=(x2-x1)*.22,padY=(y2-y1)*.22;const point=[x1+padX+Math.random()*(x2-x1-padX*2),y1+padY+Math.random()*(y2-y1-padY*2)];locationPoints.set(cacheKey,point);return point}
function currentLocation(){return floorData[floor].locations.find(x=>x[0]===locationId)||floorData[floor].locations[0]}
function edgeClear(a,b,margin=2.8){return hazards().every(h=>segmentDistance(h.item[2],h.item[3],a,b)>h.scale*4.3+margin)}
function segmentDistance(x,y,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy||1))),px=a[0]+t*dx,py=a[1]+t*dy;return Math.hypot(x-px,y-py)}
function pathLength(path){return path.slice(1).reduce((n,p,i)=>n+Math.hypot(p[0]-path[i][0],p[1]-path[i][1]),0)}
function planRoute(){
 const nav=navigation[floor],selected=currentLocation(),room=nav.rooms[selected[0]],start=randomPointFor(floor,selected[0]),door=room[1],entry=room[2];
 const nodes={...nav.nodes,start,door},links=[...nav.links,['start','door'],['door',entry]],strict=shortestRoutes(nodes,links,true);
 let candidates=floorData[floor].exits.map(exit=>{const names=strict[nav.exitNodes[exit[0]]];return names&&{exit,path:names.map(name=>nodes[name]),blocked:false}}).filter(Boolean);
 if(!candidates.length){const nearest=[...floorData[floor].exits].sort((a,b)=>Math.hypot(a[1]-door[0],a[2]-door[1])-Math.hypot(b[1]-door[0],b[2]-door[1]))[0];return{exit:nearest,path:[start,door],blocked:true,noPath:true}}
 const route=candidates.sort((a,b)=>pathLength(a.path)-pathLength(b.path))[0];route.path=route.path.filter((p,i,a)=>!i||p[0]!==a[i-1][0]||p[1]!==a[i-1][1]);return route;
}
function shortestRoutes(nodes,links,strict){
 const graph={};Object.keys(nodes).forEach(k=>graph[k]=[]);
 links.forEach(([a,b])=>{const requiredEgress=['start','door'].includes(a)||['start','door'].includes(b),clear=requiredEgress||edgeClear(nodes[a],nodes[b]),risk=clear?0:1000;if(strict&&!clear)return;const cost=Math.hypot(nodes[a][0]-nodes[b][0],nodes[a][1]-nodes[b][1])+risk;graph[a].push([b,cost]);graph[b].push([a,cost])});
 const dist={start:0},paths={start:['start']},queue=['start'];
 while(queue.length){queue.sort((a,b)=>dist[a]-dist[b]);const at=queue.shift();graph[at].forEach(([next,cost])=>{const value=dist[at]+cost;if(value<(dist[next]??Infinity)){dist[next]=value;paths[next]=[...paths[at],next];if(!queue.includes(next))queue.push(next)}})}
 return paths;
}
function safestExit(){return planRoute().exit}
function show(step){$$('.screen').forEach(x=>x.classList.toggle('active',x.dataset.screen===String(step)));$$('.steps button').forEach(x=>x.classList.toggle('active',x.dataset.step===String(step)));if(step===3)renderFloor();if(step===4)renderResult()}
function renderFloor(){
 const data=floorData[floor],overlay=$('#mapOverlay'),route=planRoute(),selected=currentLocation(),point=randomPointFor(floor,selected[0]),img=$('#map');
 img.src=data.image;img.alt=`${data.name} 평면도`;$('#locationGroupTitle').textContent='현재 위치를 선택하세요';overlay.replaceChildren();drawRoute(overlay,route);
 const marker=document.createElement('span');marker.className='selected-location';marker.style.cssText=`left:${point[0]}%;top:${point[1]}%`;marker.title=`${selected[1]} 내부 현재 위치`;overlay.append(marker);hazards().forEach(h=>renderHazard(overlay,h));
 const count=hazards().length,activeFloors=Object.entries(hazardsByFloor).filter(([,list])=>list.length).map(([key])=>floorData[key].name);
 $('#hazardTitle').textContent=count?`화재·연기 감지: ${hazards().map(h=>h.item[1]).join(', ')}`:`현재 ${activeFloors.join('과 ')}에 화재가 진행되고 있습니다.`;
 $('#hazardDescription').textContent=route.blocked?'모든 통로가 위험 구역과 겹칩니다. 안내 요원의 지시를 기다리세요.':count?`${route.exit[0]}까지 연기와 화재를 피해 안내합니다.`:'신속히 건물을 빠져나오세요.';
 $('.hazard').classList.add('hazard-live');renderButtons();
}
function drawRoute(overlay,route){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','route-layer');svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');const points=route.path.map(p=>p.join(',')).join(' ');svg.innerHTML=`<polyline class="route-shadow" points="${points}"/><polyline class="route-line" points="${points}"/>${route.noPath?'':`<circle class="route-end" cx="${route.exit[1]}" cy="${route.exit[2]}" r=".7"/>`}`;overlay.append(svg);if(route.noPath)return;const destination=document.createElement('span');destination.className='route-destination';destination.textContent='출구';destination.style.cssText=`left:${route.exit[1]}%;top:${route.exit[2]}%`;destination.title=route.exit[0];overlay.append(destination)}
function renderButtons(){const box=$('#rooms');box.replaceChildren();floorData[floor].locations.forEach(([id,label])=>{const b=document.createElement('button');b.textContent=label;b.classList.toggle('selected',id===locationId);b.onclick=()=>selectLocation(id);box.append(b)})}
function selectLocation(id){locationId=id;const item=currentLocation();randomPointFor(floor,id);$('#locationText').textContent=`${floorData[floor].name} ${item[1]}`;renderFloor()}
function renderHazard(overlay,{item,scale}){const [,label,x,y]=item,smoke=document.createElement('span'),fire=document.createElement('span');smoke.className='smoke-zone';smoke.style.cssText=`left:${x}%;top:${y}%;--scale:${scale}`;smoke.title=`${label} 연기 범위`;fire.className='fire-point';fire.style.cssText=`left:${x}%;top:${y}%`;fire.title=`${label} 화재`;fire.innerHTML='<svg aria-hidden="true"><use href="#icon-fire"/></svg>';overlay.append(smoke,fire)}
function renderResult(){const data=floorData[floor],item=currentLocation(),route=planRoute(),exit=route.exit[0];$('#resultLocation').textContent=`${data.name} ${item[1]}`;$('#resultStatus').textContent=mobility;$('#resultExit').textContent=/휠체어|어려워/.test(mobility)?`${exit} 인근 안전 대피장소`:exit;$('.result-hazard strong').textContent=hazards().length?`${hazards().map(h=>h.item[1]).join(', ')}에서 화재와 연기가 감지되었습니다.`:`현재 ${Object.entries(hazardsByFloor).filter(([,v])=>v.length).map(([k])=>floorData[k].name).join('과 ')}에 화재가 진행되고 있습니다.`;$('.result-hazard small').textContent=route.blocked?'안전한 통로가 확보될 때까지 안내 요원의 지시를 기다리세요.':`${exit} 방향으로 연기 구역을 우회하세요.`}
$$('[data-step],[data-go]').forEach(b=>b.onclick=()=>show(Number(b.dataset.step||b.dataset.go)));$$('[data-help]').forEach(b=>b.onclick=()=>show(2));$$('[data-next]').forEach(b=>b.onclick=()=>show(Number(b.dataset.next)));$$('[data-status]').forEach(b=>b.onclick=()=>{$$('[data-status]').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');mobility=b.dataset.status;$('.primary.disabled')?.classList.remove('disabled')});$$('[data-floor]').forEach(b=>b.onclick=()=>{floor=b.dataset.floor;locationId=floorData[floor].locations[0][0];$$('[data-floor]').forEach(x=>x.classList.toggle('selected',x.dataset.floor===floor));selectLocation(locationId)});
function modal(title,text){$('#modalTitle').textContent=title;$('#modalText').textContent=text;$('#modal').classList.add('open')}$('#close').onclick=$('#modalConfirm').onclick=()=>$('#modal').classList.remove('open');$('#arStart').onclick=()=>modal('탈출 안내 시작',`${safestExit()[0]} 방향으로 안내를 시작합니다.`);$('#guardian').onclick=()=>modal('보호자에게 알리기',`현재 위치와 ${safestExit()[0]} 대피 경로를 전달할 메시지를 준비했습니다.`);$('#manager').onclick=()=>modal('관리자에게 알리기',`현재 위치, 이동 상태, ${safestExit()[0]} 추천 정보를 전달할 메시지를 준비했습니다.`);$('#nextGuide').onclick=()=>modal('다음 안내',`${safestExit()[0]} 방향으로 위험 구역을 우회해 이동하세요.`);renderFloor();
