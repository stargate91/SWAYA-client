export const tr = {
  sectionTitles: {
    added: 'Yeni Özellikler',
    performance: 'Performans & Mimari',
    changed: 'Geliştirmeler',
    fixed: 'Hata Düzeltmeleri & İyileştirmeler',
  },
  releases: {
    '1.1.0': {
      title: "Etkileşimli Gezinme, Kaydırma Konumu Geri Yükleme ve Otomatik Veritabanı Geçişleri",
      description: "Etkileşimli başlık çubuğu gezinmesi, filmografi kaydırma konumu geri yükleme, otomatik Alembic veritabanı şeması geçişleri ve modüler tasarım sistemi sunan büyük kararlılık güncellemesi.",
      highlights: [
              "Ana sayfa bağlantısı ve kenar çubuğu geçiş düğmesi içeren etkileşimli başlık çubuğu gezinmesi",
              "Oyuncu ve sanatçı filmografi sayfaları için gelişmiş kaydırma konumu geri yükleme motoru",
              "Başlangıçta veritabanı şemasını otomatik olarak güncelleyen Alembic geçiş çalıştırıcısı",
              "Jackett torrent aramalarında yetişkin içerik filtreleme ve kategori temizleme desteği",
              "600’den fazla bağımsız bileşen ve CSS belirteci ile kapsamlı tasarım sistemi modülerleştirmesi"
      ]
    },
    '1.0.0': {
      title: 'Torrent Entegrasyonu, Kapsamlı İnceleme Çekmecesi & TV Sezon Mimarisi',
      description: 'Harici torrent istemcisi kontrol paneli, evrensel arama, inceleme çekmecesi, TV sezon hiyerarşisi ve optimize edilmiş SQL işlem günlüklerini içeren büyük sürüm.',
      highlights: [
        'Bant genişliği monitörlü harici torrent istemcisi (qBittorrent ve Transmission) kontrol paneli',
        'İndirme tamamlandığında arka planda otomatik algılama ve kütüphane taraması',
        'TV dizileri sezon hiyerarşisi ve bölüm başına izleme durumu takibi',
        'TMDb, StashDB ve FansDB üzerinde entegre keşif bileşeni',
        'Ayrıntılı işlem günlüklerini tembel yükleyen dosya düzenleyici geçmişi',
      ],
    },
    '0.7.0': {
      title: 'GPU Donanım Hızlandırma & SQLite Filmografi Önbelleği',
      description: 'NVENC/QSV GPU video önizlemeleri, uzaktan filmografi önbelleği ve arka uç dinamik port atamasını içeren performans güncellemesi.',
      highlights: [
        'NVENC/QSV/AMF otomatik algılamalı donanım hızlandırmalı FFmpeg video önizlemeleri',
        'Oyuncu profillerinin anında yüklenmesi için yerel SQLite filmografi önbelleği',
        'Bağlantı noktası çakışmalarını önlemek için açılışta otomatik dinamik TCP port ataması',
      ],
    },
    '0.6.0': {
      title: 'Çoklu Kaynakta Evrensel Arama & Arka Plan Süreç Denetimi',
      description: 'Tüm veri tabanlarında genişletilmiş arama yetenekleri ve arka planda çalışan süreçlerin güvenli yönetimi.',
      highlights: [
        'Filmler, sahneler, oyuncular ve stüdyolar için birleşik arama',
        'Arka planda yetim süreçlerin kalmasını engelleyen ana süreç izleyicisi',
      ],
    },
  },
};
