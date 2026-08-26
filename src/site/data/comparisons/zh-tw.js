export const zhTw = {
  filebot: {
    title: 'SWAYA vs FileBot: 現代化桌面影音工作站 & 批次檔案命名專家',
    metaTitle: 'Windows 最佳 FileBot 替代方案 - SWAYA 批次命名與 MPV 播放器',
    metaDescription: '尋找現代化的 FileBot 替代品？SWAYA 透過 TMDb/StashDB 為檔案重新命名，整合離線媒體庫與 4K MPV 播放器。',
    heroTagline: '超越單純的檔案重新命名：全面整理並以 4K 享受你的珍貴收藏。',
    heroSubtitle: 'FileBot 在重新命名方面表現出色，但 SWAYA 將本機影音管理推向全新境界。集硬碟目錄整理、精美視覺化媒體庫與 4K HDR MPV 播放器於單一 Windows 軟體中。',
    competitorPricing: '每年 $6 或 $48 終身買斷授權',
    swayaPricing: '首發早鳥特惠 €39 終身買斷（原價 €79）',
    whenToChooseCompetitor: [
      '僅需要用於 Linux 或 NAS 自動化腳本的輕量命令列 (CLI) 工具。',
      '需要撰寫高度客製化的 Groovy 命名規則與進階自動化掛鉤。',
      '已在使用其他媒體伺服器（如 Plex 或 Kodi），不需要內建播放器。',
    ],
    whenToChooseSwaya: [
      '希望在單一軟體中同時完成硬碟整理命名、海報牆瀏覽與高畫質播放。',
      '需要同時管理一般影劇（TMDb）與成人影片（StashDB、FansDB）。',
      '需要免轉碼、GPU 硬體直出的 4K HDR MPV 頂級播放體驗。',
      '偏好現代化 Windows 介面，並具備安全的演練預覽 (Dry-Run) 與衝突防護機制。',
    ],
    matrix: [
      { feature: '實體硬碟檔案批次重新命名與歸檔', swayaNote: 'TMDb, ThePornDB, StashDB, FansDB', competitorNote: 'TheMovieDB, TVmaze, AniDB' },
      { feature: '演練預覽 (Dry-Run) 與衝突防護', swayaNote: '智慧衝突偵測與安全覆蓋提示', competitorNote: '簡易清單預覽' },
      { feature: '內建 4K/HDR MPV 影音播放器', swayaNote: 'GPU 硬體解碼直出，秒切字幕與音軌', competitorNote: '無內建播放器' },
      { feature: '視覺化離線媒體庫與詳細資訊頁', swayaNote: '4K 海報、背景劇照、演職員、類型與評分', competitorNote: '無媒體庫介面' },
      { feature: '成人影音與 StashDB 深度支援', swayaNote: '原生 StashDB/FansDB 整合與演職員作品索引', competitorNote: '僅支援一般媒體資料庫' },
      { feature: '雙重模式與 PIN 碼保護 (SFW / NSFW)', swayaNote: '資料庫徹底隔離與一鍵隱形保險庫', competitorNote: '不支援' },
      { feature: 'Torrent 用戶端整合 (qBittorrent)', swayaNote: '下載完成自動入庫並維持持續做種', competitorNote: '僅能透過外部 CLI 腳本' },
      { feature: '100% 離線運作 & 無需後端伺服器', swayaNote: '零常駐背景守護行程，零對外開放連接埠', competitorNote: '本機 Java 應用程式' },
      { feature: '現代化 Windows UI（無需 Java 環境）', swayaNote: '極速原生桌面應用程式', competitorNote: 'Java / Swing 傳統介面' },
      { feature: '一次性買斷永久使用（無訂閱費）', swayaNote: '早鳥特惠 €39 / 標準 €79 終身使用', competitorNote: '$48 買斷或每年 $6 訂閱' },
    ],
    deepDives: [
      {
        title: '超越重新命名：完整的頂級影音享受',
        description: 'FileBot 的使命在檔案重新命名後便告結束。SWAYA 則將整理好的檔案即刻轉化為擁有高畫質海報、演職員檔案與劇情介紹的奢華媒體庫。',
      },
      {
        title: '內建 4K HDR MPV 旗艦播放器',
        description: '無需另外尋找第三方播放器。支援超高碼率 MKV、HDR10、杜比視界色調對應及多語系字幕，全由 GPU 硬體加速極速直出。',
      },
      {
        title: '一般影視與成人內容的安全共存',
        description: '首創雙重模式架構，將一般影視與成人收藏徹底隔離，透過全域快捷鍵與本機密碼提供嚴密的隱私防護。',
      },
    ],
    faqs: [
      {
        q: 'SWAYA 可以完全取代 FileBot 進行電影與動畫命名嗎？',
        a: '可以。SWAYA 支援掃描下載目錄、精準比對 TMDb 資訊，並依據自訂規則自動將實體檔案重新命名與分類歸檔。',
      },
      {
        q: '在整理檔案時能否同時維持 Torrent 正常做種？',
        a: '可以。使用「In-Place（就地整理）」模式即可只建立資料庫索引而不更動實體檔案路徑，做種完全不受影響。',
      },
      {
        q: '執行 SWAYA 需要另外安裝 Java 嗎？',
        a: '不需要。SWAYA 是獨立編譯的 Windows 桌面應用程式，無需 Java 或其他額外執行階段環境。',
      },
    ],
  },
  plex: {
    title: 'SWAYA vs Plex: 零伺服器負擔的 100% 離線影音工作站',
    metaTitle: 'Windows 最佳 Plex 替代方案（無伺服器，100% 離線） - SWAYA',
    metaDescription: '尋找無需架設伺服器的私密 Plex 替代品？SWAYA 整理硬碟檔案並以 MPV 播放 4K HDR，無雲端帳號，零外部依賴。',
    heroTagline: '擺脫伺服器維護、雲端登入與隱私追蹤的極致個人收藏體驗。',
    heroSubtitle: 'Plex 主打區域網路串流，但需要常駐伺服器服務、雲端帳號與月費訂閱。SWAYA 則提供免設定、100% 離線的純粹桌面極速體驗。',
    competitorPricing: '免費版 / 每月 $4.99 / 終身 $119 (Plex Pass)',
    swayaPricing: '首發早鳥特惠 €39 終身買斷（原價 €79）',
    whenToChooseCompetitor: [
      '需要將影片串流至智慧電視、手機或在戶外遠端分享給家人。',
      '擁有專屬 NAS 或具備多使用者即時轉碼能力的家庭伺服器。',
      '需要在 iOS、Android 與 Apple TV 間同步觀看進度。',
    ],
    whenToChooseSwaya: [
      '主要在 Windows 電腦、筆電或直連螢幕上觀賞高畫質影片。',
      '注重絕對隱私（無雲端帳號、無外部遙測、無對外開放連接埠）。',
      '希望真正將硬碟上的實體檔案與資料夾整理得井井有條。',
      '厭倦了伺服器維護、轉碼卡頓與網路延遲問題。',
    ],
    matrix: [
      { feature: '100% 離線運作 & 零伺服器設定', swayaNote: '即開即用的極速桌面軟體，無常駐背景行程', competitorNote: '必須常駐執行 Plex Media Server' },
      { feature: '硬碟實體檔案真實整理命名', swayaNote: '直接整理硬碟目錄與檔案名稱', competitorNote: '僅建立虛擬索引（實體檔案維持混亂）' },
      { feature: '無需雲端帳號 / 絕佳隱私保障', swayaNote: '無帳號系統，本機 SQLite 資料庫', competitorNote: '強制 Plex 雲端身分認證與遙測' },
      { feature: '原生 MPV 播放器（零強制轉碼）', swayaNote: '支援所有格式直出 4K HDR 頂級畫質', competitorNote: '經常觸發伺服器端強制轉碼導致畫質下降' },
      { feature: '成人影音（StashDB）與雙重模式', swayaNote: '專屬成人模式 & 原生 StashDB/FansDB 支援', competitorNote: '需依賴不穩定的第三方外掛' },
      { feature: '互動式演練預覽 (Dry-Run) 整理器', swayaNote: '搬移前可直接預覽並微調命名結果', competitorNote: '僅提供被動目錄監控' },
      { feature: 'Torrent 用戶端直接連動（維持做種）', swayaNote: '支援 qBittorrent / Transmission 直連', competitorNote: '無原生支援' },
      { feature: '無月費訂閱負擔（終身授權）', swayaNote: '早鳥價 €39 一次付清終身使用', competitorNote: 'Plex Pass 終身 $119 或每月 $4.99' },
      { feature: '影格精確截圖與時間戳記書籤', swayaNote: '播放時按 Enter 即刻儲存高畫質截圖', competitorNote: '不支援' },
      { feature: '關閉軟體後零系統資源佔用', swayaNote: '關閉視窗即完全釋放 CPU 與記憶體', competitorNote: '後端伺服器仍持續於背景耗電運作' },
    ],
    deepDives: [
      {
        title: '無後端伺服器負擔，亦無網路安全風險',
        description: 'Plex 需要常駐伺服器服務與轉送連接埠。SWAYA 是 1 秒啟動的輕量桌面應用程式，未經你的指令絕不擅自進行任何外部連線。',
      },
      {
        title: '實質整理硬碟檔案，而非僅是虛擬外皮',
        description: 'Plex 僅是在混亂的資料夾上覆蓋一層虛擬元資料。SWAYA 能直接將硬碟中的真實檔案與資料夾整理為規範結構。',
      },
    ],
    faqs: [
      {
        q: '為什麼選擇 SWAYA 而不是 Plex？',
        a: '免去繁瑣的伺服器搭建，無需註冊帳號，4K 播放不卡頓不降畫質，且能徹底整理實體硬碟檔案。',
      },
    ],
  },
  tinymediamanager: {
    title: 'SWAYA vs tinyMediaManager (tmm): 現代化媒體管理與 4K 播放器',
    metaTitle: 'Windows 最佳 tinyMediaManager (tmm) 替代方案 - SWAYA',
    metaDescription: '尋找 tinyMediaManager 的現代化替代品？SWAYA 提供無需 Java 的流暢介面、極速檔案整理與 4K MPV 播放器。',
    heroTagline: '告別沉重陳舊的 Java 工具，擁抱 GPU 加速的現代工作站。',
    heroSubtitle: 'tinyMediaManager 是一款出色的 NFO 產生器，但缺乏內建播放器且介面陳舊。SWAYA 將直覺管理、智慧命名與 4K 播放完美融為一體。',
    competitorPricing: '每年 €10 (PRO 專業版)',
    swayaPricing: '首發早鳥特惠 €39 終身買斷（原價 €79）',
    whenToChooseCompetitor: [
      '主要目的是為 Kodi 或其他媒體伺服器產生複雜的 XML/NFO 檔案。',
      '需要在 Linux 與 macOS 上透過 Java 獲得一致的跨平台介面。',
    ],
    whenToChooseSwaya: [
      '希望在 Windows 上獲得極速反應、視覺動態優雅的現代化介面。',
      '整理完成後希望直接在軟體內以 4K HDR 欣賞影片，無需調用外部程式。',
      '需要將一般影視與成人內容安全分開管理。',
    ],
    matrix: [
      { feature: '現代化 UI 與 GPU 渲染加速', swayaNote: '反應極速的流暢桌面操作體驗', competitorNote: '傳統 Java Swing 介面' },
      { feature: '內建高畫質視訊播放器', swayaNote: 'MPV 4K HDR 硬體加速播放核心', competitorNote: '無內建播放器' },
      { feature: '成人影音（StashDB、FansDB）', swayaNote: '雙重模式與專屬成人資料庫支援', competitorNote: '無原生支援' },
      { feature: '授權收費模式', swayaNote: '€39 一次買斷，終身享有更新', competitorNote: '每年 €10 訂閱制' },
    ],
    deepDives: [
      {
        title: '從 NFO 工具升級為全功能個人影音中心',
        description: 'tinyMediaManager 主要是元資料寫入輔助工具。SWAYA 則是從整理、瀏覽、查看到影評筆記的一站式完整獨立解決方案。',
      },
    ],
    faqs: [
      {
        q: 'SWAYA 可以將檔案整理成 Plex/Jellyfin 規範目錄嗎？',
        a: '可以。SWAYA 預設完全支援 Plex 與 Jellyfin 的標準命名與資料夾結構範本。',
      },
    ],
  },
  stash: {
    title: 'SWAYA vs StashApp: 私密影音管理 & 桌面 4K 播放中心',
    metaTitle: 'Windows 最佳 StashApp 替代方案（無伺服器） - SWAYA',
    metaDescription: '無需本地 Web 伺服器的 StashApp 替代品。SWAYA 支援 StashDB 整合、演職員檔案、4K MPV 播放與隱形保險庫。',
    heroTagline: '無需搭建本地 Web 伺服器：一台獨立桌面軟體搞定一切。',
    heroSubtitle: 'StashApp 是一款強大的開源工具，但需要常駐本地後端伺服器並透過瀏覽器操作。SWAYA 則是 100% 獨立的桌面軟體，具備極致隱私保護。',
    competitorPricing: '免費 (開源專案)',
    swayaPricing: '首發早鳥特惠 €39 終身買斷（原價 €79）',
    whenToChooseCompetitor: [
      '安裝在 Linux 伺服器上，希望透過瀏覽器在區域網路內共享。',
      '希望自行修改程式碼並編譯客製化版本。',
    ],
    whenToChooseSwaya: [
      '偏好 1 秒啟動、無任何背景伺服器行程的純粹 Windows 桌面應用。',
      '需要全域防窺快捷鍵以瞬間隱藏敏感收藏。',
      '希望在同一軟體內以雙重模式同時管理一般電影（TMDb）與成人內容（StashDB）。',
    ],
    matrix: [
      { feature: '軟體架構', swayaNote: '100% 獨立桌面應用（0 伺服器）', competitorNote: '本地 Web 伺服器 + 瀏覽器架構' },
      { feature: '雙重模式（主流影視 & 成人內容）', swayaNote: 'TMDb 與 StashDB 和諧共存', competitorNote: '專為成人內容設計' },
      { feature: '全域隱形保險庫', swayaNote: '快捷鍵 (Ctrl+Alt+H/Esc) 瞬間隱藏', competitorNote: '僅支援密碼保護' },
      { feature: '內建播放器效能', swayaNote: 'GPU 硬體加速 MPV 原生播放器', competitorNote: '瀏覽器 HTML5 內嵌播放器' },
    ],
    deepDives: [
      {
        title: '無伺服器負擔的純粹桌面隱私',
        description: '使用 SWAYA 無需開啟瀏覽器，亦無需管理任何網路連接埠。所有內容均嚴密保護在獨立的 Windows 桌面應用程式中。',
      },
    ],
    faqs: [
      {
        q: '我可以在 SWAYA 中使用 StashDB API 金鑰嗎？',
        a: '可以。在設定面板的 Scrapers 分頁中即可輸入 StashDB、FansDB 與 ThePornDB API 金鑰。',
      },
    ],
  },
  jellyfin: {
    title: 'SWAYA vs Jellyfin: 100% 離線桌面影音工作站',
    metaTitle: 'Windows 最佳 Jellyfin 替代方案（離線焦點） - SWAYA',
    metaDescription: '無需伺服器的 Jellyfin 替代品。整理硬碟檔案、離線檢索目錄並以 MPV 享受 4K HDR 極致畫質。',
    heroTagline: '擺脫串流伺服器束縛，專為個人電腦打造的極致離線影音體驗。',
    heroSubtitle: 'Jellyfin 是優秀的開源串流伺服器，但對於直接在 Windows 電腦上看影片的使用者而言，其伺服器架構顯得過於繁瑣。SWAYA 專為本地高畫質播放而生。',
    competitorPricing: '免費 (開源專案)',
    swayaPricing: '首發早鳥特惠 €39 終身買斷（原價 €79）',
    whenToChooseCompetitor: [
      '需要串流播放至客廳電視或行動裝置。',
      '需要與多位家庭成員共享影音庫。',
    ],
    whenToChooseSwaya: [
      '直接在個人電腦螢幕上追求最高原畫質播放。',
      '希望真正將硬碟實體檔案分類命名整齊。',
      '不想耗費心力維護伺服器與調整網路設定。',
    ],
    matrix: [
      { feature: '產品定位', swayaNote: '獨立離線桌面應用程式', competitorNote: '主從式 (Client-Server) 串流伺服器' },
      { feature: '檔案批次重新命名', swayaNote: '基於 TMDb 的智慧批次整理器', competitorNote: '無實體檔案重新命名功能' },
      { feature: '播放畫質體驗', swayaNote: 'MPV 硬體加速直出原畫質', competitorNote: '受限於網路頻寬與轉碼負擔' },
    ],
    deepDives: [
      {
        title: '專為本機電腦使用者深度最佳化',
        description: '當你直接在電腦螢幕前觀看影片時，具備硬體底層呼叫能力的桌面軟體無論在啟動速度、影音同步或色彩渲染上都遠勝 Web 串流架構。',
      },
    ],
    faqs: [
      {
        q: 'SWAYA 整理後的目錄日後可在 Jellyfin 中使用嗎？',
        a: '完全可以。SWAYA 採用標準的 Jellyfin 與 Plex 目錄規範，100% 無縫相容。',
      },
    ],
  },
  kodi: {
    title: 'SWAYA vs Kodi: 專為 Windows 打造的現代影音中心與檔案整理器',
    metaTitle: 'Windows 最佳 Kodi 替代方案 - SWAYA 個人影音中心',
    metaDescription: '尋找專為電腦桌面而非客廳電視設計的現代影音中心？SWAYA 為鍵盤與滑鼠操作深度最佳化。',
    heroTagline: '告別客廳遙控器介面，體驗專為滑鼠鍵盤量身打造的現代工作站。',
    heroSubtitle: 'Kodi 專為電視大螢幕遙控器設計，在 Windows 電腦上操作較為繁複。SWAYA 提供現代簡約、直覺流暢且專為電腦打造的影音操作環境。',
    competitorPricing: '免費 (開源專案)',
    swayaPricing: '首發早鳥特惠 €39 終身買斷（原價 €79）',
    whenToChooseCompetitor: [
      '將 Raspberry Pi 或 HTPC 連接至客廳電視並使用遙控器操作。',
      '熱衷於安裝與調校大量的社群外掛程式與自訂主題皮膚。',
    ],
    whenToChooseSwaya: [
      '在電腦前使用滑鼠與鍵盤，追求極速、直覺與現代化的操作體驗。',
      '希望在單一軟體中兼顧批次檔案命名整理與 4K MPV 頂級播放。',
    ],
    matrix: [
      { feature: '使用者介面設計', swayaNote: '深度最佳化滑鼠與鍵盤操作', competitorNote: '客廳電視遙控器專用介面' },
      { feature: '實體檔案批次命名', swayaNote: '內建強大智慧整理器', competitorNote: '無實體檔案管理功能' },
      { feature: '開箱即用簡易度', swayaNote: '安裝完成 1 秒即刻上手', competitorNote: '繁瑣的外掛與資料庫刮削器設定' },
    ],
    deepDives: [
      {
        title: '專為電腦進階玩家量身定制',
        description: '無需在繁瑣的電視多層選單中迷航。享受滑暢滾動、全域快捷鍵與拖曳操作帶來的極致效率。',
      },
    ],
    faqs: [
      {
        q: 'SWAYA 的設定會比 Kodi 簡單嗎？',
        a: '簡單許多。SWAYA 無需配置複雜的外掛或 XML 設定檔，安裝後開箱即可直接使用。',
      },
    ],
  },
};
