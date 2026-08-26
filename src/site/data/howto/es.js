export const es = {
  'getting-started': {
    name: 'Cómo configurar y comenzar con el Centro Multimedia SWAYA',
    description: 'Guía rápida para instalar SWAYA en Windows y Linux, configurar directorios de almacenamiento y crear tu biblioteca multimedia sin conexión.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Descargar e Iniciar',
        text: 'Instala la aplicación SWAYA para escritorio en Windows o Linux.',
      },
      {
        name: 'Configurar Directorios de Almacenamiento',
        text: 'Define la carpeta de descargas entrantes y los directorios de destino en Ajustes.',
      },
      {
        name: 'Escanear y Emparejar Medios',
        text: 'Abre el Organizador para escanear archivos de vídeo y descargar metadatos y carátulas.',
      },
    ],
  },
  'organizer': {
    name: 'Cómo renombrar y organizar archivos multimedia por lotes en el disco',
    description: 'Aprende a buscar metadatos automáticamente con TMDb/StashDB y renombrar archivos por lotes sin colisiones.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Seleccionar Carpeta de Entrada',
        text: 'Abre SWAYA Organizer y elige la carpeta con descargas o vídeos desordenados.',
      },
      {
        name: 'Ejecutar Búsqueda de Metadatos',
        text: 'Inicia el escaneo automático en TMDb, OMDb y StashDB para identificar títulos de películas y series.',
      },
      {
        name: 'Ajustar con Búsqueda y Modificación',
        text: 'Usa los diálogos de Búsqueda y Modificación para corregir títulos, etiquetas de edición o números de episodios.',
      },
      {
        name: 'Renombrar o Importar en el Lugar',
        text: 'Haz clic en Renombrar para mover archivos a carpetas Plex/Jellyfin, o usa Organizar en el Lugar para no alterar las rutas.',
      },
    ],
  },
  'dashboard': {
    name: 'Cómo navegar por feeds de descubrimiento y continuar viendo en el Panel',
    description: 'Retoma vídeos en curso con sincronización exacta de segundos y explora recomendaciones personalizadas.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Reanudar desde Seguir Viendo',
        text: 'Haz clic en cualquier título en la sección Seguir Viendo para continuar desde el segundo exacto guardado.',
      },
      {
        name: 'Explorar Destacados y Feeds',
        text: 'Descubre el banner destacado, los últimos títulos organizados, películas mejor valoradas y estudios.',
      },
    ],
  },
  'library': {
    name: 'Cómo explorar y filtrar tu catálogo multimedia en SWAYA',
    description: 'Organiza tu colección con filtros multicriterio, etiquetas, perfiles de actores y modos de vista personalizados.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Cambiar Modos de Vista',
        text: 'Alterna entre vista en cuadrícula, tabla y estudios/actores en la barra de herramientas.',
      },
      {
        name: 'Aplicar Filtros Multicriterio',
        text: 'Filtra por resolución 4K HDR, géneros, etiquetas personalizadas o estado de almacenamiento en disco.',
      },
      {
        name: 'Usar Acciones Rápidas',
        text: 'Haz clic derecho en cualquier tarjeta para reproducir, calificar, añadir a una lista o ver detalles técnicos.',
      },
    ],
  },
  'details': {
    name: 'Cómo personalizar portadas y navegación de temporadas en SWAYA',
    description: 'Revisa especificaciones técnicas, elige pósteres y fondos alternativos en 4K y navega por los episodios de tus series.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Consultar Especificaciones Técnicas',
        text: 'Abre el perfil para revisar códecs de vídeo, tasas de bits, pistas de audio, subtítulos y reparto.',
      },
      {
        name: 'Elegir Pósteres y Fondos Personalizados',
        text: 'Abre el selector visual de imágenes para elegir pósteres 4K y fondos alternativos.',
      },
      {
        name: 'Navegar por Temporadas y Episodios',
        text: 'Explora el desglose de temporadas con tarjetas de episodios, sinopsis y estados de visualización.',
      },
    ],
  },
  'player': {
    name: 'Cómo reproducir medios 4K HDR con el motor MPV en SWAYA',
    description: 'Reproduce archivos locales con aceleración por hardware MPV, cambio instantáneo de subtítulos y pistas de audio.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Iniciar el Reproductor por Hardware',
        text: 'Abre cualquier película o episodio para reproducción instantánea con MPV sin transcodificación.',
      },
      {
        name: 'Cambiar Audio y Subtítulos',
        text: 'Alterna entre pistas de audio multilingües y ajusta el retardo de subtítulos en tiempo real.',
      },
      {
        name: 'Usar Reproductores Externos',
        text: 'Si lo prefieres, inicia VLC o MPC-HC directamente desde el menú contextual del reproductor.',
      },
    ],
  },
  'search': {
    name: 'Cómo usar la búsqueda universal multifuente en SWAYA',
    description: 'Realiza búsquedas globales instantáneas entre películas, series, actores y sellos de estudios.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Abrir Búsqueda Global',
        text: 'Pulsa Ctrl+K o haz clic en la barra de búsqueda superior desde cualquier pantalla.',
      },
      {
        name: 'Buscar en Bibliotecas y Scrapers',
        text: 'Escribe títulos de películas, series, actores o estudios para ver resultados agrupados al instante.',
      },
      {
        name: 'Aplicar Filtros Instantáneos',
        text: 'Acota los resultados por categoría de medio, resolución, año de estreno o etiqueta.',
      },
    ],
  },
  'lists': {
    name: 'Cómo crear colecciones temáticas con portada en mosaico de 4 pósteres',
    description: 'Crea listas de reproducción personalizadas, organiza colecciones y genera portadas en mosaico de 4 pósteres.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Crear una Nueva Colección',
        text: 'Abre Listas y define el título de la colección, la descripción temática y el orden de los elementos.',
      },
      {
        name: 'Añadir Títulos Multimedia',
        text: 'Agrega películas o series desde las tarjetas de biblioteca o las páginas de detalles.',
      },
      {
        name: 'Generar Portada de 4 Pósteres',
        text: 'SWAYA construye automáticamente una portada en mosaico con los títulos de la colección.',
      },
    ],
  },
  'ratings': {
    name: 'Cómo calificar medios y escribir reseñas privadas en Markdown en SWAYA',
    description: 'Asigna calificaciones de 10 estrellas, guarda notas privadas en Markdown y filtra tus favoritos.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Calificar en Escala de 10 Estrellas',
        text: 'Puntúa películas, series y escenas con precisión de media estrella.',
      },
      {
        name: 'Escribir Reseñas Privadas en Markdown',
        text: 'Guarda tus impresiones y etiquetas personales de forma 100 % privada y local en tu equipo.',
      },
      {
        name: 'Filtrar por Calificaciones y Favoritos',
        text: 'Filtra tu biblioteca por rangos de estrellas o consulta tus títulos favoritos.',
      },
    ],
  },
  'history': {
    name: 'Cómo supervisar y gestionar el historial de reproducción en SWAYA',
    description: 'Supervisa sesiones de reproducción cronológicas, marcas de tiempo de reanudación y registros.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Abrir Registro de Historial',
        text: 'Revisa las sesiones de reproducción ordenadas cronológicamente con marcas de tiempo y progreso.',
      },
      {
        name: 'Reanudar Títulos Incompletos',
        text: 'Haz clic en cualquier sesión sin finalizar para continuar la reproducción en el punto exacto.',
      },
      {
        name: 'Filtrar o Limpiar el Historial',
        text: 'Filtra por rangos de fechas o elimina entradas individuales de reproducción.',
      },
    ],
  },
  'statistics': {
    name: 'Cómo analizar el almacenamiento y el ADN de tu biblioteca en SWAYA',
    description: 'Inspecciona la capacidad de tus discos, gráficos de códecs de vídeo y distribución de géneros.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Ver Uso de Almacenamiento por Códec y Resolución',
        text: 'Comprueba el espacio ocupado por códecs 4K UHD, 1080p FHD, HEVC y AV1.',
      },
      {
        name: 'Explorar las Distribuciones del ADN',
        text: 'Examina gráficos interactivos sobre densidad de géneros, décadas de estreno y estudios.',
      },
    ],
  },
  'settings': {
    name: 'Cómo configurar plantillas de nombrado y claves de scrapers en SWAYA',
    description: 'Personaliza patrones de carpetas, ingresa claves API y activa el modo oculto en 1 clic.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Definir Carpetas de Destino',
        text: 'Elige las carpetas de destino para películas, series de televisión y medios privados.',
      },
      {
        name: 'Seleccionar Plantillas de Nombrado',
        text: 'Configura reglas de carpetas Plex/Jellyfin usando tokens dinámicos como {title} ({year}).',
      },
      {
        name: 'Introducir Claves API de Scrapers',
        text: 'Añade claves de TMDb o StashDB para obtener metadatos a gran velocidad sin restricciones.',
      },
      {
        name: 'Configurar Atajo de Modo Oculto',
        text: 'Asigna un atajo de teclado para ocultar de inmediato bibliotecas confidenciales.',
      },
    ],
  },
  'torrent': {
    name: 'Cómo integrar un cliente torrent con organización automática en SWAYA',
    description: 'Conecta qBittorrent, monitoriza descargas en tiempo real e importa automáticamente archivos completados.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Activar Integración de Torrent',
        text: 'Introduce el host, puerto y credenciales de qBittorrent en Ajustes.',
      },
      {
        name: 'Supervisar Descargas Activas',
        text: 'Sigue la velocidad de transferencia, tiempo restante y progreso directamente en SWAYA.',
      },
      {
        name: 'Organización Automática al Finalizar',
        text: 'SWAYA busca metadatos para las descargas finalizadas y las mueve a las carpetas de la biblioteca.',
      },
    ],
  },
};
