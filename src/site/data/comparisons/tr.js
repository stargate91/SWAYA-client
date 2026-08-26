export const tr = {
  filebot: {
    title: 'SWAYA vs FileBot: Modern Medya İstasyonu & Akıllı Toplu Yeniden Adlandırma',
    metaTitle: 'Windows İçin En İyi FileBot Alternatifi - SWAYA Toplu Yeniden Adlandırma & MPV',
    metaDescription: 'Modern bir FileBot alternatifi mi arıyorsunuz? SWAYA; TMDb/StashDB ile dosya isimlerini düzenler, çevrimdışı kütüphane ve 4K MPV oynatıcı sunar.',
    heroTagline: 'Yalnızca dosya adı değiştirmekle kalmayın: arşivinizi 4K kalitesinde yönetin ve izleyin.',
    heroSubtitle: 'FileBot dosya adlandırmada başarılıdır ancak SWAYA yerel medya yönetimini bir üst seviyeye taşır. Sabit disk düzenleme, görsel katalog ve dahili 4K HDR MPV oynatıcı tek bir Windows uygulamasında.',
    competitorPricing: '$6/yıl veya $48 ömür boyu lisans',
    swayaPricing: 'Lansman fiyatı €39 ömür boyu lisans (standart €79)',
    whenToChooseCompetitor: [
      'Yalnızca Linux veya NAS üzerinde komut satırı (CLI) otomasyonu için hafif bir araç arıyorsanız.',
      'Gelişmiş Groovy ifadeleri ve özel otomasyon betikleri yazmak istiyorsanız.',
      'Zaten harici bir medya sunucusu (Plex, Kodi) kullanıyor ve dahili oynatıcıya ihtiyaç duymuyorsanız.',
    ],
    whenToChooseSwaya: [
      'Sabit diskinizdeki dosyaları düzenlemek ve aynı uygulamada doğrudan oynatmak istiyorsanız.',
      'Hem genel filmleri/dizileri (TMDb) hem de yetişkin içerikleri (StashDB, FansDB) yönetmek istiyorsanız.',
      'Dönüştürme (transcoding) olmadan, GPU hızlandırmalı 4K MPV oynatıcı istiyorsanız.',
      'Güvenli prova önizlemesi (dry-run) ve çakışma korumalı modern bir Windows arayüzü arıyorsanız.',
    ],
    matrix: [
      { feature: 'Sabit diskte toplu dosya adlandırma ve klasörleme', swayaNote: 'TMDb, ThePornDB, StashDB, FansDB', competitorNote: 'TheMovieDB, TVmaze, AniDB' },
      { feature: 'Prova önizlemesi (dry-run) & çakışma koruması', swayaNote: 'Akıllı çakışma tespiti ve güvenli değişim', competitorNote: 'Basit önizleme listesi' },
      { feature: 'Dahili 4K/HDR MPV video oynatıcı', swayaNote: 'GPU donanım hızlandırma, anında altyazı ve ses', competitorNote: 'Video oynatıcı yok' },
      { feature: 'Görsel çevrimdışı kütüphane & detay sayfaları', swayaNote: 'Afişler, arka planlar, oyuncular, türler, puanlar', competitorNote: 'Kütüphane arayüzü yok' },
      { feature: 'Yetişkin medya & StashDB desteği', swayaNote: 'Yerel StashDB/FansDB entegrasyonu ve oyuncu profilleri', competitorNote: 'Yalnızca standart medya veri tabanları' },
      { feature: 'PIN kilitli çift mod (SFW / NSFW)', swayaNote: 'Tam veri tabanı ayrımı ve anında gizli kasa', competitorNote: 'Desteklenmiyor' },
      { feature: 'Torrent istemci entegrasyonu (qBittorrent)', swayaNote: 'İndirme sonrası seed korumalı otomatik işleme', competitorNote: 'Yalnızca harici CLI betikleriyle' },
      { feature: '%100 Çevrimdışı & Sunucu gerektirmez', swayaNote: 'Sıfır arka plan hizmeti, sıfır açık port', competitorNote: 'Yerel Java uygulaması' },
      { feature: 'Modern Windows arayüzü (Java gerektirmez)', swayaNote: 'Yıldırım hızında yerel masaüstü uygulaması', competitorNote: 'Java / Swing arayüzü' },
      { feature: 'Sonsuza dek tek seferlik satın alma (Ömür boyu)', swayaNote: 'Lansman €39 / Standart €79', competitorNote: '$48 ömür boyu veya $6/yıl' },
    ],
    deepDives: [
      {
        title: 'Yeniden adlandırmanın ötesinde: eksiksiz bir medya deneyimi',
        description: 'FileBot’un görevi dosya adlandırıldığında biter. SWAYA ise düzenlenen dosyaları afişler, özetler ve oyuncularla dolu zengin bir görsel kütüphaneye dönüştürür.',
      },
      {
        title: 'Dahili 4K HDR MPV oynatıcı motoru',
        description: 'Harici oynatıcılara gerek yok. Yüksek bit hızlı MKV dosyalarını, HDR videoları ve çok dilli sesleri tam GPU donanım hızlandırmasıyla oynatın.',
      },
      {
        title: 'Genel ve yetişkin içeriklerin güvenli yönetimi',
        description: 'Benzersiz çift mod mimarisi sayesinde tüm arşivinizi tek bir uygulamada gizli ve güvenli şekilde yönetebilirsiniz.',
      },
    ],
    faqs: [
      {
        q: 'SWAYA filmler ve animeler için FileBot’un yerini tamamen alabilir mi?',
        a: 'Evet. SWAYA klasörleri tarar, TMDb üzerinden başlıkları eşleştirir ve belirlediğiniz şablona göre dosyaları otomatik yeniden adlandırır.',
      },
      {
        q: 'Düzenleme sırasında torrent dosyalarını seed etmeye devam edebilir miyim?',
        a: 'Evet. "In-Place" modu sayesinde sabit diskinizdeki fiziksel dosya yollarını değiştirmeden sadece meta verileri ve kapakları getirebilirsiniz.',
      },
      {
        q: 'SWAYA’yı çalıştırmak için Java gerekli mi?',
        a: 'Hayır. SWAYA bağımsız bir Windows masaüstü uygulamasıdır ve Java kurulumu gerektirmez.',
      },
    ],
  },
  plex: {
    title: 'SWAYA vs Plex: Windows İçin Sunucusuz %100 Çevrimdışı Medya Merkezi',
    metaTitle: 'Windows İçin Plex Alternatifi (Sunucusuz, %100 Çevrimdışı) - SWAYA',
    metaDescription: 'Sunucu kurulumu gerektirmeyen gizli bir Plex alternatifi mi arıyorsunuz? SWAYA disklerinizi düzenler ve 4K HDR MPV oynatır; hesap yok, bulut yok.',
    heroTagline: 'Sunuculardan, bulut girişlerinden ve telemetriden arınmış kişisel arşiviniz.',
    heroSubtitle: 'Plex ağ üzerinden akışa odaklanır ancak sürekli çalışan bir sunucu, bulut hesapları ve abonelikler gerektirir. SWAYA ise sıfır yapılandırmayla anında %100 yerel deneyim sunar.',
    competitorPricing: 'Ücretsiz / Aylık $4.99 / Ömür boyu $119 (Plex Pass)',
    swayaPricing: 'Lansman fiyatı €39 ömür boyu lisans (standart €79)',
    whenToChooseCompetitor: [
      'Medyaları akıllı televizyonlara, telefonlara aktarmak veya uzaktaki aile üyeleriyle paylaşmak istiyorsanız.',
      'Birden fazla kullanıcı için anlık dönüştürme (transcoding) yapabilen özel bir NAS sunucunuz varsa.',
      'iOS, Android ve Apple TV arasında izleme geçmişini senkronize etmeniz gerekiyorsa.',
    ],
    whenToChooseSwaya: [
      'Medyaları doğrudan Windows bilgisayarınızda veya bağlı monitörünüzde izliyorsanız.',
      '%100 gizlilik talep ediyorsanız (hesap yok, telemetri yok, açık ağ portu yok).',
      'Sabit disklerinizdeki gerçek dosya ve klasörleri fiziksel olarak düzenlemek istiyorsanız.',
      'Dönüştürme gecikmelerinden, takılmalardan ve sunucu bakımından kurtulmak istiyorsanız.',
    ],
    matrix: [
      { feature: '%100 Çevrimdışı & Sıfır sunucu kurulumu', swayaNote: '1 saniyede açılan hızlı uygulama, arka plan servisi yok', competitorNote: 'Plex Media Server’ın sürekli çalışması gerekir' },
      { feature: 'Sabit diskte fiziksel dosya düzenleme', swayaNote: 'Klasörleri ve dosya isimlerini doğrudan düzenler', competitorNote: 'Yalnızca sanal veri tabanı (fiziksel dosyalar dağınık kalır)' },
      { feature: 'Bulut hesabı yok / Tam gizlilik', swayaNote: 'Kayıt zorunluluğu yok, yerel SQLite veri tabanı', competitorNote: 'Zorunlu Plex bulut girişi ve telemetri' },
      { feature: 'Yerel MPV oynatıcı (Dönüştürme yok)', swayaNote: 'Tüm kodekleri orijinal 4K HDR kalitesinde oynatır', competitorNote: 'Sıklıkla kaliteyi düşüren zorunlu sunucu dönüştürmesi' },
      { feature: 'Yetişkin medya (StashDB) & Çift mod', swayaNote: 'Özel mod & StashDB/FansDB desteği', competitorNote: 'Kararsız topluluk eklentileri gerektirir' },
      { feature: 'İnteraktif prova önizlemesi (dry-run)', swayaNote: 'Dosyaları taşımadan önce önizleme ve düzenleme', competitorNote: 'Yalnızca pasif klasör izleme' },
      { feature: 'Torrent entegrasyonu (Seed koruma)', swayaNote: 'qBittorrent / Transmission ile doğrudan bağlantı', competitorNote: 'Dahili entegrasyon yok' },
      { feature: 'Aylık ücret yok (Ömür boyu lisans)', swayaNote: 'Lansman fiyatı €39 tek seferlik ödeme', competitorNote: 'Plex Pass ömür boyu $119 veya $4.99/ay' },
      { feature: 'Kare hassasiyetinde yer imleri & ekran görüntüleri', swayaNote: 'Zaman damgalı ekran görüntüsü almak için Enter’a basın', competitorNote: 'Desteklenmiyor' },
      { feature: 'Uygulama kapatıldığında sıfır kaynak kullanımı', swayaNote: 'Pencere kapatıldığında %0 CPU ve RAM kullanımı', competitorNote: 'Sunucu arka planda sürekli güç tüketir' },
    ],
    deepDives: [
      {
        title: 'Sunucu yükü yok, açık port riski yok',
        description: 'Plex arka planda sürekli çalışan servisler gerektirir. SWAYA ise 1 saniyede açılan ve pencere kapandığında sistem kaynağı tüketmeyen hafif bir masaüstü yazılımıdır.',
      },
      {
        title: 'Sadece sanal bir katman değil, gerçek disk düzeni',
        description: 'Plex dağınık klasörlerin üzerine yalnızca sanal bir arayüz çizer. SWAYA ise doğrudan sabit diskinizdeki dosyaları ve klasörleri düzenler.',
      },
    ],
    faqs: [
      {
        q: 'Plex yerine neden SWAYA tercih edilmeli?',
        a: 'Sunucu kurulumuyla uğraşmazsınız, hesap açmanız gerekmez, 4K videoları takılmadan izlersiniz ve sabit disklerinizdeki dosyaları fiziki olarak düzenlersiniz.',
      },
    ],
  },
  tinymediamanager: {
    title: 'SWAYA vs tinyMediaManager (tmm): Modern Medya Düzenleyici & 4K Oynatıcı',
    metaTitle: 'Windows İçin tinyMediaManager (tmm) Alternatifi - SWAYA',
    metaDescription: 'tinyMediaManager alternatifi mi arıyorsunuz? SWAYA; Java gerektirmeyen modern arayüz, hızlı dosya adlandırma ve 4K MPV oynatıcı sunar.',
    heroTagline: 'Hantal Java araçları yerine — GPU hızlandırmalı modern bir istasyon.',
    heroSubtitle: 'tinyMediaManager güçlü bir NFO oluşturucudur ancak dahili video oynatıcısı yoktur ve arayüzü eskidir. SWAYA; sezgisel yönetim, yeniden adlandırma ve 4K oynatımı tek çatı altında birleştirir.',
    competitorPricing: 'Yıllık €10 (PRO)',
    swayaPricing: 'Lansman fiyatı €39 ömür boyu lisans (standart €79)',
    whenToChooseCompetitor: [
      'Temel amacınız Kodi veya medya sunucuları için karmaşık XML/NFO dosyaları üretmekse.',
      'Java üzerinden Linux ve macOS üzerinde birebir aynı arayüze ihtiyaç duyuyorsanız.',
    ],
    whenToChooseSwaya: [
      'Windows üzerinde akıcı animasyonlara sahip hızlı ve modern bir arayüz istiyorsanız.',
      'Düzenlenen medyaları harici programlara gerek kalmadan doğrudan 4K HDR kalitesinde izlemek istiyorsanız.',
      'Genel içerikleri ve yetişkin medyalarını güvenli ve ayrı yönetmek istiyorsanız.',
    ],
    matrix: [
      { feature: 'Modern arayüz & GPU hızlandırma', swayaNote: 'Akıcı, hızlı masaüstü deneyimi', competitorNote: 'Klasik Java Swing arayüzü' },
      { feature: 'Dahili video oynatıcı', swayaNote: 'MPV 4K HDR GPU hızlandırmalı oynatıcı', competitorNote: 'Video oynatıcı yok' },
      { feature: 'Yetişkin medya (StashDB, FansDB)', swayaNote: 'Özel çift mod ve uzmanlaşmış veri tabanları', competitorNote: 'Dahili destek yok' },
      { feature: 'Lisans modeli', swayaNote: '€39 tek seferlik ömür boyu lisans', competitorNote: '€10/yıl abonelik' },
    ],
    deepDives: [
      {
        title: 'NFO aracından eksiksiz bir medya merkezine',
        description: 'tinyMediaManager öncelikle meta veri dosyalarına odaklanır. SWAYA ise dosya düzenlemeden izlemeye ve incelemelere kadar bağımsız bir çözümdür.',
      },
    ],
    faqs: [
      {
        q: 'SWAYA klasörleri Plex/Jellyfin standartlarına göre düzenleyebilir mi?',
        a: 'Evet. SWAYA dosyaları Plex ve Jellyfin tarafından kabul edilen resmi klasör yapısında otomatik organize eder.',
      },
    ],
  },
  stash: {
    title: 'SWAYA vs StashApp: Özel Medya Merkezi & Masaüstü 4K Oynatıcı',
    metaTitle: 'Windows İçin StashApp Alternatifi (Sunucusuz) - SWAYA',
    metaDescription: 'Yerel web sunucusu gerektirmeyen StashApp alternatifi. SWAYA; StashDB entegrasyonu, oyuncu profilleri, 4K MPV oynatıcı ve gizli kasa sunar.',
    heroTagline: 'Yerel web sunucularına gerek yok: tek bir bağımsız masaüstü yazılımı.',
    heroSubtitle: 'StashApp harika bir açık kaynaklı yazılımdır ancak arka planda yerel bir sunucu çalıştırmayı ve tarayıcı kullanmayı gerektirir. SWAYA ise üstün gizlilik sunan %100 bağımsız bir Windows programıdır.',
    competitorPricing: 'Ücretsiz (Açık Kaynak)',
    swayaPricing: 'Lansman fiyatı €39 ömür boyu lisans (standart €79)',
    whenToChooseCompetitor: [
      'Yazılımı Linux ev sunucusuna kurup ağ üzerinden tarayıcıyla erişmek istiyorsanız.',
      'Kaynak kodunu kendiniz derlemek ve değiştirmek istiyorsanız.',
    ],
    whenToChooseSwaya: [
      'Arka plan servisi olmadan 1 saniyede açılan hızlı bir Windows uygulaması tercih ediyorsanız.',
      'Özel arşivlerinizi anında gizlemek için genel bir kısayol tuşuna ihtiyaç duyuyorsanız.',
      'Filmleri (TMDb) ve yetişkin medyalarını (StashDB) tek bir araçta yönetmek istiyorsanız.',
    ],
    matrix: [
      { feature: 'Yazılım Mimarisi', swayaNote: '%100 bağımsız masaüstü uygulaması (0 sunucu)', competitorNote: 'Yerel web sunucusu + tarayıcı' },
      { feature: 'Çift mod (Ana Akım & Yetişkin)', swayaNote: 'TMDb ve StashDB tek uygulamada', competitorNote: 'Yalnızca yetişkin içerik' },
      { feature: 'Gizli Kasa', swayaNote: 'Kısayol (Ctrl+Alt+H/Esc) ile anında gizleme', competitorNote: 'Yalnızca şifre koruması' },
      { feature: 'Dahili oynatıcı performansı', swayaNote: 'GPU hızlandırmalı yerel MPV oynatıcı', competitorNote: 'Tarayıcı içi standart HTML5 oynatıcı' },
    ],
    deepDives: [
      {
        title: 'Sunucusuz masaüstünde mutlak gizlilik',
        description: 'SWAYA ile tarayıcı açmanıza veya port yönetmenize gerek kalmaz. Tüm içerikleriniz Windows masaüstü ortamında tamamen izole ve güvende kalır.',
      },
    ],
    faqs: [
      {
        q: 'StashDB API anahtarımı SWAYA’da kullanabilir miyim?',
        a: 'Evet. Ayarlar altındaki Scrapers sekmesinden StashDB, FansDB ve ThePornDB API anahtarlarınızı girebilirsiniz.',
      },
    ],
  },
  jellyfin: {
    title: 'SWAYA vs Jellyfin: Windows İçin %100 Çevrimdışı Medya Merkezi',
    metaTitle: 'Windows İçin Jellyfin Alternatifi (Çevrimdışı Odaklı) - SWAYA',
    metaDescription: 'Sunucusuz Jellyfin alternatifi. Sabit diskleri düzenleyin, çevrimdışı kataloğu tarayın ve 4K HDR MPV kalitesinin tadını çıkarın.',
    heroTagline: 'Akış sunucuları yerine — kişisel bilgisayarınız için en iyi çevrimdışı deneyim.',
    heroSubtitle: 'Jellyfin harika bir akış sunucusudur ancak bilgisayar başında video izleyen kullanıcılar için gereksiz karmaşıklık yaratır. SWAYA doğrudan yerel oynatım için optimize edilmiştir.',
    competitorPricing: 'Ücretsiz (Açık Kaynak)',
    swayaPricing: 'Lansman fiyatı €39 ömür boyu lisans (standart €79)',
    whenToChooseCompetitor: [
      'Ev ağınızdaki televizyonlara veya mobil cihazlara medya akışı yapmak istiyorsanız.',
      'Kütüphanenizi evdeki birden fazla kişiyle paylaşıyorsanız.',
    ],
    whenToChooseSwaya: [
      'Filmleri ve dizileri doğrudan bilgisayarınızda veya bağlı ekranda en yüksek kalitede izliyorsanız.',
      'Sabit disklerinizdeki fiziksel dosya isimlerini düzenlemek istiyorsanız.',
      'Sunucu bakımı ve ağ ayarlarıyla vakit kaybetmek istemiyorsanız.',
    ],
    matrix: [
      { feature: 'Kullanım Amacı', swayaNote: 'Bağımsız çevrimdışı masaüstü uygulaması', competitorNote: 'İstemci-sunucu akış platformu' },
      { feature: 'Dosya Yeniden Adlandırma', swayaNote: 'TMDb tabanlı otomatik toplu düzenleyici', competitorNote: 'Dosya yeniden adlandırma özelliği yok' },
      { feature: 'Oynatma Kalitesi', swayaNote: 'GPU hızlandırmalı doğrudan MPV oynatımı', competitorNote: 'Ağ bant genişliğine ve dönüştürmeye bağlı' },
    ],
    deepDives: [
      {
        title: 'Masaüstü bilgisayar kullanıcıları için optimize edildi',
        description: 'Medyaları doğrudan monitörünüzde izlerken, doğrudan GPU erişimine sahip yerel bir masaüstü uygulaması web tabanlı akış sunucularından çok daha hızlı ve stabildir.',
      },
    ],
    faqs: [
      {
        q: 'SWAYA tarafından düzenlenen klasörler Jellyfin’de çalışır mı?',
        a: 'Evet. SWAYA resmi Plex/Jellyfin klasör yapısını kullanır, bu sayede %100 tam uyumluluk sağlanır.',
      },
    ],
  },
  kodi: {
    title: 'SWAYA vs Kodi: Windows İçin Modern Medya Merkezi & Dosya Düzenleyici',
    metaTitle: 'Windows İçin Kodi Alternatifi - SWAYA Medya Merkezi',
    metaDescription: 'TV arayüzü yerine fare ve klavyeye göre tasarlanmış modern bir medya merkezi mi arıyorsunuz? SWAYA masaüstü için optimize edilmiştir.',
    heroTagline: 'Uzaktan kumanda arayüzü yerine — fare ve klavye için modern bir istasyon.',
    heroSubtitle: 'Kodi televizyon ekranları ve uzaktan kumandalar için tasarlanmıştır, bu da bilgisayarda kullanışsız olabilir. SWAYA masaüstü kullanıcıları için modern ve akıcı bir ortam sunar.',
    competitorPricing: 'Ücretsiz (Açık Kaynak)',
    swayaPricing: 'Lansman fiyatı €39 ömür boyu lisans (standart €79)',
    whenToChooseCompetitor: [
      'Televizyona bağlı bir Raspberry Pi veya HTPC cihazını uzaktan kumandayla yönetiyorsanız.',
      'Topluluk tarafından geliştirilen çok sayıda eklenti ve özel tema kurmak istiyorsanız.',
    ],
    whenToChooseSwaya: [
      'Bilgisayar başında fare ve klavye kullanıyor, hızlı ve sade bir arayüz istiyorsanız.',
      'Dosyaları toplu yeniden adlandırmak ve aynı uygulamada 4K MPV izlemek istiyorsanız.',
    ],
    matrix: [
      { feature: 'Kullanıcı Arayüzü', swayaNote: 'Fare ve klavye için özel optimize edilmiş', competitorNote: '10-foot TV uzaktan kumanda arayüzü' },
      { feature: 'Fiziksel Dosya Adlandırma', swayaNote: 'Dahili akıllı toplu düzenleyici', competitorNote: 'Dosya yönetimi özelliği yok' },
      { feature: 'Kurulum Kolaylığı', swayaNote: 'Kurulumdan sonra 1 saniyede kullanıma hazır', competitorNote: 'Karmaşık eklenti ve tarayıcı ayarları' },
    ],
    deepDives: [
      {
        title: 'Masaüstü gücünü kullananlar için geliştirildi',
        description: 'Karmaşık TV menülerinde kaybolmak yerine akıcı kaydırma, kısayol tuşları ve sürükle-bırak kolaylığından yararlanın.',
      },
    ],
    faqs: [
      {
        q: 'SWAYA’nın kurulumu Kodi’den daha mı kolay?',
        a: 'Evet. SWAYA karmaşık eklentiler veya XML yapılandırmaları gerektirmez, kurulduğu anda doğrudan çalışır.',
      },
    ],
  },
};
