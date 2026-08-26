export const ko = {
  'getting-started': {
    name: 'SWAYA 오프라인 미디어 센터 설치 및 초기 설정 방법',
    description: 'Windows에 SWAYA를 설치하고, 저장 경로를 지정하고, 오프라인 라이브러리를 구축하는 단계별 가이드.',
    totalTime: 'PT3M',
    steps: [
      {
        name: '다운로드 및 앱 실행',
        text: 'Windows 10 또는 11 환경에 SWAYA 데스크톱 애플리케이션을 설치하고 실행합니다.',
      },
      {
        name: '저장 디렉토리 지정',
        text: '환경설정에서 미디어가 저장될 다운로드 경로 및 라이브러리 루트 폴더를 지정합니다.',
      },
      {
        name: '미디어 스캔 및 매칭',
        text: '오거나이저에서 비디오 파일을 스캔하여 메타데이터와 고화질 포스터를 자동으로 수집합니다.',
      },
    ],
  },
  'organizer': {
    name: '하드 드라이브 미디어 파일 자동 일괄 정리 및 이름 변경 방법',
    description: 'TMDb 및 StashDB와 연동하여 충돌 없이 미디어 파일을 안전하게 일괄 정리하는 단계.',
    totalTime: 'PT3M',
    steps: [
      {
        name: '스캔 대상 폴더 선택',
        text: 'SWAYA 오거나이저를 열고 정리할 다운로드 폴더나 외장 하드 드라이브를 선택합니다.',
      },
      {
        name: '자동 메타데이터 매칭 실행',
        text: 'TMDb, OMDb, StashDB를 통해 영화 및 TV 시리즈의 정확한 제목을 자동 조회합니다.',
      },
      {
        name: '매칭 및 오버라이드 세부 조정',
        text: '필요한 경우 검색 또는 오버라이드 창에서 제목, 에디션 태그, 시즌/에피소드 번호를 미세 조정합니다.',
      },
      {
        name: '일괄 이름 변경 또는 제자리 정리 실행',
        text: 'Plex/Jellyfin 규격 폴더로 이동하려면 Rename을, 디스크 경로를 유지하려면 Organize In-Place를 실행합니다.',
      },
    ],
  },
  'dashboard': {
    name: '대시보드에서 이어보기 및 추천 미디어 탐색 방법',
    description: '초 단위 이어보기와 큐레이션된 미디어 피드를 활용하는 가이드.',
    totalTime: 'PT2M',
    steps: [
      {
        name: '이어보기 (Continue Watching)',
        text: '대시보드 상단의 이어보기 목록에서 시청 중이던 영상을 클릭하여 중단 지점부터 즉시 감상합니다.',
      },
      {
        name: '스포트라이트 및 디스커버리 피드 탐색',
        text: '추천 히어로 배너, 최근 추가된 항목, 높은 평점의 영화를 한눈에 둘러봅니다.',
      },
    ],
  },
  'library': {
    name: 'SWAYA에서 미디어 카탈로그 탐색 및 필터링 방법',
    description: 'GPU 가속 그리드, 태그 필터, 정렬 옵션을 활용한 라이브러리 탐색 가이드.',
    totalTime: 'PT2M',
    steps: [
      {
        name: '뷰 모드 및 그리드 조절',
        text: '포스터 그리드 또는 상세 테이블 보기로 전환하고 카드 크기를 원하는 대로 조절합니다.',
      },
      {
        name: '다차원 필터 적용',
        text: '해상도(4K), 연도, 평점, 사용자 정의 태그를 조합하여 원하는 미디어만 빠르게 추출합니다.',
      },
    ],
  },
  'details': {
    name: '영화 상세 정보, 에피소드 목록 및 출연진 프로필 확인 방법',
    description: '아트워크 커스터마이징, 시즌별 에피소드 탐색, 출연작 필모그래피 확인 가이드.',
    totalTime: 'PT2M',
    steps: [
      {
        name: '미디어 상세 정보 확인',
        text: '포스터를 클릭하여 백드롭 아트워크, 줄거리, 비트레이트 및 오디오 스트림 정보를 확인합니다.',
      },
      {
        name: '출연진 필모그래피 탐색',
        text: '배우나 감독의 프로필을 클릭하여 내 라이브러리에 보유 중인 다른 작품들을 모아봅니다.',
      },
    ],
  },
  'player': {
    name: '내장 MPV 플레이어로 4K HDR 영상 재생 및 자막 설정 방법',
    description: '하드웨어 가속, 자막 싱크 조절, 오디오 트랙 전환 기능 활용 가이드.',
    totalTime: 'PT2M',
    steps: [
      {
        name: '즉시 재생',
        text: '라이브러리 항목에서 재생 버튼을 눌러 내장 MPV 하드웨어 가속 플레이어를 실행합니다.',
      },
      {
        name: '자막 및 오디오 트랙 전환',
        text: '플레이어 컨트롤 바에서 다국어 오디오 트랙을 선택하고 자막 폰트 및 싱크를 미세 조절합니다.',
      },
    ],
  },
  'search': {
    name: '단축키(Ctrl+K)로 글로벌 통합 검색을 사용하는 방법',
    description: '로컬 라이브러리와 온라인 메타데이터를 실시간 검색하는 가이드.',
    totalTime: 'PT1M',
    steps: [
      {
        name: '검색 모달 호출',
        text: '키보드에서 Ctrl+K를 누르거나 상단 검색 바를 클릭합니다.',
      },
      {
        name: '제목, 배우, 태그 검색',
        text: '키워드를 입력하여 일치하는 영화, 시리즈, 출연진을 즉시 찾습니다.',
      },
    ],
  },
  'lists': {
    name: '커스텀 테마 컬렉션 및 리스트 생성 방법',
    description: '테마별 영화 목록 작성 및 4-포스터 콜라주 커버 자동 생성 가이드.',
    totalTime: 'PT2M',
    steps: [
      {
        name: '새 리스트 생성',
        text: 'Lists 탭에서 새 리스트를 만들고 이름과 설명을 지정합니다.',
      },
      {
        name: '미디어 추가 및 콜라주 커버 확인',
        text: '영화를 추가하면 첫 4개 작품의 포스터로 자동 생성되는 콜라주 커버를 확인합니다.',
      },
    ],
  },
  'ratings': {
    name: '10점 척도 평점 및 마크다운 개인 리뷰 작성 방법',
    description: '완전 비공개 로컬 평점 및 리뷰 서랍 활용 가이드.',
    totalTime: 'PT2M',
    steps: [
      {
        name: '평점 부여 및 즐겨찾기',
        text: '상세 페이지에서 10점 만점 별점을 매기거나 하트 아이콘으로 즐겨찾기에 등록합니다.',
      },
      {
        name: '마크다운 리뷰 작성',
        text: '리뷰 드로어를 열어 서식 있는 마크다운으로 나만의 개인 메모를 저장합니다.',
      },
    ],
  },
  'history': {
    name: '시청 기록 확인 및 재생 진행률 관리 방법',
    description: '상세 시청 타임라인과 시청 완료 상태 토글 가이드.',
    totalTime: 'PT2M',
    steps: [
      {
        name: '시청 타임라인 열람',
        text: 'History 탭에서 날짜별 시청 이력과 각 파일의 최종 재생 위치를 확인합니다.',
      },
    ],
  },
  'statistics': {
    name: '라이브러리 통계 및 저장공간 분석 차트 확인 방법',
    description: '코덱 분포, 장르 차트, 시청 시간 통계 분석 가이드.',
    totalTime: 'PT2M',
    steps: [
      {
        name: '통계 대시보드 열기',
        text: 'Statistics 탭에서 총 보유 용량, 4K HDR 비율, 장르별 수집 그래프를 분석합니다.',
      },
    ],
  },
  'settings': {
    name: 'SWAYA 환경설정 및 스크레이퍼 API 키 구성 방법',
    description: '명명 템플릿, 스텔스 금고 단축키, TMDb/StashDB API 연동 가이드.',
    totalTime: 'PT3M',
    steps: [
      {
        name: '스크레이퍼 API 키 등록',
        text: 'Settings > Scrapers 탭에서 TMDb 및 StashDB API 키를 입력하여 자동 검색을 활성화합니다.',
      },
      {
        name: '명명 템플릿 커스터마이징',
        text: 'Organization 탭에서 원하는 폴더 구조와 파일명 표기 규칙을 구성합니다.',
      },
    ],
  },
  'torrent': {
    name: 'qBittorrent 대시보드 연동 및 다운로드 자동 인제스트 방법',
    description: '외부 토렌트 클라이언트 실시간 제어 및 완료 알림 연동 가이드.',
    totalTime: 'PT2M',
    steps: [
      {
        name: '토렌트 WebUI 연동',
        text: 'Settings > Torrent 탭에서 qBittorrent WebUI 포트와 인증 정보를 연결합니다.',
      },
      {
        name: '다운로드 완료 자동 인제스트',
        text: '다운로드가 끝나면 백그라운드 워처가 자동으로 파일을 감지하여 정리할 수 있도록 설정합니다.',
      },
    ],
  },
};
