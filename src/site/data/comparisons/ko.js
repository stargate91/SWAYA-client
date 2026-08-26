export const ko = {
  filebot: {
    title: 'SWAYA vs FileBot: 최신 데스크톱 미디어 워크스테이션 및 일괄 파일 정리기',
    metaTitle: 'Windows 및 Linux용 최고의 FileBot 대안 - SWAYA 일괄 파일 정리 & MPV 플레이어',
    metaDescription: 'FileBot의 최신 대안을 찾고 계신가요? SWAYA는 TMDb와 StashDB로 파일을 정리하고, 오프라인 라이브러리와 4K MPV 플레이어를 하나로 결합합니다.',
    heroTagline: '단순 파일 이름 변경을 넘어, 컬렉션의 완벽한 큐레이션과 4K 재생까지.',
    heroSubtitle: 'FileBot은 파일 이름 변경에 탁월하지만, SWAYA는 로컬 미디어를 한 단계 더 진화시킵니다. 하드 드라이브 정리, 아름다운 오프라인 카탈로그, 내장 4K HDR MPV 플레이어를 하나의 가벼운 Windows 앱으로 통합했습니다.',
    competitorPricing: '연간 $6 또는 평생 라이선스 $48',
    swayaPricing: '출시 기념 평생 라이선스 €39 (정가 €79)',
    whenToChooseCompetitor: [
      '헤드리스 Linux 서버나 NAS 스크립트용 경량 CLI 도구만 필요한 경우.',
      '복잡한 Groovy 정규식이나 사용자 정의 자동화 스크립트를 직접 작성하고자 하는 경우.',
      '이미 다른 미디어 서버(Plex, Kodi)를 사용 중이며 내장 비디오 플레이어가 필요 없는 경우.',
    ],
    whenToChooseSwaya: [
      '디스크 파일 정리와 즉각적인 라이브러리 탐색 및 재생을 하나의 앱에서 해결하고 싶은 경우.',
      '일반 영화/드라마/애니메이션(TMDb)과 성인 미디어(StashDB, FansDB, ThePornDB)를 함께 관리하고 싶은 경우.',
      '트랜스코딩 없이 하드웨어 가속 4K HDR을 재생하는 고성능 MPV 플레이어가 필요한 경우.',
      '안전한 드라이 런(사전 확인)과 파일 충돌 방지 기능을 갖춘 모던 Windows UI를 선호하는 경우.',
    ],
    matrix: [
      { feature: '디스크 실제 파일 이름 변경 및 폴더 정리', swayaNote: 'TMDb, ThePornDB, StashDB, FansDB', competitorNote: 'TheMovieDB, TVmaze, AniDB' },
      { feature: '드라이 런 미리보기 및 파일 충돌 방지', swayaNote: '스마트 충돌 감지 및 안전 교체 옵션', competitorNote: '단순 미리보기 리스트' },
      { feature: '내장 4K/HDR MPV 비디오 플레이어', swayaNote: 'GPU 하드웨어 가속, 자막 & 오디오 즉시 전환', competitorNote: '플레이어 기능 없음' },
      { feature: '시각적 오프라인 라이브러리 & 상세 페이지', swayaNote: '포스터, 배경 아트워크, 출연진, 장르, 평점', competitorNote: '라이브러리 UI 없음' },
      { feature: '성인 미디어 & StashDB 스크레이퍼 지원', swayaNote: 'StashDB/FansDB 완벽 연동 및 출연진 인덱스', competitorNote: '일반 미디어 DB만 지원' },
      { feature: 'PIN 보호 듀얼 모드 (SFW / NSFW)', swayaNote: '완벽한 DB 격리 및 단축키 스텔스 금고', competitorNote: '미지원' },
      { feature: '토렌트 클라이언트 연동 (qBittorrent)', swayaNote: '완료 시 자동 인제스트 및 시딩 유지 정리', competitorNote: '커스텀 CLI 스크립트 필요' },
      { feature: '100% 오프라인 & 서버 불필요', swayaNote: '백그라운드 상주 데몬 0개, 개방 포트 0개', competitorNote: '로컬 Java 앱' },
      { feature: '모던 Windows UI (Java 불필요)', swayaNote: '네이티브 고성능 데스크톱 앱', competitorNote: 'Java / Swing 인터페이스' },
      { feature: '한 번 구매로 평생 이용하는 라이선스', swayaNote: '출시 기념 €39 / 정가 €79 영구 소장', competitorNote: '$48 영구 또는 연간 $6' },
    ],
    deepDives: [
      {
        title: '파일 이름 변경을 넘어선 완전한 미디어 경험',
        description: 'FileBot은 파일 이름을 바꾸면 역할이 끝납니다. SWAYA는 정리된 파일을 즉시 포스터, 출연진 정보, 에피소드 가이드가 포함된 풍성한 라이브러리로 승화시킵니다.',
      },
      {
        title: '내장 4K HDR MPV 비디오 플레이어',
        description: '외부 플레이어를 따로 켤 필요가 없습니다. 클릭 한 번으로 고화질 MKV, HDR 영상, 다국어 자막을 GPU 가속으로 지연 없이 즉시 감상할 수 있습니다.',
      },
      {
        title: '일반 미디어와 성인 미디어의 안전한 공존',
        description: '업계 최초 듀얼 모드 아키텍처로 TMDb 기반 영화와 StashDB 기반 영상을 완벽히 격리하여 단축키로 안전하게 보호합니다.',
      },
    ],
    faqs: [
      {
        q: '영화나 애니메이션 일괄 정리에 SWAYA를 FileBot 대신 사용할 수 있나요?',
        a: '네. 다운로드 폴더를 스캔하여 TMDb와 매칭하고, 사용자 지정 명명 규칙에 따라 실제 하드 드라이브 파일을 자동으로 깔끔하게 정리합니다.',
      },
      {
        q: '정리 중에도 토렌트 시딩(업로드)을 유지할 수 있나요?',
        a: '네. "In-Place(제자리 정리)" 옵션을 사용하면 파일 경로를 변경하지 않고 메타데이터와 포스터만 라이브러리에 등록하여 시딩을 완벽히 유지할 수 있습니다.',
      },
      {
        q: 'SWAYA 실행에 Java 설치가 필요한가요?',
        a: '아니요. SWAYA는 독립형 네이티브 Windows 앱으로 Java나 추가 런타임 설치가 일절 필요하지 않습니다.',
      },
    ],
  },
  plex: {
    title: 'SWAYA vs Plex: 서버 없는 100% 오프라인 미디어 워크스테이션',
    metaTitle: 'Windows 및 Linux용 Plex 대안 (서버 불필요, 100% 오프라인) - SWAYA',
    metaDescription: '복잡한 서버 설정 없이 사용할 개인용 Plex 대안을 찾고 계신가요? SWAYA는 하드 드라이브를 정리하고 계정 없이 4K HDR을 MPV로 즉시 재생합니다.',
    heroTagline: '서버, 클라우드 로그인, 텔레메트리에 얽매이지 않는 온전한 나만의 컬렉션.',
    heroSubtitle: 'Plex는 네트워크 스트리밍에 최적화되어 있지만 상시 서버 구동, 클라우드 계정, 유료 구독이 필요합니다. SWAYA는 설정 제로의 100% 오프라인 데스크톱 경험을 선사합니다.',
    competitorPricing: '무료 / 월 $4.99 / 평생 $119 (Plex Pass)',
    swayaPricing: '출시 기념 평생 라이선스 €39 (정가 €79)',
    whenToChooseCompetitor: [
      '스마트 TV, 스마트폰, 외부 가족 기기로 원격 스트리밍을 해야 하는 경우.',
      '여러 사용자를 위한 실시간 트랜스코딩 전용 NAS나 홈 서버를 운영 중인 경우.',
      'iOS, Android, Apple TV 간의 원격 시청 진행률 동기화가 필요한 경우.',
    ],
    whenToChooseSwaya: [
      'Windows or Linux PC, 노트북, 다이렉트 모니터에서 미디어를 감상하는 경우.',
      '100% 프라이버시를 원하는 경우 (계정 제로, 외부 텔레메트리 제로, 포트 개방 제로).',
      '하드 드라이브의 실제 물리 파일명을 깔끔하게 일괄 정리하고 싶은 경우.',
      '서버 유지보수나 트랜스코딩 버벅임에서 벗어나고 싶은 경우.',
    ],
    matrix: [
      { feature: '100% 오프라인 & 서버 설정 불필요', swayaNote: '즉시 실행되는 데스크톱 앱, 백그라운드 데몬 없음', competitorNote: 'Plex Media Server 상시 실행 필수' },
      { feature: '하드 드라이브 실제 물리 파일 정리', swayaNote: '실제 파일명과 폴더를 직접 정리', competitorNote: '가상 DB에만 반영 (실제 파일 미변경)' },
      { feature: '클라우드 로그인 불필요 / 프라이버시', swayaNote: '계정 없음, 로컬 SQLite 데이터베이스', competitorNote: 'Plex 온라인 계정 및 텔레메트리 필수' },
      { feature: '네이티브 MPV 플레이어 (트랜스코딩 제로)', swayaNote: '모든 코덱을 원본 화질 4K HDR로 직통 재생', competitorNote: '서버 트랜스코딩으로 인한 화질 저하 빈번' },
      { feature: '성인 미디어 (StashDB) & 듀얼 모드', swayaNote: '전용 성인 모드 & StashDB/FansDB 완벽 지원', competitorNote: '불안정한 비공식 플러그인 필요' },
      { feature: '대화형 드라이 런 파일 정리기', swayaNote: '이동 전 파일명 수정 및 충돌 사전 방지', competitorNote: '수동적 폴더 감시만 지원' },
      { feature: '토렌트 클라이언트 연동 (시딩 유지)', swayaNote: 'qBittorrent / Transmission 직접 연동', competitorNote: '기본 미지원' },
      { feature: '월 구독료 없는 영구 소장 라이선스', swayaNote: '출시 기념 €39 단 1회 결제', competitorNote: 'Plex Pass 평생 $119 또는 월 $4.99' },
      { feature: '프레임 단위 북마크 캡처', swayaNote: 'Enter 키 한 번으로 고화질 스크린샷 저장', competitorNote: '미지원' },
      { feature: '앱 종료 시 시스템 리소스 점유율 제로', swayaNote: '창을 닫으면 백그라운드 리소스 점유 0%', competitorNote: '백그라운드에서 상시 서버 프로세스 구동' },
    ],
    deepDives: [
      {
        title: '서버 백그라운드 부하도, 포트 개방도 없습니다',
        description: 'Plex는 상시 서버 구동, 포트포워딩 설정, 클라우드 서버 장애에 영향을 받습니다. SWAYA는 1초 만에 실행되는 가벼운 데스크톱 소프트웨어로 허가 없는 외부 통신을 하지 않습니다.',
      },
      {
        title: '가상 카탈로그가 아닌 실제 하드 드라이브를 정돈',
        description: 'Plex는 어지러운 폴더 위에 가상의 메타데이터만 덮어씌웁니다. SWAYA는 드라이브의 실제 파일과 폴더를 표준 구조로 깔끔하게 정리합니다.',
      },
      {
        title: '트랜스코딩 버벅임 없는 완벽한 원본 재생',
        description: '내장 MPV 엔진은 CPU 트랜스코딩 없이 모든 코덱(HEVC, AV1, 10-bit)과 다국어 자막을 원본 화질 그대로 재생합니다.',
      },
    ],
    faqs: [
      {
        q: 'Plex 대신 SWAYA를 쓰면 어떤 점이 가장 좋나요?',
        a: '복잡한 서버 설정이 없고, 계정 생성이 필요 없으며, 트랜스코딩 없이 4K 영상을 즉시 감상하고 하드 드라이브 파일까지 정돈할 수 있습니다.',
      },
      {
        q: '외장 하드 드라이브에서도 Plex보다 쓰기 편한가요?',
        a: '네. 외장 하드를 분리해도 메타데이터와 시청 기록이 그대로 로컬에 저장되어 언제든 컬렉션을 탐색할 수 있습니다.',
      },
    ],
  },
  tinymediamanager: {
    title: 'SWAYA vs tinyMediaManager (tmm): 현대적인 미디어 오거나이저 & 4K 플레이어',
    metaTitle: 'Windows 및 Linux용 tinyMediaManager(tmm) 대안 - SWAYA',
    metaDescription: 'tinyMediaManager의 최신 대안을 찾으시나요? SWAYA는 Java 없이 동작하는 모던 UI, 빠른 파일 정리, 4K MPV 플레이어를 제공합니다.',
    heroTagline: 'Java 기반의 무거운 도구에서 벗어나, 현대적인 GPU 가속 워크스테이션으로.',
    heroSubtitle: 'tinyMediaManager는 훌륭한 NFO 생성기지만 인터페이스가 복잡하고 비디오 플레이어가 없습니다. SWAYA는 직관적인 UI, 파일 정리, 4K HDR 재생을 하나로 통합했습니다.',
    competitorPricing: '연간 €10 (PRO 버전)',
    swayaPricing: '출시 기념 평생 라이선스 €39 (정가 €79)',
    whenToChooseCompetitor: [
      'Kodi나 미디어 서버를 위한 복잡한 XML/NFO 파일 생성이 주 목적인 경우.',
      'Java 기반 멀티플랫폼(Linux, macOS) 환경에서 동일한 도구를 써야 하는 경우.',
    ],
    whenToChooseSwaya: [
      'Windows 환경에서 반응속도가 빠른 모던 인터페이스를 원하는 경우.',
      '파일 정리 후 별도 외부 프로그램 없이 바로 4K HDR 영상을 감상하고 싶은 경우.',
      '성인 미디어와 일반 영화를 하나의 도구에서 안전하게 분리 관리하고 싶은 경우.',
    ],
    matrix: [
      { feature: '현대적인 UI 디자인 & GPU 가속', swayaNote: '부드러운 반응형 데스크톱 인터페이스', competitorNote: '구형 Java Swing UI' },
      { feature: '내장 비디오 플레이어', swayaNote: 'MPV 4K HDR 하드웨어 가속 플레이어 내장', competitorNote: '플레이어 없음 (외부 연결 필요)' },
      { feature: '성인 미디어 (StashDB, FansDB)', swayaNote: '전용 NSFW 모드 & 글로벌 성인 DB 지원', competitorNote: '기본 미지원' },
      { feature: '라이선스 정책', swayaNote: '€39 1회 구매 평생 소장', competitorNote: '연간 €10 구독제' },
    ],
    deepDives: [
      {
        title: 'NFO 생성기에서 완전한 미디어 센터로',
        description: 'tinyMediaManager는 파일 메타데이터를 작성하는 보조 도구에 가깝습니다. SWAYA는 미디어 정리부터 탐색, 재생, 리뷰까지 전 과정을 아우르는 독립형 완성형 솔루션입니다.',
      },
    ],
    faqs: [
      {
        q: 'tmm처럼 영화 폴더를 Plex 규격으로 정리할 수 있나요?',
        a: '네. SWAYA는 Plex 및 Jellyfin 표준 템플릿에 맞춘 일괄 파일 정리 기능을 완벽하게 지원합니다.',
      },
    ],
  },
  stash: {
    title: 'SWAYA vs StashApp: 프라이빗 성인 미디어 정리 & 데스크톱 4K 플레이어',
    metaTitle: 'Windows 및 Linux용 StashApp 대안 - SWAYA 오프라인 미디어 센터',
    metaDescription: '로컬 서버 설정 없는 StashApp 대안. SWAYA는 StashDB 연동, 출연진 프로필, 4K MPV 재생, 스텔스 금고를 제공합니다.',
    heroTagline: '로컬 웹 서버 구축 없이, 단 하나의 독립 데스크톱 앱으로.',
    heroSubtitle: 'StashApp은 뛰어난 오픈소스지만 로컬 백엔드 서버를 띄워야 합니다. SWAYA는 서버 없는 순수 데스크톱 앱으로 완벽한 스텔스 프라이버시를 보장합니다.',
    competitorPricing: '무료 (오픈소스)',
    swayaPricing: '출시 기념 평생 라이선스 €39 (정가 €79)',
    whenToChooseCompetitor: [
      '헤드리스 Linux 홈 서버에 설치하고 브라우저로 접속해 공유하고 싶은 경우.',
      '오픈소스 프로젝트를 직접 빌드하고 커스터마이징하고 싶은 경우.',
    ],
    whenToChooseSwaya: [
      '로컬 웹 서버 구동 없이 1초 만에 실행되는 가벼운 Windows 전용 앱을 선호하는 경우.',
      '단축키로 민감한 컬렉션을 즉시 가리는 강력한 스텔스 금고가 필요한 경우.',
      '일반 영화(TMDb)와 성인 미디어(StashDB)를 한 앱에서 듀얼 모드로 관리하고 싶은 경우.',
    ],
    matrix: [
      { feature: '아키텍처', swayaNote: '100% 독립형 데스크톱 앱 (서버 0개)', competitorNote: '로컬 웹 서버 + 브라우저 접속 방식' },
      { feature: '일반 미디어 & 성인 미디어 듀얼 모드', swayaNote: 'TMDb와 StashDB 완벽 공존', competitorNote: '성인 미디어 전용' },
      { feature: '스텔스 프라이버시 금고', swayaNote: '단축키(Ctrl+Alt+H/Esc) 즉시 은폐', competitorNote: '비밀번호 잠금만 지원' },
      { feature: '내장 고성능 플레이어', swayaNote: 'GPU 하드웨어 가속 MPV 플레이어', competitorNote: '브라우저 HTML5 비디오 플레이어' },
    ],
    deepDives: [
      {
        title: '서버 설정 없는 완벽한 데스크톱 프라이버시',
        description: 'SWAYA는 브라우저를 켤 필요도, 백그라운드 서버를 띄울 필요도 없습니다. 안전하고 독립된 데스크톱 환경에서 모든 컬렉션을 관리하세요.',
      },
    ],
    faqs: [
      {
        q: 'StashDB API 키를 SWAYA에서 사용할 수 있나요?',
        a: '네. 환경설정의 스크레이퍼 탭에서 StashDB, FansDB, ThePornDB API 키를 입력하면 완벽하게 연동됩니다.',
      },
    ],
  },
  jellyfin: {
    title: 'SWAYA vs Jellyfin: 100% 오프라인 데스크톱 미디어 워크스테이션',
    metaTitle: 'Windows 및 Linux용 Jellyfin 대안 (오프라인 전용) - SWAYA',
    metaDescription: '서버 설정 없는 Jellyfin 대안. 하드 드라이브 파일 정리, 오프라인 카탈로그, 4K HDR MPV 플레이어를 경험하세요.',
    heroTagline: '스트리밍 서버 대신, 로컬 PC를 위한 최상의 오프라인 미디어 경험.',
    heroSubtitle: 'Jellyfin은 무료 오픈소스 스트리밍 서버로 훌륭하지만, 로컬 PC에서 영상을 볼 때는 불필요한 서버 구성이 따릅니다. SWAYA는 오프라인 환경에 최적화된 도구입니다.',
    competitorPricing: '무료 (오픈소스)',
    swayaPricing: '출시 기념 평생 라이선스 €39 (정가 €79)',
    whenToChooseCompetitor: [
      '스마트 TV, 태블릿 등 여러 기기로 네트워크 스트리밍을 해야 하는 경우.',
      '가족 구성원들과 미디어 라이브러리를 공유해야 하는 경우.',
    ],
    whenToChooseSwaya: [
      '내 PC와 외장 하드 드라이브에서 직접 최고 화질로 감상하는 경우.',
      '실제 디스크 파일 이름을 깔끔하게 정리하고 싶은 경우.',
      '서버 유지보수나 네트워크 설정 없이 간편하게 쓰고 싶은 경우.',
    ],
    matrix: [
      { feature: '작동 환경', swayaNote: '독립형 오프라인 데스크톱 앱', competitorNote: '클라이언트-서버 스트리밍 아키텍처' },
      { feature: '물리 파일 정리', swayaNote: 'TMDb 기반 자동 일괄 이름 변경', competitorNote: '파일 변경 기능 없음' },
      { feature: '재생 성능', swayaNote: 'MPV 하드웨어 가속 원본 직통 재생', competitorNote: '네트워크 상태 및 트랜스코딩 의존' },
    ],
    deepDives: [
      {
        title: '로컬 PC 사용자를 위한 최적화',
        description: 'PC 모니터에서 직접 영상을 감상할 때는 네트워크 스트리밍 서버보다 로컬 하드웨어에 최적화된 독립 앱이 훨씬 빠르고 쾌적합니다.',
      },
    ],
    faqs: [
      {
        q: 'SWAYA로 정리한 폴더를 나중에 Jellyfin에서 쓸 수 있나요?',
        a: '네. SWAYA는 Jellyfin 및 Plex 표준 폴더 구조로 파일을 정리하므로 완벽하게 호환됩니다.',
      },
    ],
  },
  kodi: {
    title: 'SWAYA vs Kodi: 모던 Windows 미디어 센터 & 파일 오거나이저',
    metaTitle: 'Windows 및 Linux용 Kodi 대안 - SWAYA 미디어 센터',
    metaDescription: '거실 TV 인터페이스 대신 모던 데스크톱 워크스테이션을 찾으시나요? SWAYA는 마우스와 키보드에 최적화된 미디어 관리자입니다.',
    heroTagline: '거실 리모컨 UI를 넘어, 마우스와 키보드에 최적화된 모던 워크스테이션.',
    heroSubtitle: 'Kodi는 TV 화면을 위한 10-foot 인터페이스로 유명하지만, PC 데스크톱에서는 조작이 번거롭습니다. SWAYA는 마우스와 키보드에 완벽히 최적화된 세련된 경험을 제공합니다.',
    competitorPricing: '무료 (오픈소스)',
    swayaPricing: '출시 기념 평생 라이선스 €39 (정가 €79)',
    whenToChooseCompetitor: [
      '라즈베리 파이나 HTPC를 TV에 연결하고 리모컨으로 조작하는 경우.',
      '수많은 비공식 애드온과 스킨을 커스터마이징하고 싶은 경우.',
    ],
    whenToChooseSwaya: [
      'PC 모니터에서 마우스와 키보드로 쾌적하게 미디어를 관리하고 시청하는 경우.',
      '파일 일괄 정리와 고품질 4K MPV 재생을 한 번에 끝내고 싶은 경우.',
    ],
    matrix: [
      { feature: 'UI 타겟', swayaNote: '마우스 & 키보드 최적화 데스크톱 UI', competitorNote: 'TV 리모컨용 10-foot 인터페이스' },
      { feature: '물리 파일 정리', swayaNote: '스마트 배치 파일 리네이머 내장', competitorNote: '파일 변경 기능 없음' },
      { feature: '설정 난이도', swayaNote: '설정 없이 1초 만에 즉시 실행', competitorNote: '복잡한 애드온 및 스크레이퍼 설정' },
    ],
    deepDives: [
      {
        title: '데스크톱 파워 유저를 위한 설계',
        description: '리모컨 위주의 복잡한 메뉴 대신, 빠른 스크롤, 즉각적인 필터링, 드래그 앤 드롭을 지원하는 모던 인터페이스를 경험하세요.',
      },
    ],
    faqs: [
      {
        q: 'Kodi보다 SWAYA가 쓰기 편한가요?',
        a: '네. 일반 PC 환경에서는 마우스 클릭과 단축키에 최적화된 SWAYA가 훨씬 직관적이고 빠릅니다.',
      },
    ],
  },
};
