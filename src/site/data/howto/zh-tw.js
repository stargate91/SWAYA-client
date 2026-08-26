export const zhTw = {
  'getting-started': {
    name: '如何安裝與初始化 SWAYA 離線個人影音中心',
    description: 'Windows 與 Linux 系統安裝步驟、儲存目錄指定與建立離線媒體庫教學。',
    totalTime: 'PT3M',
    steps: [
      {
        name: '下載並啟動軟體',
        text: '在 Windows 或 Linux 系統上下載並安裝 SWAYA 桌面應用程式。',
      },
      {
        name: '指定儲存目錄',
        text: '在設定中指定下載資料夾路徑與媒體庫根目錄路徑。',
      },
      {
        name: '掃描與比對媒體檔案',
        text: '開啟整理器 (Organizer) 掃描影片檔案，自動獲取元資料與高畫質海報封面。',
      },
    ],
  },
  'organizer': {
    name: '如何自動批次重新命名與整理硬碟影音檔案',
    description: '自動比對 TMDb 與 StashDB，安全整理硬碟檔案並避免衝突重複。',
    totalTime: 'PT3M',
    steps: [
      {
        name: '選擇來源資料夾',
        text: '開啟 SWAYA 整理器，選擇存放未整理下載內容的資料夾。',
      },
      {
        name: '執行自動元資料比對',
        text: '掃描 TMDb、OMDb 與 StashDB，自動識別電影與電視影集標題。',
      },
      {
        name: '手動微調與覆寫',
        text: '如有需要，可在比對微調面板中修改標題、版本標籤或季數集數。',
      },
      {
        name: '執行重新命名或就地整理',
        text: '選擇 Rename 重新命名並依照標準歸檔，或選擇 Organize In-Place 保持實體檔案路徑不變。',
      },
    ],
  },
  'dashboard': {
    name: '如何利用控制面板繼續觀看與探索影音內容',
    description: '秒級斷點續播與瀏覽推薦精選內容的操作指南。',
    totalTime: 'PT2M',
    steps: [
      {
        name: '繼續觀看',
        text: '點擊「繼續觀看」列中的作品，立即從上次中斷處接續播放。',
      },
      {
        name: '探索焦點橫幅與資訊流',
        text: '瀏覽焦點推薦作品、近期整理入庫的影片與高評分電影。',
      },
    ],
  },
  'library': {
    name: '如何在 SWAYA 中檢索與篩選媒體目錄',
    description: '利用 GPU 加速海報網格與多維度篩選器快速尋找影音收藏。',
    totalTime: 'PT2M',
    steps: [
      {
        name: '切換檢視模式與卡片大小',
        text: '在海報網格與清單表格間切換，並依喜好自訂卡片大小。',
      },
      {
        name: '套用多維度篩選條件',
        text: '結合 4K 解析度、發行年份、評分與自訂標籤快速篩選目標影片。',
      },
    ],
  },
  'details': {
    name: '如何檢視影音詳情、分季集數與演職員年表',
    description: '瀏覽高清劇照、影集分季導覽與演職員代表作品。',
    totalTime: 'PT2M',
    steps: [
      {
        name: '開啟媒體詳細頁面',
        text: '點擊海報檢視 4K 背景劇照、劇情大綱與視訊位元率等技術參數。',
      },
      {
        name: '查看演職員作品年表',
        text: '點擊演員肖像，一鍵列出自己媒體庫中收藏的同一演員其他作品。',
      },
    ],
  },
  'player': {
    name: '如何使用 MPV 播放 4K HDR 視訊並調整字幕設定',
    description: '充分發揮 GPU 硬體加速、切換音軌與同步微調字幕。',
    totalTime: 'PT2M',
    steps: [
      {
        name: '立即開始播放',
        text: '點擊影片上的播放按鈕，即刻啟動內建 MPV 硬體加速播放器。',
      },
      {
        name: '切換音軌與字幕',
        text: '在控制列切換多語系音訊，並依需求微調字幕同步延遲與字型樣式。',
      },
    ],
  },
  'search': {
    name: '如何使用全域快捷鍵 (Ctrl+K) 進行跨來源搜尋',
    description: '同時檢索本機媒體庫與線上資料庫的操作指南。',
    totalTime: 'PT1M',
    steps: [
      {
        name: '喚出搜尋面板',
        text: '按下鍵盤 Ctrl+K 或點擊頂端搜尋列。',
      },
      {
        name: '搜尋標題與演職員',
        text: '輸入關鍵字即時尋找相符的電影、影集、單集與演員。',
      },
    ],
  },
  'lists': {
    name: '如何建立主題收藏清單與自訂合輯',
    description: '建立主題清單並自動生成 4 海報拼貼封面。',
    totalTime: 'PT2M',
    steps: [
      {
        name: '建立新清單',
        text: '前往「清單」分頁，建立新清單並填寫名稱與描述。',
      },
      {
        name: '加入作品與確認拼貼封面',
        text: '加入影片後，系統會自動選取前 4 部作品的海報生成動態拼貼封面。',
      },
    ],
  },
  'ratings': {
    name: '如何進行 10 分制評分與撰寫 Markdown 私密影評',
    description: '儲存 100% 私密本機評分與富文字備忘錄。',
    totalTime: 'PT2M',
    steps: [
      {
        name: '給予評分與加到最愛',
        text: '在詳細頁面給予星級評分，或點擊愛心圖示加入最愛。',
      },
      {
        name: '撰寫 Markdown 影評',
        text: '打開影評側邊面板，以 Markdown 語法記錄個人觀影筆記。',
      },
    ],
  },
  'history': {
    name: '如何查看與管理觀看歷史紀錄',
    description: '瀏覽觀看時間軸與切換已觀看狀態。',
    totalTime: 'PT2M',
    steps: [
      {
        name: '查看觀看時間軸',
        text: '在「歷史」分頁按日期檢視完整觀影紀錄與最後播放進度。',
      },
    ],
  },
  'statistics': {
    name: '如何分析媒體庫 DNA 與儲存空間分佈',
    description: '掌握編碼格式分佈、類型圓餅圖與累計觀影時數。',
    totalTime: 'PT2M',
    steps: [
      {
        name: '開啟統計面板',
        text: '在「統計」分頁分析硬碟佔用、4K HDR 比例與類型偏好圖表。',
      },
    ],
  },
  'settings': {
    name: '如何配置 SWAYA 偏好設定與 API 金鑰',
    description: '自訂命名範本、防窺快捷鍵與 TMDb/StashDB API 連線設定。',
    totalTime: 'PT3M',
    steps: [
      {
        name: '輸入 API 金鑰',
        text: '在 設定 > Scrapers 輸入 TMDb 與 StashDB API 金鑰以啟用自動搜尋。',
      },
      {
        name: '自訂檔案命名規則',
        text: '在 Organization 分頁配置符合個人偏好的資料夾與檔名範本。',
      },
    ],
  },
  'torrent': {
    name: '如何連動 qBittorrent 實現下載完成自動入庫',
    description: 'Torrent 用戶端即時監控與自動化入庫設定。',
    totalTime: 'PT2M',
    steps: [
      {
        name: '連接 WebUI 通訊埠',
        text: '在 設定 > Torrent 輸入 qBittorrent WebUI 連線資訊。',
      },
      {
        name: '啟用自動入庫整理',
        text: '開啟背景監視器，在下載完成時自動觸發整理器歸檔。',
      },
    ],
  },
};
