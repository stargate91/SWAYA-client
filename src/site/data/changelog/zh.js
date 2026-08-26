export const zh = {
  sectionTitles: {
    added: '新功能',
    performance: '性能与架构',
    changed: '改进与优化',
    fixed: '问题修复与调整',
  },
  releases: {
    '1.0.0': {
      title: 'Torrent 客户端集成、细粒度评分与剧集专属架构',
      description: '重大工作站版本发布：引入外部 Torrent 客户端控制面板、全局 Torrent 搜索、评分抽屉、TV 剧集分季导航以及优化的批量 SQL 日志。',
      highlights: [
        '外部 Torrent 客户端控制面板（qBittorrent 与 Transmission）及实时带宽统计',
        '自动化后台下载完成监听与媒体库即时扫描',
        '专属电视剧集分集结构与播放进度跟踪',
        '跨 TMDb、StashDB 和 FansDB 的统一媒体与成人内容发现组件',
        '支持按需懒加载详细日志的主从重命名历史记录',
      ],
    },
    '0.7.0': {
      title: '硬件视频加速与 SQLite 演职员表缓存',
      description: '性能与稳定性更新：支持 NVENC/QSV GPU 硬件视频预览、远程演职员表本地缓存以及后端动态端口分配。',
      highlights: [
        '支持 NVENC/QSV/AMF 自动检测的 FFmpeg 硬件加速视频预览',
        '用于即时加载演职员作品的 SQLite 本地缓存',
        '后端启动时自动进行动态 TCP 端口分配，避免端口冲突',
      ],
    },
    '0.6.0': {
      title: '通用多源搜索与进程生命周期监视器',
      description: '扩展全库检索能力并强化后端常驻进程管理。',
      highlights: [
        '跨电影、场景、演员和制片厂的统一全局搜索',
        '主进程监视器，防止应用退出时残留后台孤儿进程',
      ],
    },
  },
};
