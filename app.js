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
  'west-elevator':[[20,57,23.5,63],[24,63],'w','서쪽 비상구'],'control-room':[[42,56,50,62],[48,63],'c2','중앙 비상구'],
  'east-elevator':[[85,41,90,49],[85,50],'e','동쪽 비상구']},
  nodes:{west:[7.3,39],w:[25,63],c1:[28.3,60.1],c2:[53.4,63.1],south:[46.8,78],c3:[70,65],e:[84,58],ne:[87.5,28.6],east:[93.4,51.6]},
  links:[['west','w'],['w','c1'],['c1','c2'],['c2','south'],['c2','c3'],['c3','e'],['e','ne'],['e','east']],
  exitNodes:{'서쪽 비상구':'west','서측 중앙 비상구':'c1','중앙 비상구':'c2','남측 중앙 비상구':'south','동북쪽 비상구':'ne','동쪽 비상구':'east'}},
 '1f':{rooms:{
  hall1:[[17,25,39,48],[32,52],'c2','서쪽 비상구'],hall2:[[40,27,61,51],[51,53],'c3','동쪽 비상구'],
  hall3:[[62,31,82,53],[72,55],'c4','동북쪽 비상구'],multi:[[13,64,43,83],[38,62],'c2','서쪽 비상구']},
  nodes:{west:[8.1,49.2],c1:[18,57],c2:[36,57],c3:[55,58],c4:[73,59],c5:[86,59],ne:[91.7,41.1],east:[92.6,67.9],se:[90.7,77.9],south1:[50.6,93.3],south2:[74,92.6]},
  links:[['west','c1'],['c1','c2'],['c2','c3'],['c3','c4'],['c4','c5'],['c5','ne'],['c5','east'],['east','se']],
  exitNodes:{'서쪽 비상구':'west','남서쪽 비상구':'south1','남쪽 비상구':'south2','동북쪽 비상구':'ne','동쪽 비상구':'east','동남쪽 비상구':'se'}},
 '2f':{rooms:{
  '201':[[13,55.5,18.5,63],[18,54],'u1','서쪽 비상구'],'202':[[19.5,55.5,26,63],[23,54],'u2','서쪽 비상구'],
  '203':[[27,55.5,33.5,63],[31,54],'u3','서쪽 비상구'],'204':[[34.5,55.5,41,63],[39,54],'u4','서쪽 비상구'],
  '205':[[42,55.5,48.5,63],[46,54],'u5','동측 복도 비상구'],'206':[[49,55.5,56,63],[54,54],'u6','동측 복도 비상구'],
  '207':[[57,55.5,64,63],[62,54],'u7','동측 복도 비상구'],'208':[[57,68,63,74],[57,70],'l1','중앙 비상구 2'],
  '209':[[64,68,69.5,74],[69.5,70],'r1','동남쪽 비상구'],'210':[[57,81.5,63,87],[57,84],'l3','중앙 비상구 2'],
  '211':[[64,75,69.5,81],[69.5,77],'r2','동남쪽 비상구'],'212':[[64,82,69.5,87.5],[69.5,84],'r3','동남쪽 비상구'],
  '213':[[57,87.5,63,92],[57,89.5],'l4','중앙 비상구 2'],'214':[[72,75,80,84],[71.5,79],'r214','동남쪽 비상구']},
  nodes:{nw:[12.7,40.7],west:[8.7,65.7],u0:[10,52],u1:[18,52],u2:[23,52],u3:[31,52],u4:[39,52],u5:[46,52],u6:[54,52],u7:[62,52],u8:[72,52],hallExit:[76.8,50.4],u9:[82,52],c1:[36.8,65.7],c2:[52.1,65.9],l1:[55,70],l2:[55,77],l3:[55,84],l4:[55,89.5],rNorth:[70,57],rTop:[70,66],r1:[70,70],r2:[70,77],r214:[70,79],r3:[70,84],r4:[70,89.5],rightTop:[84,66],right:[84,70],seApproach:[84,81.5],ne:[89.6,32.1],east:[95.5,46.4],se:[81.4,81.5]},
  links:[['nw','u0'],['west','u0'],['u0','u1'],['u1','u2'],['u2','u3'],['u3','u4'],['u4','u5'],['u5','u6'],['u6','u7'],['u7','u8'],['u8','hallExit'],['u8','u9'],['u9','ne'],['u9','east'],['u8','rNorth'],['rNorth','rTop'],['c2','l1'],['l1','l2'],['l2','l3'],['l3','l4'],['rTop','r1'],['r1','r2'],['r2','r214'],['r214','r3'],['r3','r4'],['rTop','rightTop'],['rightTop','right'],['right','seApproach'],['seApproach','se']],
  exitNodes:{'서북쪽 비상구':'nw','서쪽 비상구':'west','중앙 비상구 1':'c1','중앙 비상구 2':'c2','동북쪽 비상구':'ne','동쪽 비상구':'east','동측 복도 비상구':'hallExit','동남쪽 비상구':'se'}},
 '3f':{rooms:{
  '301':[[23,37,36,53],[25,36],'top1','서북쪽 비상구'],'302':[[37,37,50,53],[49.5,36],'top2','서북쪽 비상구'],
  '304':[[51,37,64,53],[63.5,52],'midR','동쪽 비상구'],'303':[[23,61,36,75],[24,75.5],'lower1','서북쪽 비상구'],
  '305':[[37,61,50,75],[38,75.5],'lower2','서북쪽 비상구'],'306':[[51,61,64,75],[63.5,61],'midR','동쪽 비상구'],
  '307':[[74,48,86,68],[86,57],'eastCorr','동쪽 비상구']},
  nodes:{nw:[20.5,25.9],topL:[20,32],top1:[25,32],top2:[49.5,32],top3:[61,32],midR:[66,57],eastCorr:[88,57],east:[90.6,54.1],lowerL:[20,78],lower1:[24,78],lower2:[38,78],lower3:[60,78]},
  links:[['nw','topL'],['topL','top1'],['top1','top2'],['top2','top3'],['top3','midR'],['midR','eastCorr'],['eastCorr','east'],['topL','lowerL'],['lowerL','lower1'],['lower1','lower2'],['lower2','lower3'],['lower3','midR']],
  exitNodes:{'서북쪽 비상구':'nw','동쪽 비상구':'east'}}
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
function evacuationPayload(){
 const selected=currentLocation(),route=planRoute(),point=randomPointFor(floor,selected[0]);
 const buildingHazards=Object.entries(hazardsByFloor).flatMap(([floorKey,list])=>list.map(({item,scale})=>({floor:floorData[floorKey].name,locationId:item[0],location:item[1],fire:{x:item[2],y:item[3]},smoke:{center:{x:item[2],y:item[3]},scale,radius:+(scale*4.3).toFixed(2)}})));
 return{floor:floorData[floor].name,currentRoom:{id:selected[0],name:selected[1]},currentPosition:{x:+point[0].toFixed(2),y:+point[1].toFixed(2)},mobility,hazards:buildingHazards,currentFloorHazards:buildingHazards.filter(h=>h.floor===floorData[floor].name),selectedExit:{name:route.exit[0],x:route.exit[1],y:route.exit[2]},route:{blocked:!!route.blocked,noPath:!!route.noPath,coordinates:route.path.map(([x,y])=>({x:+x.toFixed(2),y:+y.toFixed(2)}))}};
}
async function requestAiGuide(){const brief=$('#aiBrief'),guide=$('#aiGuide');brief.classList.remove('error');guide.textContent='화재·연기·현재 위치 정보를 분석 중입니다.';try{const response=await fetch('/api/evacuation-guide',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(evacuationPayload())});const data=await response.json();if(!response.ok)throw new Error(data.error||'AI 안내를 불러오지 못했습니다.');brief.querySelector('strong').textContent=data.headline;guide.textContent=data.instructions.join(' ')}catch(error){brief.classList.add('error');brief.querySelector('strong').textContent='기본 대피 안내를 사용합니다.';guide.textContent=error.message}}
function show(step){if(step!==5)stopAr();$('.phone').classList.toggle('ar-mode',step===5);$$('.screen').forEach(x=>x.classList.toggle('active',x.dataset.screen===String(step)));$$('.steps button').forEach(x=>x.classList.toggle('active',x.dataset.step===String(step)));if(step===3)renderFloor();if(step===4)renderResult()}
function renderFloor(){
 const data=floorData[floor],overlay=$('#mapOverlay'),route=planRoute(),selected=currentLocation(),point=randomPointFor(floor,selected[0]),img=$('#map');
 $$('[data-floor]').forEach(tab=>tab.classList.toggle('selected',tab.dataset.floor===floor));
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
function renderResult(){const data=floorData[floor],item=currentLocation(),route=planRoute(),exit=route.exit[0];$('#resultLocation').textContent=`${data.name} ${item[1]}`;$('#resultStatus').textContent=mobility;$('#resultExit').textContent=/휠체어|어려워/.test(mobility)?`${exit} 인근 안전 대피장소`:exit;$('.result-hazard strong').textContent=hazards().length?`${hazards().map(h=>h.item[1]).join(', ')}에서 화재와 연기가 감지되었습니다.`:`현재 ${Object.entries(hazardsByFloor).filter(([,v])=>v.length).map(([k])=>floorData[k].name).join('과 ')}에 화재가 진행되고 있습니다.`;$('.result-hazard small').textContent=route.blocked?'안전한 통로가 확보될 때까지 안내 요원의 지시를 기다리세요.':`${exit} 방향으로 연기 구역을 우회하세요.`;requestAiGuide()}
$$('[data-step],[data-go]').forEach(b=>b.onclick=()=>show(Number(b.dataset.step||b.dataset.go)));$$('[data-help]').forEach(b=>b.onclick=()=>show(2));$$('[data-next]').forEach(b=>b.onclick=()=>show(Number(b.dataset.next)));$$('[data-status]').forEach(b=>b.onclick=()=>{$$('[data-status]').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');mobility=b.dataset.status;$('.primary.disabled')?.classList.remove('disabled')});$$('[data-floor]').forEach(b=>b.onclick=()=>{floor=b.dataset.floor;locationId=floorData[floor].locations[0][0];$$('[data-floor]').forEach(x=>x.classList.toggle('selected',x.dataset.floor===floor));selectLocation(locationId)});
function modal(title,text){$('#modalTitle').textContent=title;$('#modalText').textContent=text;$('#modal').classList.add('open')}
function alertSummary(recipient){const item=currentLocation(),route=planRoute(),detected=hazards().length?hazards().map(h=>h.item[1]).join(', '):'현재 층 감지 없음';return`${recipient}에게 아래 내용을 전달합니다.\n\n현재 위치: ${floorData[floor].name} ${item[1]}\n이동 상태: ${mobility}\n화재·연기 위치: ${detected}\n추천 대피 지점: ${route.exit[0]}\n안내 상태: ${route.blocked?'안전한 통로 확인 필요':'연기 구역을 우회하는 경로 확보'}`}
function friendLocationSummary(){const item=currentLocation();return`친구에게 카카오톡 메시지를 전송합니다.\n\n현재 위치: 김대중컨벤션센터 전시동 ${floorData[floor].name} ${item[1]}\n메시지: 현재 이 위치에 있어요. 제 위치를 확인해주세요.`}
let cameraStream=null,torchOn=false,sensorActive=false,voiceOn=true,signalOn=false,signalTimer=null,audioContext=null,remainingDistance=24,lastStepAt=0,lastMagnitude=0,targetBearing=0,currentHeading=null,lastDirection='',lastSpokenAt=0,lastDistanceCallout=Infinity,lastWrongWayAt=0,arSteps=[],arStepIndex=0,arCompleted=false,arDestinationName='비상구';
function segmentBearing(a,b){return(Math.atan2(b[0]-a[0],a[1]-b[1])*180/Math.PI+360)%360}
function headingDifference(a,b){return Math.abs(((a-b+540)%360)-180)}
function buildArSteps(route){
 const points=[...route.path],last=points[points.length-1],before=points[points.length-2]||last,dx=last[0]-before[0],dy=last[1]-before[1],length=Math.hypot(dx,dy)||1,safe=[last[0]+dx/length*10,last[1]+dy/length*10];points.push(safe);
 return points.slice(1).map((point,index)=>{const from=points[index],bearing=segmentBearing(from,point),distance=Math.max(2,Math.round(Math.hypot(point[0]-from[0],point[1]-from[1])*1.45));let text;if(index===0)text=`문까지 ${distance}미터 이동하세요.`;else if(index===points.length-2)text=`비상구를 지나 안전지대까지 ${distance}미터 이동하세요.`;else{const previous=segmentBearing(points[index-1],from),turn=((bearing-previous+540)%360)-180,direction=Math.abs(turn)<25?'직진으로':turn>0?'오른쪽으로':'왼쪽으로';text=index===points.length-3?`${direction} ${distance}미터 걸으면 비상구에 도착합니다.`:`${direction} ${distance}미터 걸으세요.`}return{bearing,distance,text}})
}
function activateArStep(index,announce=true){const step=arSteps[index];if(!step)return;arStepIndex=index;remainingDistance=step.distance;lastDistanceCallout=remainingDistance;targetBearing=step.bearing;$('#arDistance').textContent=remainingDistance;$('#arDirection').textContent=step.text;$('#arExitName').textContent=`${arDestinationName} · 경로 ${index+1}/${arSteps.length}`;lastDirection=step.text;if(announce)speakGuide(step.text,true)}
function updateDirection(rotation){const normalized=((rotation+540)%360)-180;$('#arArrow').style.transform=`rotateZ(${normalized}deg) rotateX(55deg)`}
async function startAr(){
 const route=planRoute(),item=currentLocation();arDestinationName=route.exit[0];arSteps=buildArSteps(route);arCompleted=false;currentHeading=null;lastWrongWayAt=0;$('#arLocation').textContent=`${floorData[floor].name} ${item[1]}`;show(5);activateArStep(0,false);updateDirection(targetBearing);
 if(!navigator.mediaDevices?.getUserMedia){$('#arMessage').textContent='이 브라우저에서는 카메라를 사용할 수 없습니다.';return}
 try{const result=await connectBestCamera();$('#arCamera').srcObject=cameraStream;$('#torchButton').disabled=!result.torch;$('#arMessage').textContent=result.torch?`손전등 지원 카메라 연결됨 · ${result.label}`:`후면 카메라 연결됨 · 손전등 미지원`;speakGuide(`${route.exit[0]}까지 안내를 시작합니다. ${arSteps[0].text}`,true);await enableSensors(false)}catch(error){$('#arMessage').textContent=error.name==='NotAllowedError'?'카메라 권한이 거부되었습니다. 브라우저 설정에서 허용해주세요.':'후면 카메라를 시작할 수 없습니다.'}
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
function stopAr(){if(cameraStream){cameraStream.getTracks().forEach(track=>track.stop());cameraStream=null}torchOn=false;stopSignal();window.speechSynthesis?.cancel();$('#torchButton')?.classList.remove('active');if($('#torchButton'))$('#torchButton').disabled=true}
async function toggleTorch(){const track=cameraStream?.getVideoTracks()[0];if(!track)return;try{torchOn=!torchOn;await track.applyConstraints({advanced:[{torch:torchOn}]});$('#torchButton').classList.toggle('active',torchOn);$('#torchButton').setAttribute('aria-pressed',String(torchOn))}catch{torchOn=false;$('#arMessage').textContent='현재 선택된 카메라의 손전등을 제어할 수 없습니다.'}}
async function enableSensors(showMessage=true){try{if(typeof DeviceOrientationEvent?.requestPermission==='function'){const result=await DeviceOrientationEvent.requestPermission();if(result!=='granted')throw new Error('denied')}if(typeof DeviceMotionEvent?.requestPermission==='function'){const result=await DeviceMotionEvent.requestPermission();if(result!=='granted')throw new Error('denied')}if(!sensorActive){window.addEventListener('deviceorientation',onOrientation,true);window.addEventListener('devicemotion',onMotion,true);sensorActive=true}$('#sensorButton').classList.add('active');if(showMessage)$('#arMessage').textContent='방향 센서와 보행 감지가 켜졌습니다.'}catch{if(showMessage)$('#arMessage').textContent='센서 권한을 허용해야 방향과 보행을 감지할 수 있습니다.'}}
function onOrientation(event){const heading=event.webkitCompassHeading??(event.alpha==null?null:360-event.alpha);if(heading==null)return;currentHeading=heading;updateDirection(targetBearing-heading)}
function onMotion(event){if(!cameraStream||arCompleted)return;const a=event.accelerationIncludingGravity;if(!a)return;const magnitude=Math.hypot(a.x||0,a.y||0,a.z||0),delta=Math.abs(magnitude-lastMagnitude),now=Date.now();lastMagnitude=magnitude;if(delta>1.8&&delta<7&&now-lastStepAt>380){lastStepAt=now;const aligned=currentHeading!==null&&headingDifference(targetBearing,currentHeading)<=55;if(!aligned){$('#arMessage').textContent=currentHeading===null?'방향을 확인하는 중입니다. 센서 안내 후 이동하세요.':'잘못된 방향입니다. 화살표 방향으로 돌아서세요.';if(now-lastWrongWayAt>5000){lastWrongWayAt=now;speakGuide(currentHeading===null?'방향을 확인하고 있습니다. 잠시 기다려 주세요.':'잘못된 방향입니다. 화살표 방향으로 돌아서세요.',true)}return}$('#arMessage').textContent='올바른 방향으로 이동 중입니다.';remainingDistance=Math.max(0,+(remainingDistance-.7).toFixed(1));$('#arDistance').textContent=remainingDistance;if(remainingDistance<=lastDistanceCallout-5&&remainingDistance>0){lastDistanceCallout=remainingDistance;speakGuide(`${Math.ceil(remainingDistance)}미터 남았습니다.`)}if(remainingDistance===0&&arStepIndex<arSteps.length-1)activateArStep(arStepIndex+1);else if(remainingDistance===0){arCompleted=true;$('#arDirection').textContent='안전지대에 도착했습니다. 안내를 계속 유지합니다.';$('#arExitName').textContent='안전지대 도착 · 작동 중';$('#arMessage').textContent='카메라·음성·호출 신호가 계속 작동합니다.';speakGuide('안전지대에 도착했습니다. 안내 기능을 계속 유지합니다.',true)}}}
function speakGuide(text,force=false){if(!voiceOn||!('speechSynthesis'in window)||(!force&&Date.now()-lastSpokenAt<3500))return;const utterance=new SpeechSynthesisUtterance(text);utterance.lang='ko-KR';utterance.rate=.92;utterance.pitch=1;speechSynthesis.cancel();speechSynthesis.speak(utterance);lastSpokenAt=Date.now()}
function toggleVoice(){voiceOn=!voiceOn;$('#voiceButton').classList.toggle('active',voiceOn);$('#voiceButton').setAttribute('aria-pressed',String(voiceOn));if(voiceOn)speakGuide($('#arDirection').textContent,true);else window.speechSynthesis?.cancel()}
function rescueBeep(){navigator.vibrate?.([250,120,250]);const AudioEngine=window.AudioContext||window.webkitAudioContext;if(!AudioEngine)return;audioContext??=new AudioEngine();const osc=audioContext.createOscillator(),gain=audioContext.createGain(),now=audioContext.currentTime;osc.type='square';osc.frequency.setValueAtTime(880,now);osc.frequency.setValueAtTime(1175,now+.18);gain.gain.setValueAtTime(.001,now);gain.gain.linearRampToValueAtTime(.32,now+.02);gain.gain.linearRampToValueAtTime(.001,now+.42);osc.connect(gain).connect(audioContext.destination);osc.start(now);osc.stop(now+.45)}
function toggleSignal(){signalOn=!signalOn;$('#signalButton').classList.toggle('active',signalOn);$('#signalButton').setAttribute('aria-pressed',String(signalOn));$('.ar-screen').classList.toggle('signal-active',signalOn);if(signalOn){rescueBeep();signalTimer=setInterval(rescueBeep,1400);$('#arMessage').textContent='호출 신호 작동 중 · 다시 누르면 정지합니다.';speakGuide('도움이 필요합니다. 사람이 있습니다.',true)}else stopSignal()}
function stopSignal(){signalOn=false;if(signalTimer){clearInterval(signalTimer);signalTimer=null}navigator.vibrate?.(0);$('#signalButton')?.classList.remove('active');$('.ar-screen')?.classList.remove('signal-active');$('#signalButton')?.setAttribute('aria-pressed','false')}
$('#close').onclick=$('#modalConfirm').onclick=()=>$('#modal').classList.remove('open');$('#arStart').onclick=startAr;$('#homeArStart').onclick=startAr;$('#kakaoLocation').onclick=()=>modal('카카오톡으로 위치 전송',friendLocationSummary());$('#arClose').onclick=()=>show(1);$('#torchButton').onclick=toggleTorch;$('#voiceButton').onclick=toggleVoice;$('#signalButton').onclick=toggleSignal;$('#sensorButton').onclick=()=>enableSensors(true);$('#guardian').onclick=()=>modal('보호자에게 알리기',alertSummary('보호자'));$('#manager').onclick=()=>modal('관리자에게 알리기',alertSummary('관리자'));window.addEventListener('pagehide',stopAr);renderFloor();
