export const pl = {
  sectionTitles: {
    added: 'Nowe funkcje',
    performance: 'Wydajność & Architektura',
    changed: 'Ulepszenia',
    fixed: 'Poprawki błędów & Szlify',
  },
  releases: {
    '1.1.0': {
      title: "Interaktywna Nawigacja, Przywracanie Przewijania & Automatyczne Migracje Bazy Danych",
      description: "Duża aktualizacja stabilności i interfejsu wprowadzająca interaktywną nawigację na pasku tytułu, przywracanie pozycji przewijania w filmografiach, automatyczne migracje Alembic oraz modułowy system projektowania.",
      highlights: [
              "Interaktywna nawigacja na pasku tytułu z linkiem do pulpitu i przełącznikiem paska bocznego",
              "Niezawodny mechanizm przywracania pozycji przewijania dla stron filmografii twórców",
              "Automatyczne wykonywanie migracji bazy danych Alembic przy starcie aplikacji",
              "Filtrowanie treści dla dorosłych i czyszczenie kategorii w wyszukiwaniu torrentów przez Jackett",
              "Kompleksowa modularyzacja systemu projektowania z ponad 600 komponentami i tokenami CSS"
      ]
    },
    '1.0.0': {
      title: 'Integracja z Torrentami, Rozbudowane Recenzje & Architektura Seriali TV',
      description: 'Główne wydanie wprowadzające pulpity zewnętrznych klientów torrent, wyszukiwanie uniwersalne, panel edycji recenzji, hierarchię sezonów TV oraz zoptymalizowane masowe logi SQL.',
      highlights: [
        'Pulpit zewnętrznych klientów torrent (qBittorrent i Transmission) z monitorem przepustowości',
        'Automatyczne wykrywanie w tle i skanowanie biblioteki po ukończeniu pobierania',
        'Hierarchia sezonów seriali TV i śledzenie postępów oglądania dla każdego odcinka',
        'Zintegrowany widżet odkrywania w bazach TMDb, StashDB i FansDB',
        'Historia operacji zmiany nazw z leniwym ładowaniem szczegółowych logów',
      ],
    },
    '0.7.0': {
      title: 'Akceleracja Sprzętowa GPU & Pamięć Podręczna Filmografii SQLite',
      description: 'Aktualizacja wydajności z podglądami wideo GPU NVENC/QSV, zdalną pamięcią podręczną filmografii i dynamicznym przydzielaniem portów backendu.',
      highlights: [
        'Akcelerowane sprzętowo podglądy wideo FFmpeg z automatycznym wykrywaniem NVENC/QSV/AMF',
        'Lokalna pamięć podręczna SQLite dla filmografii zapewniająca natychmiastowe ładowanie profili aktorów',
        'Automatyczne dynamiczne przydzielanie portu TCP przy uruchomieniu w celu uniknięcia konfliktów',
      ],
    },
    '0.6.0': {
      title: 'Wyszukiwanie Uniwersalne w Wielu Źródłach & Nadzór Procesów',
      description: 'Rozbudowane wyszukiwanie we wszystkich bazach danych oraz niezawodne zarządzanie procesami w tle.',
      highlights: [
        'Skonsolidowane wyszukiwanie filmów, scen, wykonawców i wytwórni',
        'Monitor procesów nadrzędnych zapobiegający pozostawaniu osieroconych zadań w tle',
      ],
    },
  },
};
