# BF Manual

BEST FRIENDLY · BARRIER FREE · BE FOUND
누구나 이해하고, 누구도 배제하지 않고, 누구도 놓치지 않는 화재 대피 매뉴얼

## Run

`node server.mjs`로 실행한 뒤 `http://localhost:8000`을 여세요. 대피 결과 화면에 진입하면 현재 층·방·랜덤 위치·화재·연기·안전 경로가 JSON으로 자동 구성되어 백엔드 AI 안내 API에 전달됩니다.

환경변수 예시는 `.env.example`에 있습니다. OpenAI 키와 카카오 REST API 키는 브라우저에 노출하지 않습니다. `KAKAO_JS_KEY`만 카카오 JavaScript SDK 초기화를 위해 `/api/public-config`로 전달됩니다.

메인 화면의 카카오톡 위치 전송 버튼은 현재 층·호실, 이동 상태, 추천 비상구를 카카오톡 공유 메시지로 구성합니다. 배포 후 해당 주소를 카카오 개발자 콘솔의 JavaScript SDK 도메인과 제품 링크 웹 도메인에 등록해야 실제 공유가 동작합니다.

AR 대피 화면은 후면 카메라 영상 위에서 기기 내 객체 탐지 모델을 실행합니다. 진행 방향 중앙에 큰 장애물이 감지되면 경고 영역과 음성 안내를 표시하고, 장애물이 사라질 때까지 보행 거리 감소를 중지합니다. 객체 탐지는 보조 기능이며 실제 현장 판단과 안전요원의 지시를 우선해야 합니다.

## LangGraph evacuation agent

`POST /api/evacuation-guide`는 다음 순서의 상태 그래프를 실행합니다.

1. `collect_detection`: 앱이 수집한 화재·연기 데이터 정규화
2. `application_entry`: 현재 층·방·좌표·이동 상태 검증
3. `route_decision`: 기존 복도 그래프가 계산한 최단 안전 경로 검증
4. `rag_retrieval`: `data/facilities.json`에서 해당 비상구·안전대피소 정보 검색
5. `answer_generation`: 검색 결과와 경로를 근거로 구조화된 대피 안내 생성

외부 API 호출 없이 그래프를 시험하려면 일시적으로 `BF_AGENT_MOCK=true`를 사용하세요.
