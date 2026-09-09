import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { StateGraph, StateSchema, START, END } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';

const facilities=JSON.parse(await readFile(join(process.cwd(),'data','facilities.json'),'utf8'));
const GuideSchema=z.object({
 headline:z.string(),instructions:z.array(z.string()).min(1).max(4),reason:z.string(),
 riskLevel:z.enum(['주의','위험','매우 위험']),destination:z.string(),retrievedFacility:z.string()
});
const AgentState=new StateSchema({
 payload:z.any(),detection:z.any().optional(),application:z.any().optional(),decision:z.any().optional(),
 retrievedContext:z.array(z.any()).default([]),guide:z.any().optional(),trace:z.array(z.string()).default([])
});

function collectDetection(state){
 const hazards=state.payload.hazards||[];
 return{detection:{fireDetected:hazards.length>0,fireCount:hazards.length,hazards},trace:[...state.trace,'langchain_detection']};
}
function enterApplication(state){
 const {floor,currentRoom,currentPosition,mobility}=state.payload;
 if(!floor||!currentRoom||!currentPosition||!mobility)throw new Error('현재 위치와 사용자 상태가 필요합니다.');
 return{application:{floor,currentRoom,currentPosition,mobility},trace:[...state.trace,'application_entry']};
}
function judgeRoute(state){
 const {selectedExit,route}=state.payload;if(!selectedExit||!route)throw new Error('안전 경로 계산 결과가 필요합니다.');
 const needsRefuge=/휠체어|어려워/.test(state.application.mobility);
 return{decision:{destination:needsRefuge?`${selectedExit.name} 인근 안전대피소`:selectedExit.name,exit:selectedExit,route,safe:!route.blocked&&!route.noPath,needsRefuge},trace:[...state.trace,'langgraph_route_decision']};
}
function retrieveFacilities(state){
 const found=facilities.filter(item=>(item.floor===state.application.floor&&item.name===state.decision.exit.name)||(state.decision.needsRefuge&&item.type==='안전대피소'));
 return{retrievedContext:found,trace:[...state.trace,'rag_facility_retrieval']};
}
async function generateGuide(state){
 if(process.env.BF_AGENT_MOCK==='true')return{guide:{headline:'안전 경로가 확인되었습니다.',instructions:[`${state.decision.destination} 방향으로 이동하세요.`],reason:'화재와 연기를 피하는 경로와 시설 정보를 조회했습니다.',riskLevel:state.detection.fireDetected?'위험':'주의',destination:state.decision.destination,retrievedFacility:state.retrievedContext.map(item=>item.name).join(', ')},trace:[...state.trace,'rag_answer_generation']};
 const model=new ChatOpenAI({model:process.env.OPENAI_MODEL||'gpt-4o-mini',apiKey:process.env.OPENAI_API_KEY,temperature:0}).withStructuredOutput(GuideSchema,{name:'bf_manual_guide',strict:true});
 const context={detection:state.detection,application:state.application,routeDecision:state.decision,retrievedFacilities:state.retrievedContext};
 const guide=await model.invoke([
  {role:'system',content:'BF Manual 대피 안내 보조 AI입니다. 전달된 경로와 검색 시설만 사용하고 새 통로·좌표·출구를 만들지 마세요. 차단된 경로에서는 안내 요원을 기다리게 하세요. 짧은 한국어 존댓말을 사용하세요.'},
  {role:'user',content:JSON.stringify(context)}
 ]);
 return{guide,trace:[...state.trace,'rag_answer_generation']};
}

const workflow=new StateGraph(AgentState)
 .addNode('collect_detection',collectDetection).addNode('application_entry',enterApplication)
 .addNode('route_decision',judgeRoute).addNode('rag_retrieval',retrieveFacilities)
 .addNode('answer_generation',generateGuide).addEdge(START,'collect_detection')
 .addEdge('collect_detection','application_entry').addEdge('application_entry','route_decision')
 .addEdge('route_decision','rag_retrieval').addEdge('rag_retrieval','answer_generation')
 .addEdge('answer_generation',END).compile();

export async function invokeEvacuationAgent(payload){
 const result=await workflow.invoke({payload,trace:[],retrievedContext:[]});
 return{...result.guide,agentTrace:result.trace,decision:result.decision};
}
