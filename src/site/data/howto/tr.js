export const tr = {
  'getting-started': {
    name: 'SWAYA çevrimdışı medya merkezi nasıl kurulur ve yapılandırılır',
    description: 'Windows kurulumu, klasör seçimi ve çevrimdışı kütüphane oluşturma adımları.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'İndirme ve Kurulum',
        text: 'SWAYA masaüstü uygulamasını Windows 10 veya 11 üzerine kurun ve başlatın.',
      },
      {
        name: 'Depolama Dizinlerini Belirleme',
        text: 'Ayarlar içerisinden indirme klasörlerinizi ve hedef medya kütüphanesi dizinlerinizi belirtin.',
      },
      {
        name: 'Medyaları Tarama ve Eşleştirme',
        text: 'Dosyaları taramak, meta verileri ve afişleri otomatik indirmek için Düzenleyiciyi açın.',
      },
    ],
  },
  'organizer': {
    name: 'Dosyalar otomatik olarak nasıl toplu yeniden adlandırılır ve düzenlenir',
    description: 'TMDb ve StashDB ile otomatik eşleştirme yaparak dosyaları mükerrer olmadan güvenle düzenleyin.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Kaynak Klasörü Seçme',
        text: 'SWAYA Düzenleyiciyi açın ve dağınık indirmelerin bulunduğu klasörü seçin.',
      },
      {
        name: 'Otomatik Meta Veri Eşleştirmesi',
        text: 'Film ve dizi isimlerini otomatik tespit etmek için TMDb, OMDb ve StashDB üzerinde tarama yapın.',
      },
      {
        name: 'Manuel İnce Ayar Yapma',
        text: 'Gerektiğinde başlıkları, sürüm etiketlerini veya bölüm numaralarını geçersiz kılma panelinden düzeltin.',
      },
      {
        name: 'Yeniden Adlandırma veya Olduğu Yerde Düzenleme',
        text: 'Plex/Jellyfin yapısında düzenlemek için Rename, dosyaları mevcut konumunda tutmak için Organize In-Place seçin.',
      },
    ],
  },
  'dashboard': {
    name: 'Kontrol Paneli ile içerikler nasıl keşfedilir ve devam ettirilir',
    description: 'Kaldığınız yerden anında devam etme ve önerilen içerikleri keşfetme rehberi.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'İzlemeye Devam Etme',
        text: 'Oynatmayı tam duraklattığınız yerden sürdürmek için "İzlemeye Devam Et" altındaki içeriğe tıklayın.',
      },
      {
        name: 'Banner ve Akışları İnceleme',
        text: 'Öne çıkan başlıkları, yeni düzenlenen dosyaları ve yüksek puanlı filmleri keşfedin.',
      },
    ],
  },
  'library': {
    name: 'SWAYA medya kataloğunda nasıl gezinilir ve filtreleme yapılır',
    description: 'Koleksiyonunuzu keşfetmek için GPU hızlandırmalı ızgarayı ve gelişmiş filtreleri kullanın.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Görünüm ve Izgara Boyutunu Değiştirme',
        text: 'Afiş ızgarası ile tablo görünümü arasında geçiş yapın ve kart boyutunu ayarlayın.',
      },
      {
        name: 'Filtreleri Uygulama',
        text: 'Doğru medyaya hızlıca ulaşmak için 4K çözünürlük, çıkış yılı, puanlar ve etiketlere göre filtreleyin.',
      },
    ],
  },
  'details': {
    name: 'Film detayları, bölümler ve oyuncu kadrosu nasıl görüntülenir',
    description: '4K arka planları, TV sezonlarını ve oyuncu filmografilerini inceleyin.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Medya Detaylarını Açma',
        text: '4K görselleri, konu özetini ve video akışının teknik parametrelerini görmek için afişe tıklayın.',
      },
      {
        name: 'Oyuncuları ve Yönetmenleri İnceleme',
        text: 'Kütüphanenizde aynı oyuncunun yer aldığı diğer filmleri anında listelemek için oyuncu profiline tıklayın.',
      },
    ],
  },
  'player': {
    name: 'MPV ile 4K HDR video nasıl oynatılır ve altyazılar nasıl ayarlanır',
    description: 'GPU donanım hızlandırma, ses parçaları ve altyazı senkronizasyonu kullanımı.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Oynatmayı Başlatma',
        text: 'Dahili MPV oynatıcıyı başlatmak için herhangi bir videodaki oynat düğmesine tıklayın.',
      },
      {
        name: 'Ses ve Altyazı Değiştirme',
        text: 'Ses parçalarını seçin, altyazı senkronizasyonunu ve yazı tipi boyutunu hassas şekilde ayarlayın.',
      },
    ],
  },
  'search': {
    name: 'Kısayol tuşu (Ctrl+K) ile Evrensel Arama nasıl kullanılır',
    description: 'Yerel kütüphanede ve çevrimiçi veri tabanlarında aynı anda arama yapma.',
    totalTime: 'PT1M',
    steps: [
      {
        name: 'Arama Panelini Açma',
        text: 'Klavyenizden Ctrl+K tuşlarına basın veya arama çubuğuna tıklayın.',
      },
      {
        name: 'Başlıkları ve Kişileri Arama',
        text: 'Eşleşen filmleri, dizileri ve oyuncuları anında bulmak için arama terimini yazın.',
      },
    ],
  },
  'lists': {
    name: 'Özel listeler ve tematik koleksiyonlar nasıl oluşturulur',
    description: 'Otomatik 4 afişli kolaj kapaklarla koleksiyonlar oluşturun.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Yeni Liste Oluşturma',
        text: 'Listeler sekmesine gidin ve özel bir isim ve açıklama ile yeni bir liste oluşturun.',
      },
      {
        name: 'İçerik Ekleme ve Kolaj Kapağı İnceleme',
        text: 'Filmleri ekleyin ve otomatik olarak oluşturulan kolaj kapağı kontrol edin.',
      },
    ],
  },
  'ratings': {
    name: '10 yıldızlı puanlama nasıl yapılır ve Markdown incelemeleri nasıl yazılır',
    description: 'Tamamen gizli yerel puanları ve biçimlendirilmiş incelemeleri kaydedin.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Puan Verme ve Favorilere Ekleme',
        text: '1-10 ölçeğinde yıldız sayısını seçin ve favorilere eklemek için kalp simgesine tıklayın.',
      },
      {
        name: 'Markdown İncelemesi Yazma',
        text: 'İnceleme çekmecesini açın ve Markdown biçimlendirmesiyle özel notlarınızı tutun.',
      },
    ],
  },
  'history': {
    name: 'İzleme geçmişi nasıl görüntülenir ve yönetilir',
    description: 'İzleme zaman çizelgesini takip edin ve izlendi durumunu yönetin.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Geçmişi İnceleme',
        text: 'Geçmiş sekmesinde kronolojik oynatma listesini ve kaldığınız noktaları kontrol edin.',
      },
    ],
  },
  'statistics': {
    name: 'Kütüphane istatistikleri ve disk kullanımı nasıl analiz edilir',
    description: 'Kodekler, türler ve toplam izleme süresi hakkında bilgi edinin.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'İstatistik Panelini Açma',
        text: 'İstatistikler sekmesinde depolama dağılımını, 4K HDR oranını ve tür grafiklerini analiz edin.',
      },
    ],
  },
  'settings': {
    name: 'SWAYA nasıl yapılandırılır ve API anahtarları nasıl girilir',
    description: 'Klasör şablonları, gizli kasa kısayolları ve TMDb/StashDB entegrasyonları.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'API Anahtarlarını Girme',
        text: 'Ayarlar > Scrapers altından otomatik arama için API anahtarlarınızı girin.',
      },
      {
        name: 'İsimlendirme Şablonlarını Özelleştirme',
        text: 'Organization sekmesinden klasör ve dosya adı formatlarını belirleyin.',
      },
    ],
  },
  'torrent': {
    name: 'Otomatik dosya işleme için qBittorrent nasıl bağlanır',
    description: 'Torrent istemci entegrasyonu ve indirme sonrası otomatik tarama.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'WebUI Bağlantısı Kurma',
        text: 'Ayarlar > Torrent altından torrent istemcinizin WebUI erişim bilgilerini girin.',
      },
      {
        name: 'Otomatik İşlemeyi Etkinleştirme',
        text: 'Tamamlanan indirmelerin düzenleyici tarafından otomatik algılanmasını yapılandırın.',
      },
    ],
  },
};
