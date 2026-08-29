export const pt = {
  sectionTitles: {
    added: 'Novos Recursos',
    performance: 'Desempenho & Arquitetura',
    changed: 'Melhorias',
    fixed: 'Correções & Polimento',
  },
  releases: {
    '1.1.0': {
      title: "Navegação Interativa, Motor de Restauração de Rolagem e Migrações Automáticas",
      description: "Grande atualização de estabilidade e experiência do usuário com navegação na barra de título, restauração de rolagem em filmografias, migrações automáticas de banco de dados Alembic e design system modular.",
      highlights: [
              "Navegação interativa na barra de título com link para o início e botão da barra lateral",
              "Motor robusto de restauração de posição de rolagem para páginas de filmografia de artistas",
              "Execução automática de migrações Alembic na inicialização para atualização do banco de dados",
              "Filtragem e sanitização de conteúdo adulto em buscas de torrents no Jackett",
              "Modularização abrangente do design system com mais de 600 componentes isolados e tokens CSS"
      ]
    },
    '1.0.0': {
      title: 'Integração de Torrent, Avaliações Granulares & Arquitetura de Séries',
      description: 'Grande lançamento trazendo painéis para clientes de torrent externos, busca global de torrents, drawer de avaliações, navegação por temporadas e logs SQL otimizados.',
      highlights: [
        'Painel de torrents externos (qBittorrent & Transmission) com monitor de banda',
        'Monitoramento automático de downloads concluídos com varredura imediata',
        'Estrutura detalhada de séries, episódios e progresso de reprodução',
        'Widgets unificados de descoberta através de TMDb, StashDB e FansDB',
        'Histórico mestre-detalhe de renomeação com carregamento sob demanda de logs',
      ],
    },
    '0.7.0': {
      title: 'Aceleração de Vídeo por Hardware & Cache de Filmografia SQLite',
      description: 'Atualização de estabilidade e desempenho com prévias de vídeo via GPU NVENC/QSV, cache local de filmografias e portas dinâmicas.',
      highlights: [
        'Prévias de vídeo aceleradas por FFmpeg com detecção de NVENC/QSV/AMF',
        'Cache SQLite de filmografias para carregamento instantâneo de atores',
        'Alocação dinâmica de portas TCP na inicialização evitando conflitos',
      ],
    },
    '0.6.0': {
      title: 'Busca Universal Multi-Fonte & Monitor de Processos',
      description: 'Recursos expandidos de busca global e gerenciamento robusto de processos em segundo plano.',
      highlights: [
        'Busca global unificada entre filmes, cenas, artistas e estúdios',
        'Monitor do processo pai para evitar tarefas órfãs em segundo plano',
      ],
    },
  },
};
