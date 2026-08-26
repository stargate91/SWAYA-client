export const es = {
  sectionTitles: {
    added: 'Nuevas Funciones',
    performance: 'Rendimiento & Arquitectura',
    changed: 'Mejoras',
    fixed: 'Corrección de Errores & Ajustes',
  },
  releases: {
    '1.0.0': {
      title: 'Integración de Torrent, Reseñas Granulares & Arquitectura de Series TV',
      description: 'Lanzamiento importante de la estación de trabajo que introduce paneles para clientes torrent externos, búsqueda global de torrents, panel de reseñas, navegación por temporadas y registros SQL optimizados.',
      highlights: [
        'Panel para clientes torrent externos (qBittorrent y Transmission) con medidores de ancho de banda',
        'Monitor automático de descargas completadas con escaneo inmediato de biblioteca',
        'Estructura detallada de series de TV, desglose de episodios y progreso de reproducción',
        'Widgets unificados de descubrimiento de medios a través de TMDb, StashDB y FansDB',
        'Historial de cambio de nombre maestro-detalle con carga bajo demanda de registros',
      ],
    },
    '0.7.0': {
      title: 'Aceleración de Video por Hardware & Caché de Filmografía SQLite',
      description: 'Actualización de rendimiento con vistas previas de video aceleradas por GPU NVENC/QSV, caché local de filmografías y asignación dinámica de puertos.',
      highlights: [
        'Vistas previas de video FFmpeg aceleradas por hardware con detección NVENC/QSV/AMF',
        'Caché local SQLite de filmografías para carga instantánea de perfiles de actores',
        'Asignación dinámica de puertos TCP al inicio evitando colisiones de puertos',
      ],
    },
    '0.6.0': {
      title: 'Búsqueda Universal Multi-Fuente & Monitor de Ciclo de Vida de Procesos',
      description: 'Capacidades de búsqueda global ampliadas y gestión reforzada de procesos en segundo plano.',
      highlights: [
        'Búsqueda global unificada entre películas, escenas, intérpretes y estudios',
        'Monitor de proceso primario que previene tareas huérfanas en segundo plano',
      ],
    },
  },
};
