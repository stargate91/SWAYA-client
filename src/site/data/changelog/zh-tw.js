export const zhTw = {
  sectionTitles: {
    added: '新功能',
    performance: '效能與架構最佳化',
    changed: '功能改進',
    fixed: '錯誤修復與微調',
  },
  releases: {
    '1.0.0': {
      title: 'Torrent 用戶端整合、深度影評抽屜與電視影集季數階層架構',
      description: '重大版本更新：導入外部 Torrent 用戶端控制面板、全域搜尋、影評編輯抽屜、電視影集分季導覽與最佳化批次 SQL 日誌。',
      highlights: [
        '外部 Torrent 用戶端（qBittorrent 與 Transmission）控制面板與即時頻寬監控',
        '背景下載完成自動偵測與媒體庫自動掃描歸檔',
        '電視影集分季階層結構與單集觀看進度追蹤',
        '跨 TMDb、StashDB 與 FansDB 的整合探索導覽組件',
        '支援按需延遲載入詳細操作日誌的整理器歷史紀錄',
      ],
    },
    '0.7.0': {
      title: 'GPU 硬體加速預覽與 SQLite 演職員作品年表快取',
      description: '效能更新：支援 NVENC/QSV GPU 視訊預覽、遠端作品年表快取與後端動態通訊埠指派。',
      highlights: [
        '具備 NVENC/QSV/AMF 自動偵測之硬體加速 FFmpeg 視訊預覽',
        '用於演職員個人檔案即時載入的本機 SQLite 作品年表快取',
        '開機時自動動態指派 TCP 連接埠以避免通訊衝突',
      ],
    },
    '0.6.0': {
      title: '全域多來源搜尋與背景行程守護監控',
      description: '強化全資料庫跨來源檢索能力，並建立穩健的後端行程監控機制。',
      highlights: [
        '涵蓋電影、場景、演職員與發行商的統一全域搜尋',
        '父行程守護監視器，徹底防止背景殘留孤兒行程',
      ],
    },
  },
};
