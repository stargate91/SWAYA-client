export const zh = {
  filebot: {
    title: 'SWAYA vs FileBot: 现代化桌面媒体中心与批量文件重命名工具',
    metaTitle: 'Windows 与 Linux 上 FileBot 的最佳替代品 - SWAYA 批量重命名与 MPV 播放器',
    metaDescription: '在寻找 FileBot 的现代替代方案？SWAYA 通过 TMDb 和 StashDB 重命名本地文件，提供离线媒体库和内置 4K MPV 播放器。',
    heroTagline: '为什么只重命名文件？整理并畅享播放您的整个媒体库！',
    heroSubtitle: 'FileBot 在文件重命名方面很出色，但 SWAYA 将您的本地媒体管理提升至全新维度：磁盘整理、精美的离线媒体库以及内置的 4K HDR MPV 播放器，全部集成在一个现代化的 Windows 与 Linux 桌面应用中。',
    competitorPricing: '$6/年 或 $48 终身授权',
    swayaPricing: '首发特惠 €39 终身授权（原价 €79）',
    whenToChooseCompetitor: [
      '您只需要用于无头 Linux 或 NAS 脚本的轻量级命令行（CLI）工具。',
      '您编写自定义 Groovy 重命名表达式及自动化脚本挂钩。',
      '您已经在使用独立的媒体中心（如 Plex 或 Kodi），不需要内置播放器。',
    ],
    whenToChooseSwaya: [
      '您想要一站式桌面解决方案：在磁盘上重命名文件，同时可立即在媒体库中浏览和播放。',
      '您同时管理主流影视（TMDb）与成人内容（StashDB、FansDB、ThePornDB）。',
      '您需要具有硬件加速、精准帧恢复且无需转码的内置 MPV 播放器。',
      '您喜欢具有安全演练预览和防冲突保护的现代化 Windows 界面。',
    ],
    matrix: [
      { feature: '磁盘物理文件重命名与整理', swayaNote: 'TMDb, ThePornDB, StashDB, FansDB', competitorNote: 'TheMovieDB, TVmaze, AniDB' },
      { feature: '演练预览与防冲突安全机制', swayaNote: '智能冲突检测与安全替换', competitorNote: '简单预览列表' },
      { feature: '内置 4K/HDR MPV 视频播放器', swayaNote: 'GPU 硬件加速，字幕与音频精准同步', competitorNote: '无内置播放器' },
      { feature: '可视化离线媒体库与详情页', swayaNote: '海报、背景图、演职员、流派、评分', competitorNote: '无媒体库界面' },
      { feature: '成人媒体与 StashDB 刮削支持', swayaNote: '原生 StashDB、FansDB 刮削与演员索引', competitorNote: '仅限主流数据库' },
      { feature: '带 PIN 码保护的双模式（SFW / NSFW）', swayaNote: '完全数据库隔离与即时锁定', competitorNote: '不支持' },
      { feature: 'Torrent 客户端自动导入（qBittorrent）', swayaNote: '内置集成与就地做种导入', competitorNote: '仅通过自定义 CLI 脚本' },
      { feature: '100% 离线与无服务器运行（0 后台常驻）', swayaNote: '无后台常驻服务或开放端口', competitorNote: '本地 Java 应用程序' },
      { feature: '现代 Windows 界面（无需 Java 环境）', swayaNote: '原生桌面应用程序', competitorNote: 'Java / Swing 界面' },
      { feature: '一次性买断终身授权', swayaNote: '首发 €39 / 终身 €79', competitorNote: '$48 终身 或 $6/年' },
    ],
    deepDives: [
      {
        title: '超越单纯重命名：完整的媒体宇宙',
        description: 'FileBot 在文件完成重命名后就结束了。SWAYA 能立即将您重命名后的文件转化为包含海报、演员生平、分集简介和自定义过滤器的丰富可视化媒体库。',
      },
      {
        title: '内置 4K HDR MPV 播放器',
        description: '无需启动第三方播放器。在 SWAYA 中点击任意视频，即可通过 GPU 硬件加速即时播放高码率 MKV、HDR、Dolby Atmos 和多轨道字幕。',
      },
      {
        title: '主流与成人影视尽在一个应用中',
        description: 'SWAYA 是首个采用专属双模式架构的媒体工作站：通过 TMDb 管理主流大片，通过 StashDB 管理成人内容，并隐藏在可选的 PIN 码保护之下。',
      },
    ],
    faqs: [
      {
        q: 'SWAYA 能否完全替代 FileBot 批量重命名电视剧和电影？',
        a: '可以。SWAYA 会扫描您的下载文件夹，通过 TMDb 匹配标题，支持交互式微调，并根据您的自定义结构在磁盘上物理重命名或移动文件。',
      },
      {
        q: '在整理文件的同时是否支持保持 BT 种子做种？',
        a: '支持。SWAYA 提供“就地导入”模式，可在将所有元数据和海报拉入媒体库的同时，保持磁盘上的实际文件和文件夹结构不变以供持续做种。',
      },
      {
        q: '运行 SWAYA 是否需要安装 Java？',
        a: '不需要。SWAYA 是独立的 Windows 原生应用程序，不需要 Java 或任何外部运行时。',
      },
    ],
  },
  plex: {
    title: 'SWAYA vs Plex: 真正 100% 离线且无需服务器的媒体工作站',
    metaTitle: 'Windows 与 Linux 上无需服务器的 Plex 替代品 - SWAYA',
    metaDescription: '在寻找无需搭建服务器的私密 Plex 替代品？SWAYA 整理硬盘文件，通过 MPV 播放 4K HDR，无需任何云端账户。',
    heroTagline: '无需服务器、云端账号或数据收集的专属个人媒体库。',
    heroSubtitle: 'Plex 专为家庭网络串流而设计，但需要常驻后台服务、云端登录和 Plex Pass 订阅。SWAYA 则直接在您的电脑上提供零配置、100% 离线的桌面体验。',
    competitorPricing: '免费 / $4.99/月 / $119 终身 (Plex Pass)',
    swayaPricing: '首发特惠 €39 终身授权（原价 €79）',
    whenToChooseCompetitor: [
      '您想要将媒体串流到智能电视、手机，并与家庭外部成员分享。',
      '您拥有一台具有多用户转码能力的专用 NAS 或家庭服务器。',
      '您需要在 iOS、Android 和 Apple TV 之间进行多设备远程进度同步。',
    ],
    whenToChooseSwaya: [
      '您直接在 Windows 或 Linux 电脑、笔记本或直连显示器上观看影视。',
      '您要求 100% 隐私保护：零云端账户、零遥测收集、零开放网络端口。',
      '您希望硬盘上的实际物理文件被整洁地分类和重命名。',
      '您厌倦了服务器配置、后台常驻占用和转码卡顿。',
    ],
    matrix: [
      { feature: '100% 离线与零服务器配置', swayaNote: '即开即用桌面软件，无后台常驻', competitorNote: '需要 Plex Media Server 后端' },
      { feature: '磁盘物理文件重命名与整理', swayaNote: '重命名磁盘上的实际文件', competitorNote: '仅虚拟数据库，不改变磁盘文件' },
      { feature: '无需云端账号 / 彻底隐私保护', swayaNote: '无需登录，本地 SQLite 数据库', competitorNote: '必须通过 Plex 在线认证' },
      { feature: '原生 MPV 播放器（无需转码）', swayaNote: '直接以 4K HDR 播放任何编码视频', competitorNote: '播放时经常发生不必要的转码' },
      { feature: '成人媒体（StashDB）与双模式', swayaNote: '专属成人模式与 StashDB/FansDB', competitorNote: '需要容易失效的第三方插件' },
      { feature: '交互式演练预览批量整理器', swayaNote: '在移动文件前可全面审查与修改', competitorNote: '仅被动监控文件夹' },
      { feature: 'Torrent 客户端集成（就地导入）', swayaNote: 'qBittorrent / Transmission 原生支持', competitorNote: '原生不支持' },
      { feature: '一次性买断（无按月订阅费）', swayaNote: '€39 首发一次性付清', competitorNote: '$119 Plex Pass 终身 或 $4.99/月' },
      { feature: '逐帧精度的精彩瞬间书签', swayaNote: '按回车键一键截图并保存时间戳', competitorNote: '不支持' },
      { feature: '应用关闭后零 CPU/内存占用', swayaNote: '关闭软件后后台无任何残留', competitorNote: '服务器进程在后台持续运行' },
    ],
    deepDives: [
      {
        title: '零服务器常驻，零端口转发烦恼',
        description: 'Plex 需要持续维护 Plex Media Server、配置端口和应对云端认证故障。SWAYA 是 1 秒即开的独立桌面工作站，绝不会在未经允许的情况下访问网络。',
      },
      {
        title: '真实物理磁盘整理 vs 虚拟媒体库',
        description: 'Plex 只是在混乱的文件夹之上建立虚拟索引。SWAYA 会对存储盘上的物理文件和目录进行实际重命名与规范化整理。',
      },
      {
        title: '原生 MPV 告别转码烦恼',
        description: '受够了 Plex 在播放 4K HDR 或 PGS/ASS 特效字幕时的转码卡顿吗？SWAYA 内置优化后的 MPV 引擎，凭借 GPU 硬件加速流畅播放任何复杂格式。',
      },
    ],
    faqs: [
      {
        q: '没有网络连接时能否使用 SWAYA？',
        a: '可以！SWAYA 采用 100% 离线架构。在获取元数据后（或对于不需要刮削的个人视频），无需连接互联网即可随时浏览、搜索和播放。',
      },
      {
        q: 'SWAYA 是否像 Plex 一样支持串流到手机或智能电视？',
        a: 'SWAYA 专为 PC 和笔记本电脑打造的高性能个人桌面工作站，不提供向远程移动设备或电视推送的串流服务。',
      },
      {
        q: 'SWAYA 会收集播放历史或强制要求登录吗？',
        a: '不会。SWAYA 不需要任何在线账号，绝不上传观影历史或遥测数据。所有数据均严格保存在您的本地电脑中。',
      },
    ],
  },
  tinymediamanager: {
    title: 'SWAYA vs tinyMediaManager: 现代化媒体管理器与播放器',
    metaTitle: 'Windows 与 Linux 上 tinyMediaManager 的替代方案 - SWAYA',
    metaDescription: '寻找 tinyMediaManager 的现代替代品？SWAYA 提供高速批量文件重命名、TMDb/StashDB 刮削与内置 4K MPV 播放器，无需 Java。',
    heroTagline: '告别笨重的 Java 界面，即刻整理并畅享您的影音收藏。',
    heroSubtitle: 'tinyMediaManager 是功能强大的 NFO 生成器，但需要 Java 环境且缺乏内置播放器。SWAYA 将磁盘文件整理、优雅媒体库与 4K MPV 播放完美结合。',
    competitorPricing: '€15/年 (v4/v5 Pro)',
    swayaPricing: '首发特惠 €39 终身授权（原价 €79）',
    whenToChooseCompetitor: [
      '您特别需要生成非常详尽的 .NFO 文件以供外部 Kodi 系统读取。',
      '您需要在 macOS、Linux 和 Windows 之间跨平台管理媒体。',
      '您需要对冷门标签进行精细复杂的 XML/NFO 编辑。',
    ],
    whenToChooseSwaya: [
      '您想要一款快速流畅、无需安装 Java 运行时的现代 Windows 与 Linux 桌面软件。',
      '您需要一站式整合体验：整理、浏览、一键播放全部在一个软件中搞定。',
      '您同时管理成人媒体（StashDB、FansDB）与普通电影电视剧。',
      '您更喜欢一次性买断的终身授权，而非按年续费的订阅制。',
    ],
    matrix: [
      { feature: '磁盘物理重命名与文件夹布局', swayaNote: '智能模板与防冲突保护', competitorNote: '基于模式的重命名器' },
      { feature: '内置硬件加速视频播放器', swayaNote: '原生 4K HDR MPV 播放引擎', competitorNote: '无内置播放引擎' },
      { feature: '成人媒体（StashDB / FansDB）刮削', swayaNote: '原生专属刮削器与演员库', competitorNote: '不支持' },
      { feature: '带 PIN 码保护的双模式隐私空间', swayaNote: '隔离数据库与一键快速锁定', competitorNote: '无隐私或双模式' },
      { feature: '现代桌面界面（无需 Java 运行时）', swayaNote: '轻量高效的原生应用程序', competitorNote: 'Java Swing 界面' },
      { feature: '交互式匹配与批量编辑弹窗', swayaNote: '快速搜索、剧集选择与标签编辑器', competitorNote: '刮削对话框' },
      { feature: 'Torrent 客户端集成（做种模式）', swayaNote: '就地导入与做种状态保持', competitorNote: '不支持' },
      { feature: '播放历史记录与精彩时刻追踪', swayaNote: '详细播放统计与截图时间点固定', competitorNote: '基础已看标记' },
      { feature: '授权模式', swayaNote: '一次性终身授权（€39）', competitorNote: '€15 / 年 周期订阅' },
    ],
    deepDives: [
      {
        title: '集大成者：整理、浏览与播放融为一体',
        description: '使用 tinyMediaManager 时，您必须在 tMM 编辑和外部播放器（VLC、MPC）之间频繁切换。SWAYA 为您提供统一、精致的桌面工作空间。',
      },
      {
        title: '一次买断终身受益 vs 每年续费订阅',
        description: 'tMM v4/v5 每年都需要支付续费才能从在线数据库刮削元数据。SWAYA 仅需一次性支付 €39，即可终身享有所有未来更新。',
      },
      {
        title: '主流影视与成人内容全面刮削',
        description: 'tMM 仅专注于主流电影电视剧，而 SWAYA 深度集成了 StashDB、FansDB 和 ThePornDB，让您在一个应用中管好全部收藏。',
      },
    ],
    faqs: [
      {
        q: 'SWAYA 整理后的文件能否被 Kodi/Jellyfin 正确识别？',
        a: '可以。SWAYA 遵循通用的 Plex/Jellyfin/Kodi 命名规范和目录层级，整理后的文件可被各大媒体软件无缝读取。',
      },
      {
        q: 'SWAYA 的启动速度是否比基于 Java 的软件更快？',
        a: '是的。SWAYA 瞬时启动且内存占用极低，完全没有 Java 虚拟机（JVM）的启动延迟。',
      },
    ],
  },
  stash: {
    title: 'SWAYA vs StashApp: 无需 Web 服务器的原生桌面工作站',
    metaTitle: 'Windows 与 Linux 上 StashApp 的原生替代品 - SWAYA 桌面管理器',
    metaDescription: '寻找 StashApp 的 Windows 原生替代方案？SWAYA 结合了 StashDB 刮削、磁盘文件重命名和内置 MPV 播放器，无需配置服务器。',
    heroTagline: '无需 Localhost 网页服务器或 Docker 的终极私密媒体工作站。',
    heroSubtitle: 'Stash 是优秀的成人媒体服务器，但作为浏览器 Web 守护进程运行。SWAYA 是一款原生 Windows 与 Linux 桌面软件，同时支持 TMDb 和 StashDB，并内置 MPV 播放器。',
    competitorPricing: '免费 / 开源软件',
    swayaPricing: '首发特惠 €39 终身授权（原价 €79）',
    whenToChooseCompetitor: [
      '您运行无头 Linux 服务器或 Docker 容器以供多客户端网络访问。',
      '您使用特定冷门站点的自定义社区插件。',
      '您偏好在浏览器中运行的纯 Web 应用程序。',
    ],
    whenToChooseSwaya: [
      '您想要一个干净独立的桌面应用，而不是在后台运行网页服务器（`localhost:9999`）。',
      '您希望在一个应用中同时管理主流电影电视剧（TMDb）与成人作品（StashDB）。',
      '您需要具有防冲突保护的真实磁盘文件重命名与目录整理。',
      '您需要带 GPU 硬件加速的 MPV 播放器，流畅播放 4K 60fps/VR 视频且不受浏览器限制。',
    ],
    matrix: [
      { feature: '原生桌面应用（无需 Localhost 服务器）', swayaNote: '单文件运行，0 后台常驻守护进程', competitorNote: '在 localhost:9999 运行 Go 服务器' },
      { feature: '磁盘物理文件重命名与目录整理', swayaNote: '在磁盘上重命名与移动实际文件', competitorNote: '文件夹中的文件保持原样不变' },
      { feature: '双模式：主流（TMDb）+ 成人（StashDB）', swayaNote: '在 SFW 和 NSFW 库之间即时切换', competitorNote: '仅限成人内容' },
      { feature: '原生硬件加速 4K MPV 播放器', swayaNote: '零卡顿流畅播放任何音视频格式', competitorNote: '浏览器 HTML5 播放器（格式受限）' },
      { feature: '交互式匹配与批量编辑弹窗', swayaNote: '安全演练表格与批量操作支持', competitorNote: '打标器（Tagger）界面' },
      { feature: '演员档案、厂牌标签与分类 Tag', swayaNote: '详尽演员信息与高清图集', competitorNote: '演员数据库' },
      { feature: '按回车键一键记录精彩瞬间与截图', swayaNote: '时间轴固定、画廊与精准书签', competitorNote: '场景标记点' },
      { feature: 'PIN 码保护隐私安全锁', swayaNote: '一键即时锁定并隐藏成人数据库', competitorNote: '基础认证插件' },
      { feature: 'Torrent 客户端直接集成（qBittorrent）', swayaNote: '直接同步与做种支持', competitorNote: '仅通过第三方脚本' },
    ],
    deepDives: [
      {
        title: '原生 MPV 播放器突破浏览器解码限制',
        description: 'Stash 通过浏览器的 HTML5 标签播放视频，在遇到 HEVC 10-bit 或高码率 4K 时经常需要转码或无法播放。SWAYA 内置优化的 MPV 播放器，无需消耗额外 CPU 即可畅快播放任何格式。',
      },
      {
        title: '统一收纳所有内容的媒体库',
        description: '为何要为普通电影和成人作品分别安装多套软件？SWAYA 支持在普通模式和成人模式之间秒级切换，数据库完全物理隔离。',
      },
      {
        title: '真实整理存储盘上的物理文件',
        description: '与仅在数据库中建立索引、任由硬盘乱成一团的 Stash 不同，SWAYA 会按照规范的厂牌和演员模板将文件物理重命名和整理归类。',
      },
    ],
    faqs: [
      {
        q: 'SWAYA 能否直接从 StashDB 抓取数据？',
        a: '可以！只需在设置中输入您的 StashDB API 密钥，SWAYA 即可自动匹配标题、演员、厂牌、发布日期以及超高清封面图。',
      },
      {
        q: 'SWAYA 如何保障成人媒体的隐私安全？',
        a: 'SWAYA 拥有专门的 PIN 码锁定功能。锁定状态下，成人库完全不可见，必须输入正确的 PIN 码方可进入。',
      },
    ],
  },
  jellyfin: {
    title: 'SWAYA vs Jellyfin: 本地桌面工作站 vs 家用媒体服务器',
    metaTitle: 'Windows 与 Linux 上无需服务器的 Jellyfin 替代品 - SWAYA',
    metaDescription: '想要免除 Docker 和服务器维护的桌面媒体中心？SWAYA 整理磁盘文件，通过 MPV 播放 4K HDR，无需任何网络配置。',
    heroTagline: '无需 Docker 容器或网络服务器配置，轻松畅享本地硬盘收藏。',
    heroSubtitle: 'Jellyfin 是出色的家庭网络串流服务器。但如果您只是想在自己的电脑上看电影和整理文件，SWAYA 的速度与便利性要远远胜出。',
    competitorPricing: '免费 / 开源软件 (FOSS)',
    swayaPricing: '首发特惠 €39 终身授权（原价 €79）',
    whenToChooseCompetitor: [
      '您需要向全家的智能电视和多部手机进行网络串流播放。',
      '您在 Linux/Docker 上搭建了服务，需要管理多用户账号。',
      '您坚持必须使用 100% 纯开源的服务器软件。',
    ],
    whenToChooseSwaya: [
      '您直接在自己的 Windows or Linux PC 或笔记本上观看影片并整理下载文件。',
      '您不想折腾开放端口、常驻后台服务或调试转码参数。',
      '您需要真实的物理磁盘重命名与原生 MPV 4K 播放画质。',
      '您希望在管理普通电影的同时原生支持 StashDB 成人内容。',
    ],
    matrix: [
      { feature: '零服务器配置与零维护成本', swayaNote: '秒开即用，无后台常驻守护进程', competitorNote: '需要安装并持续维护服务器' },
      { feature: '磁盘物理文件重命名与结构整理', swayaNote: '在磁盘上真实移动并结构化文件', competitorNote: '只读虚拟媒体库' },
      { feature: '内置 4K HDR MPV 播放器', swayaNote: '原生 GPU 硬件加速，零延迟', competitorNote: 'Web/HTML5 或外部封装客户端' },
      { feature: '成人媒体（StashDB）与双模式', swayaNote: '原生 StashDB/FansDB 集成', competitorNote: '需要第三方社区插件' },
      { feature: '100% 离线，无需开放网络端口', swayaNote: '无开放端口，100% 本地运行', competitorNote: '需要局域网服务器' },
      { feature: '交互式演练预览批量整理器', swayaNote: '完全控制与防冲突保护', competitorNote: '仅被动监控文件夹' },
      { feature: 'Torrent 客户端直接集成（做种模式）', swayaNote: '直接支持 qBittorrent', competitorNote: '不支持' },
      { feature: '精彩瞬间捕捉与时间点书签', swayaNote: '一键截图并保存精彩瞬间', competitorNote: '不支持' },
    ],
    deepDives: [
      {
        title: '桌面级简便 vs 服务器级复杂',
        description: '搭建 Jellyfin 需要配置网络端口和常驻守护进程。SWAYA 是一款开箱即用的独立桌面软件，启动后即可立即开始使用。',
      },
      {
        title: '存储盘上真实的物理文件整理',
        description: 'Jellyfin 依赖于您提前手动整理好文件。SWAYA 能主动扫描杂乱的下载文件夹，在磁盘上重命名文件并创建规范结构。',
      },
      {
        title: '原生 MPV 的卓越播放性能',
        description: '通过 SWAYA 内置的 MPV 播放引擎，享受瞬时拖拽进度、完美字幕渲染以及丝滑无卡顿的 4K HDR 视频播放体验。',
      },
    ],
    faqs: [
      {
        q: '我是否可以使用 SWAYA 来整理供 Jellyfin 读取的文件？',
        a: '可以！SWAYA 按照行业通用标准组织目录和文件名，整理后的文件夹能够被 Jellyfin 完美识别且无刮削错误。',
      },
      {
        q: 'SWAYA 会在后台消耗系统资源吗？',
        a: '不会。关闭 SWAYA 后，系统中不会残留任何后台服务或后台进程。',
      },
    ],
  },
  kodi: {
    title: 'SWAYA vs Kodi: 告别插件故障的现代化桌面媒体中心',
    metaTitle: 'Windows or Linux PC 上 Kodi 的现代替代品 - SWAYA',
    metaDescription: '寻找专为 PC 打造的现代 Kodi 替代品？SWAYA 提供 MPV 播放器、文件整理和现代化桌面界面，告别插件失效烦恼。',
    heroTagline: '专为鼠标、键盘和存储硬盘打造的现代媒体体验。',
    heroSubtitle: 'Kodi 适合电视遥控器操作，但在电脑屏幕上用鼠标操作十分别扭，且插件极易失效。SWAYA 专为 Windows 与 Linux 桌面环境打造，直接管理磁盘。',
    competitorPricing: '免费 / 开源软件 (FOSS)',
    swayaPricing: '首发特惠 €39 终身授权（原价 €79）',
    whenToChooseCompetitor: [
      '您在客厅电视上组装了 HTPC，并使用红外遥控器进行操作。',
      '您高度依赖第三方 IPTV 或 PVR 串流插件。',
      '您需要专为沙发距离设计的 10 英尺用户界面。',
    ],
    whenToChooseSwaya: [
      '您在 Windows or Linux PC 上使用鼠标和键盘进行日常操作。',
      '您希望安全地在硬盘上批量重命名文件并整理目录。',
      '您需要一款软件更新后绝不会莫名损坏的轻量稳定工具。',
      '您希望在一个软件中同时收纳普通影视（TMDb）与成人内容（StashDB）。',
    ],
    matrix: [
      { feature: '现代桌面 UI（专为鼠标与键盘优化）', swayaNote: '流畅高效的 Windows 界面', competitorNote: '专为电视遥控器设计的 UI' },
      { feature: '磁盘物理文件重命名与结构整理', swayaNote: '在磁盘上真实重命名与移动文件', competitorNote: '仅数据库记录，不改动文件名' },
      { feature: '内置 4K/HDR MPV 视频引擎', swayaNote: '硬件加速，丝滑无卡顿', competitorNote: '内置播放引擎' },
      { feature: '成人媒体（StashDB）与双模式', swayaNote: '原生 StashDB/FansDB 集成', competitorNote: '需要不稳定的外部插件' },
      { feature: '极高稳定性（告别插件失效之苦）', swayaNote: '自包含、高可靠的统一架构', competitorNote: '每次大版本更新插件经常损坏' },
      { feature: '演练预览与防冲突安全机制', swayaNote: '移动前安全预览', competitorNote: '不适用' },
      { feature: 'Torrent 客户端集成（做种模式）', swayaNote: '直接支持 qBittorrent', competitorNote: '需要外部脚本' },
    ],
    deepDives: [
      {
        title: '桌面优先体验，告别遥控器界面的笨拙',
        description: 'Kodi 专为遥控器设计，在桌面多窗口和鼠标环境下操作繁琐。SWAYA 专为 Windows 与 Linux 桌面的敏捷交互量身定制。',
      },
      {
        title: '直接在磁盘上整理物理文件',
        description: 'Kodi 要求您必须预先命名好文件。SWAYA 则承担了重活：自动识别杂乱的下载内容并在磁盘上完成规范化重命名。',
      },
      {
        title: '零插件维护烦恼',
        description: '刮削器、媒体库管理、播放器与精彩瞬间标记等核心功能全部原生内置于 SWAYA 中，无需担心插件更新后报错。',
      },
    ],
    faqs: [
      {
        q: '我可以用 SWAYA 为 Kodi 预先准备媒体文件吗？',
        a: '可以！SWAYA 整理出的文件命名和目录结构完全符合行业标准，Kodi 能够自动识别且毫无识别错误。',
      },
      {
        q: 'SWAYA 使用起来是否比 Kodi 更简单？',
        a: '简单得多。SWAYA 无需添加软件源、折腾插件仓库或修改复杂的 XML 皮肤配置--开箱即用。',
      },
    ],
  },
};
