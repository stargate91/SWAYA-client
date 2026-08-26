export const pl = {
  'getting-started': {
    name: 'Jak zainstalować i skonfigurować centrum multimedialne SWAYA',
    description: 'Instrukcja krok po kroku instalacji w systemach Windows i Linux, wyboru folderów i tworzenia biblioteki offline.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Pobranie i Instalacja',
        text: 'Zainstaluj i uruchom aplikację desktopową SWAYA w systemie Windows lub Linux.',
      },
      {
        name: 'Wybór Katalogów Przechowywania',
        text: 'W ustawieniach wskaż foldery pobrań oraz docelowe foldery biblioteki multimediów.',
      },
      {
        name: 'Skanowanie i Dopasowywanie Mediów',
        text: 'Otwórz Organizer, aby przeskanować pliki i automatycznie pobrać metadane oraz plakaty.',
      },
    ],
  },
  'organizer': {
    name: 'Jak automatycznie masowo zmieniać nazwy i porządkować pliki',
    description: 'Automatyczne dopasowywanie do TMDb i StashDB w celu bezpiecznego porządkowania plików bez duplikatów.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Wybór Folderu Źródłowego',
        text: 'Otwórz Organizer SWAYA i wskaż folder z nieuporządkowanymi pobranymi plikami.',
      },
      {
        name: 'Automatyczne Dopasowanie Metadanych',
        text: 'Przeskanuj bazy TMDb, OMDb i StashDB, aby automatycznie rozpoznać tytuły filmów i seriali.',
      },
      {
        name: 'Ręczne Dostosowanie Dopasowań',
        text: 'W razie potrzeby skoryguj tytuły, tagi edycji lub numery odcinków w oknie nadpisywania.',
      },
      {
        name: 'Zmiana Nazw lub Organizacja In-Place',
        text: 'Wybierz Rename, aby ułożyć strukturę folderów wg Plex/Jellyfin, lub Organize In-Place, aby pozostawić pliki w dotychczasowych lokalizacjach.',
      },
    ],
  },
  'dashboard': {
    name: 'Jak korzystać z Panelu Głównego do wznawiania i odkrywania',
    description: 'Błyskawiczne wznawianie odtwarzania i przeglądanie rekomendowanych mediów.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Kontynuacja Oglądania',
        text: 'Kliknij pozycję na półce "Kontynuuj oglądanie", aby wznowić odtwarzanie od dokładnego momentu zatrzymania.',
      },
      {
        name: 'Przeglądanie Banerów i Kanałów Odkryć',
        text: 'Odkrywaj wyróżnione banery, ostatnio uporządkowane pliki oraz najwyżej oceniane filmy.',
      },
    ],
  },
  'library': {
    name: 'Jak przeglądać i filtrować katalog multimediów w SWAYA',
    description: 'Wykorzystaj siatkę akcelerowaną przez GPU i filtry wielowymiarowe do przeglądania kolekcji.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Zmiana Widoku i Rozmiaru Siatki',
        text: 'Przełączaj między siatką plakatów a widokiem tabeli i dostosowuj rozmiar kart.',
      },
      {
        name: 'Stosowanie Filtrów',
        text: 'Filtruj według rozdzielczości 4K, roku premiery, ocen i tagów, aby szybko znaleźć pożądane media.',
      },
    ],
  },
  'details': {
    name: 'Jak przeglądać szczegóły filmów, odcinki i obsadę',
    description: 'Wybór grafik tła, przeglądanie sezonów i sprawdzanie filmografii aktorów.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Otwarcie Szczegółów Mediów',
        text: 'Kliknij plakat, aby zobaczyć tła 4K, opis fabuły oraz parametry techniczne strumienia wideo.',
      },
      {
        name: 'Przeglądanie Obsady i Twórców',
        text: 'Kliknij profil aktora, aby natychmiast zobaczyć inne filmy z jego udziałem w Twojej bibliotece.',
      },
    ],
  },
  'player': {
    name: 'Jak odtwarzać wideo 4K HDR i konfigurować napisy w MPV',
    description: 'Wykorzystanie akceleracji sprzętowej GPU, ścieżek audio i synchronizacji napisów.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Rozpoczęcie Odtwarzania',
        text: 'Kliknij przycisk odtwarzania przy dowolnym wideo, aby uruchomić wbudowany odtwarzacz MPV.',
      },
      {
        name: 'Przełączanie Audio i Napisów',
        text: 'Wybieraj ścieżki dźwiękowe i precyzyjnie dostosowuj synchronizację oraz rozmiar napisów.',
      },
    ],
  },
  'search': {
    name: 'Jak używać Wyszukiwania Uniwersalnego ze skrótem (Ctrl+K)',
    description: 'Jednoczesne przeszukiwanie lokalnej biblioteki i baz online.',
    totalTime: 'PT1M',
    steps: [
      {
        name: 'Otwarcie Okna Wyszukiwania',
        text: 'Naciśnij Ctrl+K na klawiaturze lub kliknij pasek wyszukiwania.',
      },
      {
        name: 'Wyszukiwanie Tytułów i Osób',
        text: 'Wpisz zapytanie, aby błyskawicznie znaleźć pasujące filmy, seriale i aktorów.',
      },
    ],
  },
  'lists': {
    name: 'Jak tworzyć niestandardowe listy i kolekcje tematyczne',
    description: 'Tworzenie kolekcji z automatycznymi okładkami kolażowymi z 4 plakatów.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Tworzenie Nowej Listy',
        text: 'Przejdź do zakładki Listy i utwórz nową kolekcję z własną nazwą i opisem.',
      },
      {
        name: 'Dodawanie Pozycji i Podgląd Kolażu',
        text: 'Dodawaj filmy i sprawdź dynamicznie wygenerowaną okładkę kolażową.',
      },
    ],
  },
  'ratings': {
    name: 'Jak wystawiać 10-gwiazdkowe oceny i pisać recenzje markdown',
    description: 'Zapisywanie w pełni prywatnych ocen i sformatowanych recenzji.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Wystawienie Oceny i Dodanie do Ulubionych',
        text: 'Wybierz liczbę gwiazdek w skali 1-10 i kliknij ikonę serca, aby dodać do ulubionych.',
      },
      {
        name: 'Tworzenie Recenzji w Markdown',
        text: 'Otwórz panel recenzji i zapisz prywatne notatki z formatowaniem Markdown.',
      },
    ],
  },
  'history': {
    name: 'Jak przeglądać i zarządzać historią oglądania',
    description: 'Śledzenie osi czasu odtwarzania i zarządzanie statusem obejrzenia.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Przeglądanie Historii',
        text: 'W zakładce Historia sprawdzaj chronologiczną listę odtworzeń oraz punkty wznowienia.',
      },
    ],
  },
  'statistics': {
    name: 'Jak analizować statystyki biblioteki i wykorzystanie dysków',
    description: 'Wgląd w kodeki, gatunki i całkowity czas oglądania.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Otwarcie Pulpitu Statystyk',
        text: 'W zakładce Statystyki analizuj wykresy pamięci masowej, udział 4K HDR i ulubione gatunki.',
      },
    ],
  },
  'settings': {
    name: 'Jak skonfigurować SWAYA i wprowadzić klucze API',
    description: 'Szablony struktur folderów, skróty sejfu prywatności i integracje TMDb/StashDB.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Wprowadzenie Kluczy API',
        text: 'W Ustawienia > Scrapers podaj klucze API dla automatycznego wyszukiwania.',
      },
      {
        name: 'Dostosowanie Szablonu Nazw',
        text: 'W zakładce Organization określ preferowany format folderów i nazw plików.',
      },
    ],
  },
  'torrent': {
    name: 'Jak połączyć qBittorrent w celu automatycznego przetwarzania',
    description: 'Integracja z klientem torrent i automatyczne skanowanie po zakończeniu pobierania.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Połączenie z WebUI',
        text: 'W Ustawienia > Torrent wprowadź dane dostępowe do WebUI swojego klienta torrent.',
      },
      {
        name: 'Włączenie Automatycznego Przetwarzania',
        text: 'Skonfiguruj automatyczne wykrywanie ukończonych pobrań przez organizer.',
      },
    ],
  },
};
