# BF Manual

BEST FRIENDLY · BARRIER FREE · BE FOUND
누구나 이해하고, 누구도 배제하지 않고, 누구도 놓치지 않는 화재 대피 매뉴얼

## Run

`node server.mjs`로 실행한 뒤 `http://localhost:8000`을 여세요. 대피 결과 화면에 진입하면 현재 층·방·랜덤 위치·화재·연기·안전 경로가 JSON으로 자동 구성되어 백엔드 AI 안내 API에 전달됩니다.

환경변수 예시는 `.env.example`에 있습니다. OpenAI 키는 브라우저가 아닌 서버에서만 읽습니다. 카카오톡 API 연동은 추후 추가합니다.

## LangGraph evacuation agent

`POST /api/evacuation-guide`는 다음 순서의 상태 그래프를 실행합니다.

1. `collect_detection`: 앱이 수집한 화재·연기 데이터 정규화
2. `application_entry`: 현재 층·방·좌표·이동 상태 검증
3. `route_decision`: 기존 복도 그래프가 계산한 최단 안전 경로 검증
4. `rag_retrieval`: `data/facilities.json`에서 해당 비상구·안전대피소 정보 검색
5. `answer_generation`: 검색 결과와 경로를 근거로 구조화된 대피 안내 생성

외부 API 호출 없이 그래프를 시험하려면 일시적으로 `BF_AGENT_MOCK=true`를 사용하세요.
