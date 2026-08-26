export const es = {
  filebot: {
    title: 'SWAYA vs FileBot: Estación Multimedia Moderna & Renombrador de Archivos',
    metaTitle: 'Alternativa a FileBot para Windows - SWAYA Batch Renamer & Reproductor MPV',
    metaDescription: '¿Buscas una alternativa moderna a FileBot? SWAYA renombra archivos en disco con TMDb y StashDB, incluye biblioteca offline y reproductor 4K MPV.',
    heroTagline: '¿Por qué solo renombrar archivos cuando puedes organizar y reproducir toda tu colección?',
    heroSubtitle: 'FileBot es genial para renombrar archivos, pero SWAYA lleva tus medios locales al siguiente nivel: organización en disco, biblioteca offline y reproductor 4K HDR MPV integrado en una app moderna para Windows.',
    competitorPricing: '$6/año o $48 licencia de por vida',
    swayaPricing: '€39 oferta de lanzamiento (€79 regular)',
    whenToChooseCompetitor: [
      'Solo necesitas una herramienta de línea de comandos (CLI) para Linux headless o scripts en NAS.',
      'Escribes expresiones personalizadas en Groovy y hooks de automatización.',
      'Ya usas un media center separado (como Plex o Kodi) y no quieres un reproductor integrado.',
    ],
    whenToChooseSwaya: [
      'Quieres una solución de escritorio todo en uno: renombrar en disco Y reproducir al instante en la biblioteca.',
      'Gestionas tanto películas/series convencionales (TMDb) como escenas para adultos (StashDB, FansDB, ThePornDB).',
      'Quieres un reproductor MPV con aceleración por hardware, reanudación exacta y cero transcodificación.',
      'Prefieres una interfaz moderna de Windows con simulación segura y protección contra colisiones.',
    ],
    matrix: [
      { feature: 'Renombrado físico de archivos en disco', swayaNote: 'TMDb, ThePornDB, StashDB, FansDB', competitorNote: 'TheMovieDB, TVmaze, AniDB' },
      { feature: 'Previsualización y protección contra colisiones', swayaNote: 'Detección inteligente de colisiones y reemplazo', competitorNote: 'Lista de vista previa simple' },
      { feature: 'Reproductor de video 4K/HDR MPV integrado', swayaNote: 'Aceleración por hardware, sincronización de audio y subtítulos', competitorNote: 'Sin reproductor integrado' },
      { feature: 'Biblioteca offline visual y páginas de detalle', swayaNote: 'Pósteres, fondos, reparto, géneros, calificaciones', competitorNote: 'Sin interfaz de biblioteca' },
      { feature: 'Medios para adultos y soporte StashDB', swayaNote: 'Integración nativa StashDB, FansDB e índice de actores', competitorNote: 'Solo bases de datos convencionales' },
      { feature: 'Modo Dual (SFW / NSFW) con PIN', swayaNote: 'Aislamiento total de base de datos y bloqueo', competitorNote: 'No disponible' },
      { feature: 'Importación automática de torrents (qBittorrent)', swayaNote: 'Integración nativa y seeding en el lugar', competitorNote: 'Solo mediante scripts CLI' },
      { feature: '100% Offline y sin servidor (0 demonios)', swayaNote: 'Sin servicios en segundo plano ni puertos abiertos', competitorNote: 'Aplicación Java local' },
      { feature: 'Interfaz moderna para Windows (Sin Java)', swayaNote: 'Aplicación de escritorio nativa', competitorNote: 'Interfaz Java / Swing' },
      { feature: 'Licencia de por vida en pago único', swayaNote: '€39 lanzamiento / €79 de por vida', competitorNote: '$48 de por vida o $6/año' },
    ],
    deepDives: [
      {
        title: 'Más que un simple renombrado: un universo multimedia completo',
        description: 'FileBot se detiene una vez renombrados los archivos. SWAYA transforma al instante tus archivos en una rica biblioteca visual con pósteres, biografías de actores, sinopsis de episodios y filtros personalizados.',
      },
      {
        title: 'Reproductor 4K HDR MPV integrado',
        description: 'No necesitas reproductores externos. Haz clic en cualquier video en SWAYA para reproducir al instante archivos MKV pesados, HDR y Dolby Atmos con aceleración total de la GPU.',
      },
      {
        title: 'Medios convencionales y para adultos en un solo lugar',
        description: 'SWAYA es la primera estación multimedia con arquitectura Dual-Mode: gestiona películas con TMDb y escenas con StashDB, protegidas tras un PIN opcional.',
      },
    ],
    faqs: [
      {
        q: '¿Puede SWAYA sustituir a FileBot para renombrar películas y series?',
        a: 'Sí. SWAYA analiza tus carpetas de descarga, empareja títulos mediante TMDb, permite ajustes interactivos y renombra físicamente los archivos en tu estructura personalizada.',
      },
      {
        q: '¿SWAYA permite seguir compartiendo torrents mientras organiza?',
        a: 'Sí. El modo "Organizar en el lugar" recopila todos los metadatos y pósteres para la biblioteca dejando los archivos y carpetas intactos en el disco para seeding continuo.',
      },
      {
        q: '¿Es necesario tener Java instalado para ejecutar SWAYA?',
        a: 'No. SWAYA es una aplicación de escritorio nativa y autónoma para Windows que no requiere Java ni entornos externos.',
      },
    ],
  },
  plex: {
    title: 'SWAYA vs Plex: Estación Multimedia 100% Offline Sin Servidores',
    metaTitle: 'Alternativa a Plex para Windows Sin Servidor - SWAYA',
    metaDescription: '¿Buscas una alternativa privada a Plex sin servidores? SWAYA organiza archivos en disco, reproduce 4K HDR vía MPV y no requiere cuentas online.',
    heroTagline: 'Tu colección personal sin servidores, cuentas en la nube ni telemetría.',
    heroSubtitle: 'Plex fue creado para streaming en red local pero requiere demonios activos continuamente y cuentas online. SWAYA ofrece una experiencia de escritorio directa y 100% offline en tu PC.',
    competitorPricing: 'Gratis / $4.99/mes / $119 de por vida (Plex Pass)',
    swayaPricing: '€39 oferta de lanzamiento (€79 regular)',
    whenToChooseCompetitor: [
      'Quieres transmitir medios a Smart TVs, teléfonos y compartir con familiares fuera de casa.',
      'Tienes un NAS dedicado o servidor casero con transcodificación multiusuario.',
      'Necesitas sincronización remota entre dispositivos iOS, Android y Apple TV.',
    ],
    whenToChooseSwaya: [
      'Ves películas y series directamente en tu ordenador o monitor con Windows & Linux.',
      'Quieres 100% de privacidad: cero cuentas en la nube, cero telemetría y cero puertos abiertos.',
      'Quieres que los archivos reales en tu disco duro queden renombrados y organizados.',
      'No quieres lidiar con configuraciones de servidor ni fallos de transcodificación.',
    ],
    matrix: [
      { feature: '100% Offline y cero configuración de servidor', swayaNote: 'App de escritorio directa, sin demonios', competitorNote: 'Requiere servidor Plex Media Server' },
      { feature: 'Renombrado y organización física de archivos', swayaNote: 'Renombra archivos reales en disco', competitorNote: 'Solo base de datos virtual' },
      { feature: 'Sin cuentas en la nube / Privacidad total', swayaNote: 'Sin login, base SQLite local', competitorNote: 'Autenticación online obligatoria' },
      { feature: 'Reproductor MPV nativo (Sin transcodificación)', swayaNote: 'Reproduce cualquier codec en 4K HDR', competitorNote: 'Frecuentemente transcodifica videos' },
      { feature: 'Medios para adultos (StashDB) y Modo Dual', swayaNote: 'Modo adulto dedicado & StashDB/FansDB', competitorNote: 'Requiere plugins inestables de terceros' },
      { feature: 'Organizador interactivo con simulación previa', swayaNote: 'Verificación y edición antes de mover', competitorNote: 'Solo escaneo pasivo de carpetas' },
      { feature: 'Integración con torrents (Importación en el lugar)', swayaNote: 'Integración directa con qBittorrent', competitorNote: 'No soportado nativamente' },
      { feature: 'Precio único de por vida (Sin cuotas mensuales)', swayaNote: '€39 lanzamiento pago único', competitorNote: '$119 de por vida o $4.99/mes' },
      { feature: 'Marcadores exactos de momentos favoritos', swayaNote: 'Captura y timestamp con la tecla Enter', competitorNote: 'No disponible' },
      { feature: 'Cero consumo de CPU/RAM en segundo plano', swayaNote: 'Nada queda abierto tras cerrar el programa', competitorNote: 'El servidor corre siempre en segundo plano' },
    ],
    deepDives: [
      {
        title: 'Cero servidores en segundo plano, cero puertos abiertos',
        description: 'Plex requiere servicios activos de forma continua. SWAYA es una aplicación ligera: al cerrarla, no queda ningún proceso activo.',
      },
      {
        title: 'Organización real en disco vs bibliotecas virtuales',
        description: 'Plex solo coloca metadatos sobre carpetas desordenadas. SWAYA limpia, renombra y estructura físicamente los archivos en tus discos.',
      },
      {
        title: 'Reproductor MPV nativo sin problemas de transcodificación',
        description: 'Olvídate de tirones al reproducir 4K HDR o subtítulos PGS: el motor MPV integrado en SWAYA lo reproduce todo con aceleración fluida por GPU.',
      },
    ],
    faqs: [
      {
        q: '¿Puedo usar SWAYA sin conexión a Internet?',
        a: '¡Sí! SWAYA funciona 100% offline. Tras descargar metadatos y pósteres, no se requiere ninguna conexión activa para explorar o ver contenido.',
      },
      {
        q: '¿SWAYA transmite a Smart TVs como Plex?',
        a: 'SWAYA está diseñado como una estación de trabajo para PC y portátiles, sin servidor de streaming para televisores.',
      },
      {
        q: '¿SWAYA recopila datos de uso o exige registro?',
        a: 'No. SWAYA no requiere cuentas online ni transmite telemetría. Todos tus datos permanecen exclusivamente en tu ordenador.',
      },
    ],
  },
  tinymediamanager: {
    title: 'SWAYA vs tinyMediaManager: Gestión Multimedia & Reproductor de Escritorio',
    metaTitle: 'Alternativa a tinyMediaManager para Windows - SWAYA',
    metaDescription: '¿Buscas una alternativa a tinyMediaManager? SWAYA ofrece renombrado por lotes, scraping TMDb/StashDB y reproductor 4K MPV sin Java.',
    heroTagline: 'Organiza y disfruta de tus medios sin pesadas interfaces Java.',
    heroSubtitle: 'tinyMediaManager es un buen generador de NFOs pero requiere Java y carece de reproductor integrado. SWAYA combina renombrado en disco, biblioteca visual y reproductor 4K MPV.',
    competitorPricing: '€15/año (v4/v5 Pro)',
    swayaPricing: '€39 oferta de lanzamiento (€79 regular)',
    whenToChooseCompetitor: [
      'Necesitas archivos .NFO detallados para alimentar una configuración existente de Kodi.',
      'Gestionas medios simultáneamente en macOS, Linux y Windows.',
      'Requieres edición avanzada de etiquetas XML/NFO.',
    ],
    whenToChooseSwaya: [
      'Quieres una aplicación moderna y rápida para Windows sin instalar Java.',
      'Quieres un flujo unificado: organizar, explorar y ver en un solo clic.',
      'Gestionas medios para adultos (StashDB, FansDB) junto con películas y series.',
      'Prefieres una licencia de por vida en lugar de una suscripción anual.',
    ],
    matrix: [
      { feature: 'Renombrado en disco y estructura de carpetas', swayaNote: 'Plantillas inteligentes y protección anti-colisiones', competitorNote: 'Renombrador basado en patrones' },
      { feature: 'Reproductor de video con aceleración por hardware', swayaNote: 'Reproductor nativo 4K HDR MPV', competitorNote: 'Sin motor de reproducción integrado' },
      { feature: 'Scrapers de medios para adultos (StashDB / FansDB)', swayaNote: 'Scrapers dedicados e índice de actores', competitorNote: 'No soportado' },
      { feature: 'Modo Dual con protección por PIN', swayaNote: 'Base de datos aislada y bloqueo rápido', competitorNote: 'Sin modo de privacidad' },
      { feature: 'Interfaz de escritorio moderna (Sin Java)', swayaNote: 'App nativa ligera y rápida', competitorNote: 'Interfaz Java Swing' },
      { feature: 'Ventanas interactivas de coincidencia y edición', swayaNote: 'Búsqueda rápida, selector de episodios & tags', competitorNote: 'Diálogos de scraper' },
      { feature: 'Integración con torrents (Mantener seeding)', swayaNote: 'Importación en el lugar y conservación de seeds', competitorNote: 'No disponible' },
      { feature: 'Historial de reproducción y registro de momentos', swayaNote: 'Estadísticas detalladas, timestamps y capturas', competitorNote: 'Marcas básicas de visto' },
      { feature: 'Modelo de licencia', swayaNote: 'Pago único de por vida (€39)', competitorNote: 'Suscripción anual de €15/año' },
    ],
    deepDives: [
      {
        title: 'Todo en uno: organizar, explorar y reproducir',
        description: 'Con tinyMediaManager tienes que alternar constantemente entre tMM y un reproductor externo. SWAYA ofrece un espacio de trabajo unificado y elegante.',
      },
      {
        title: 'Pago único de por vida vs suscripciones anuales',
        description: 'tMM v4/v5 requiere una cuota anual para scrapers online. SWAYA se adquiere una sola vez con todas las actualizaciones futuras incluidas.',
      },
      {
        title: 'Scraping completo convencional y para adultos',
        description: 'Mientras que tMM se limita a películas y series, SWAYA incluye compatibilidad nativa con StashDB y FansDB.',
      },
    ],
    faqs: [
      {
        q: '¿SWAYA genera archivos compatibles con Kodi/Jellyfin?',
        a: 'SWAYA organiza tus carpetas y archivos siguiendo las convenciones universales Plex/Jellyfin/Kodi, garantizando compatibilidad con otros programas.',
      },
      {
        q: '¿SWAYA se abre más rápido que las aplicaciones Java?',
        a: 'Sí. SWAYA se abre al instante con un consumo mínimo de memoria, sin los retrasos de la Máquina Virtual Java.',
      },
    ],
  },
  stash: {
    title: 'SWAYA vs StashApp: Estación de Escritorio Sin Servidor Web',
    metaTitle: 'Alternativa a StashApp para Windows - SWAYA Desktop Organizer',
    metaDescription: '¿Buscas una alternativa nativa a StashApp en Windows? SWAYA reúne StashDB, renombrado en disco y reproductor MPV sin servidores.',
    heroTagline: 'La estación multimedia privada definitiva sin servidores localhost ni Docker.',
    heroSubtitle: 'Stash es un excelente servidor web para medios de adultos en navegador. SWAYA es una app nativa para Windows compatible con TMDb y StashDB con reproductor MPV integrado.',
    competitorPricing: 'Gratis / Open Source',
    swayaPricing: '€39 oferta de lanzamiento (€79 regular)',
    whenToChooseCompetitor: [
      'Gestionas un servidor Linux o Docker para acceso en red local.',
      'Utilizas plugins comunitarios específicos.',
      'Buscas una app web accesible exclusivamente desde el navegador.',
    ],
    whenToChooseSwaya: [
      'Quieres una única app de escritorio sin servidores web en segundo plano (`localhost:9999`).',
      'Quieres películas convencionales (TMDb) y escenas para adultos (StashDB) en una sola app.',
      'Quieres renombrar y estructurar archivos físicos en disco con protección anti-colisiones.',
      'Quieres un reproductor MPV con aceleración GPU sin los límites de los navegadores.',
    ],
    matrix: [
      { feature: 'App de escritorio nativa (Sin servidor localhost)', swayaNote: 'Ejecutable único, 0 demonios en segundo plano', competitorNote: 'Ejecuta servidor Go en localhost:9999' },
      { feature: 'Renombrado y organización de archivos en disco', swayaNote: 'Renombra y mueve archivos reales', competitorNote: 'Deja los archivos intactos en carpetas' },
      { feature: 'Modo Dual: Convencional (TMDb) + Adultos (StashDB)', swayaNote: 'Cambio instantáneo entre perfiles SFW y NSFW', competitorNote: 'Solo medios para adultos' },
      { feature: 'Reproductor 4K MPV nativo con aceleración GPU', swayaNote: 'Reproduce cualquier codec con fluidez total', competitorNote: 'Reproductor HTML5 en navegador' },
      { feature: 'Tablas interactivas de coincidencia y edición', swayaNote: 'Simulación segura con acciones en lote', competitorNote: 'Interfaz tagger' },
      { feature: 'Perfiles de actores, sellos de estudio y tags', swayaNote: 'Perfiles ricos y galerías de fotos', competitorNote: 'Base de datos de actores' },
      { feature: 'Registro de momentos clave y capturas', swayaNote: 'Captura y timestamp con la tecla Enter', competitorNote: 'Marcadores de escenas' },
      { feature: 'Bloqueo de privacidad con PIN', swayaNote: 'Bloqueo instantáneo y base de adultos oculta', competitorNote: 'Plugin de autenticación básica' },
      { feature: 'Integración con torrents (qBittorrent)', swayaNote: 'Sincronización directa y soporte de seeding', competitorNote: 'Solo mediante scripts externos' },
    ],
    deepDives: [
      {
        title: 'Reproductor MPV nativo vs limitaciones de codecs de navegador',
        description: 'Stash usa HTML5 en el navegador, necesitando transcodificación para videos pesados 4K HEVC 10-bit. El reproductor MPV de SWAYA corre cualquier formato sin esfuerzo en la CPU.',
      },
      {
        title: 'Biblioteca unificada para todos tus contenidos',
        description: 'No más programas separados: SWAYA ofrece alternancia instantánea entre los modos General y Adulto con aislamiento total de datos.',
      },
      {
        title: 'Organización real de archivos en tus discos',
        description: 'A diferencia de Stash, que solo registra archivos en su base, SWAYA renombra y organiza tus descargas en carpetas ordenadas en tu disco.',
      },
    ],
    faqs: [
      {
        q: '¿SWAYA busca datos directamente en StashDB?',
        a: '¡Sí! Solo introduce tu clave de API de StashDB en los Ajustes y SWAYA identificará automáticamente títulos, actores, estudios y portadas HD.',
      },
      {
        q: '¿Cómo protege SWAYA la privacidad de medios para adultos?',
        a: 'SWAYA incluye un bloqueo por PIN: cuando está activo, el perfil de adultos permanece 100% invisible hasta introducir tu código.',
      },
    ],
  },
  jellyfin: {
    title: 'SWAYA vs Jellyfin: Estación de Escritorio vs Servidor Doméstico',
    metaTitle: 'Alternativa a Jellyfin para Windows Sin Servidor - SWAYA',
    metaDescription: '¿Buscas una alternativa sencilla a Jellyfin para PC? SWAYA organiza archivos en disco y reproduce 4K HDR vía MPV sin configuraciones de red.',
    heroTagline: 'Tu colección en disco sin contenedores Docker ni servidores.',
    heroSubtitle: 'Jellyfin es un excelente servidor de streaming doméstico. Pero si solo deseas gestionar y ver medios en tu PC, SWAYA ofrece una solución de escritorio directa.',
    competitorPricing: 'Gratis / Open Source (FOSS)',
    swayaPricing: '€39 oferta de lanzamiento (€79 regular)',
    whenToChooseCompetitor: [
      'Quieres transmitir medios a Smart TVs y móviles en todo el hogar.',
      'Mantienes un servidor Linux/Docker con múltiples usuarios.',
      'Priorizas software de servidor estrictamente open-source.',
    ],
    whenToChooseSwaya: [
      'Ves películas y organizas descargas directamente en tu PC con Windows & Linux.',
      'No quieres abrir puertos de red ni configurar demonios o perfiles de transcodificación.',
      'Quieres renombrado real de archivos y reproducción fluida en 4K con MPV.',
      'Quieres soporte integrado de StashDB junto a tus películas habituales.',
    ],
    matrix: [
      { feature: 'Cero configuración y mantenimiento de servidores', swayaNote: 'Inicia al instante, sin demonios', competitorNote: 'Instalación de servidor obligatoria' },
      { feature: 'Renombrado y organización física de archivos', swayaNote: 'Movimiento y estructura reales en disco', competitorNote: 'Biblioteca virtual de solo lectura' },
      { feature: 'Reproductor MPV 4K HDR integrado', swayaNote: 'Aceleración nativa por GPU sin retrasos', competitorNote: 'Clientes web/HTML5 o wrappers' },
      { feature: 'Medios para adultos (StashDB) y Modo Dual', swayaNote: 'Integración nativa StashDB/FansDB', competitorNote: 'Requiere plugins de terceros' },
      { feature: '100% Offline sin puertos de red abiertos', swayaNote: 'Sin puertos abiertos, 100% local', competitorNote: 'Requiere servidor en red local' },
      { feature: 'Organizador interactivo con simulación previa', swayaNote: 'Control total y protección anti-colisiones', competitorNote: 'Solo monitoreo de carpetas' },
      { feature: 'Integración con torrents (Modo Seeding)', swayaNote: 'Integración directa con qBittorrent', competitorNote: 'No soportado' },
      { feature: 'Registro de momentos favoritos y marcadores', swayaNote: 'Captura y marca con 1 sola tecla', competitorNote: 'No disponible' },
    ],
    deepDives: [
      {
        title: 'Simplicidad de escritorio vs complejidad de servidores',
        description: 'Jellyfin requiere configurar puertos de red y servicios. SWAYA es una app de escritorio autónoma que funciona inmediatamente.',
      },
      {
        title: 'Estructura real de archivos en el disco',
        description: 'Jellyfin asume que los archivos ya están ordenados. SWAYA se encarga activamente de ordenar tus descargas en los discos.',
      },
      {
        title: 'Rendimiento nativo con MPV',
        description: 'Disfruta de avance instantáneo, subtítulos impecables y reproducción fluida en 4K HDR con el motor MPV integrado.',
      },
    ],
    faqs: [
      {
        q: '¿Puedo usar SWAYA para organizar carpetas para Jellyfin?',
        a: '¡Sí! SWAYA formatea los archivos según estándares universales reconocidos perfectamente por Jellyfin.',
      },
      {
        q: '¿SWAYA consume recursos en segundo plano?',
        a: 'No. Al cerrar SWAYA, ningún servicio o proceso queda activo en el sistema.',
      },
    ],
  },
  kodi: {
    title: 'SWAYA vs Kodi: Media Center Moderno Sin Plugins Problemáticos',
    metaTitle: 'Alternativa a Kodi para PC Windows - SWAYA',
    metaDescription: '¿Buscas una alternativa moderna a Kodi para PC? SWAYA ofrece reproductor MPV, renombrado de archivos y una interfaz fluida sin plugins frágiles.',
    heroTagline: 'Una experiencia multimedia moderna pensada para ratón, teclado y discos.',
    heroSubtitle: 'Kodi es ideal para televisores con mando a distancia, pero incómodo en el monitor del PC. SWAYA fue desarrollado a medida para el escritorio Windows.',
    competitorPricing: 'Gratis / Open Source (FOSS)',
    swayaPricing: '€39 oferta de lanzamiento (€79 regular)',
    whenToChooseCompetitor: [
      'Mantienes un HTPC en la TV del salón controlado por mando a distancia.',
      'Utilizas plugins específicos para IPTV o PVR.',
      'Quieres una interfaz de 10 pies para el sofá.',
    ],
    whenToChooseSwaya: [
      'Utilizas un PC con Windows & Linux con ratón y teclado.',
      'Quieres renombrado seguro de archivos y orden en tus discos duros.',
      'Quieres un programa estable que no se rompa tras las actualizaciones.',
      'Quieres gestionar películas (TMDb) y contenido para adultos (StashDB) en el mismo lugar.',
    ],
    matrix: [
      { feature: 'Interfaz de escritorio moderna (Ratón y Teclado)', swayaNote: 'Interfaz fluida para PC', competitorNote: 'Interfaz de TV para mando' },
      { feature: 'Renombrado y organización física de archivos', swayaNote: 'Renombra y mueve archivos reales en disco', competitorNote: 'Solo base de datos, no renombra archivos' },
      { feature: 'Motor de video MPV 4K/HDR integrado', swayaNote: 'Aceleración por hardware sin cortes', competitorNote: 'Reproductor interno de Kodi' },
      { feature: 'Medios para adultos (StashDB) y Modo Dual', swayaNote: 'Integración nativa StashDB/FansDB', competitorNote: 'Requiere plugins inestables' },
      { feature: 'Estabilidad sólida sin plugins frágiles', swayaNote: 'Arquitectura integrada y confiable', competitorNote: 'Los plugins fallan con frecuencia en actualizaciones' },
      { feature: 'Simulación con protección anti-colisiones', swayaNote: 'Vista previa segura antes del movimiento', competitorNote: 'No aplicable' },
      { feature: 'Integración con torrents (Modo Seeding)', swayaNote: 'Conexión directa con qBittorrent', competitorNote: 'Requiere scripts externos' },
    ],
    deepDives: [
      {
        title: 'Foco en el ordenador en lugar de interfaz para TV',
        description: 'Kodi fue diseñado para mando a distancia. SWAYA está optimizado para navegación rápida con ratón, ventanas y atajos en Windows.',
      },
      {
        title: 'Renombrado físico de archivos en disco',
        description: 'Kodi requiere archivos previamente renombrados. SWAYA realiza la tarea por ti identificando y renombrando los archivos en disco.',
      },
      {
        title: 'Cero problemas de mantenimiento de plugins',
        description: 'Todas las funciones esenciales - scrapers, biblioteca y reproductor - están integradas de forma nativa en SWAYA.',
      },
    ],
    faqs: [
      {
        q: '¿Puedo usar SWAYA para preparar archivos para Kodi?',
        a: '¡Sí! SWAYA organiza archivos con convenciones claras que Kodi reconoce automáticamente sin errores.',
      },
      {
        q: '¿SWAYA es más fácil de usar que Kodi?',
        a: 'Mucho más fácil. No requiere repositorios, configuraciones XML complejas ni instalación de plugins: funciona directamente.',
      },
    ],
  },
};
