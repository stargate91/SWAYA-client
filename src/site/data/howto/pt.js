export const pt = {
  'getting-started': {
    name: 'Como configurar e começar a usar o Central de Mídia SWAYA',
    description: 'Guia rápido para instalar o SWAYA no Windows e Linux, configurar diretórios de armazenamento e criar sua biblioteca offline.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Baixar e Iniciar',
        text: 'Instale o aplicativo desktop SWAYA no Windows ou Linux.',
      },
      {
        name: 'Configurar Diretórios de Armazenamento',
        text: 'Defina sua pasta de downloads e os diretórios de destino nas Configurações.',
      },
      {
        name: 'Escanear e Associar Mídias',
        text: 'Abra o Organizer para escanear arquivos de vídeo e baixar metadados e capas completas.',
      },
    ],
  },
  'organizer': {
    name: 'Como renomear e organizar arquivos de mídia em lote no disco',
    description: 'Aprenda a buscar metadados no TMDb/StashDB e renomear arquivos em lote com estrutura segura contra colisões.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Selecionar Pasta de Entrada',
        text: 'Abra o SWAYA Organizer e selecione a pasta com downloads não organizados ou vídeos brutos.',
      },
      {
        name: 'Executar Raspagem Automática de Metadados',
        text: 'Inicie a busca automática no TMDb, OMDb e StashDB para identificar títulos de filmes e séries.',
      },
      {
        name: 'Ajustar com Associação e Substituição',
        text: 'Use as caixas de busca e substituição para ajustar títulos, edições ou números de episódios.',
      },
      {
        name: 'Renomear ou Organizar no Local',
        text: 'Clique em Renomear para mover arquivos para pastas Plex/Jellyfin, ou use Organizar no Local para manter as pastas intactas.',
      },
    ],
  },
  'dashboard': {
    name: 'Como navegar por feeds de descoberta e continuar assistindo no Painel',
    description: 'Retome vídeos com precisão de segundos e explore recomendações personalizadas.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Retomar de Continuar Assistindo',
        text: 'Clique em qualquer título na seção Continuar Assistindo para retomar do segundo exato salvo.',
      },
      {
        name: 'Explorar Destaques e Feeds',
        text: 'Descubra o banner de destaque, lançamentos recém-organizados, filmes bem avaliados e estúdios.',
      },
    ],
  },
  'library': {
    name: 'Como navegar e filtrar seu catálogo de mídia no SWAYA',
    description: 'Organize sua coleção com filtros multicritério, tags, perfis de artistas e modos de exibição personalizados.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Alternar Modos de Visualização',
        text: 'Alterne entre visualização em grade, tabela e estúdios/artistas na barra de ferramentas.',
      },
      {
        name: 'Aplicar Filtros Multicritério',
        text: 'Filtre por resolução 4K HDR, gêneros, tags personalizadas ou presença física no disco.',
      },
      {
        name: 'Usar Ações Rápidas',
        text: 'Clique com o botão direito nos cartões para reproduzir, avaliar, adicionar a listas ou ver especificações técnicas.',
      },
    ],
  },
  'details': {
    name: 'Como personalizar pôsteres e temporadas de séries no SWAYA',
    description: 'Consulte especificações de vídeo, escolha pôsteres e planos de fundo 4K e navegue por episódios.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Consultar Especificações Técnicas',
        text: 'Abra a página do título para checar codecs de vídeo, taxas de bits, faixas de áudio, legendas e elenco.',
      },
      {
        name: 'Escolher Pôsteres e Fundos Personalizados',
        text: 'Abra o seletor visual para escolher pôsteres 4K e imagens de fundo alternativas dos serviços online.',
      },
      {
        name: 'Navegar por Temporadas e Episódios',
        text: 'Acesse episódios organizados por temporada com cartões individuais, sinopses e status de visualização.',
      },
    ],
  },
  'player': {
    name: 'Como reproduzir mídias 4K HDR com o motor MPV no SWAYA',
    description: 'Reproduza arquivos locais com aceleração por hardware nativa MPV, troca rápida de áudio e legendas.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Iniciar o Reprodutor por Hardware',
        text: 'Abra qualquer filme ou episódio para reprodução direta instantânea com MPV sem transcodificação.',
      },
      {
        name: 'Alternar Áudio e Legendas',
        text: 'Troque entre faixas de áudio em múltiplos idiomas e ajuste a sincronia das legendas em tempo real.',
      },
      {
        name: 'Usar Reprodutores Externos',
        text: 'Se preferir, inicie o VLC ou MPC-HC diretamente pelo menu de contexto do reprodutor.',
      },
    ],
  },
  'search': {
    name: 'Como usar a busca universal multi-fontes no SWAYA',
    description: 'Realize buscas globais instantâneas entre filmes, séries, artistas e estúdios.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Abrir Busca Global',
        text: 'Pressione Ctrl+K ou clique na barra de pesquisa superior a partir de qualquer tela.',
      },
      {
        name: 'Buscar em Bibliotecas e Scrapers',
        text: 'Digite títulos de filmes, séries, artistas ou estúdios com agrupamento em tempo real.',
      },
      {
        name: 'Aplicar Filtros Instantâneos',
        text: 'Refine os resultados por categoria de mídia, resolução, ano de lançamento ou tag.',
      },
    ],
  },
  'lists': {
    name: 'Como criar coleções temáticas com capa em mosaico de 4 pôsteres',
    description: 'Crie listas de reprodução personalizadas, organize coleções e gere capas em mosaico de 4 pôsteres.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Criar Nova Coleção',
        text: 'Abra Listas e defina o título da coleção, a descrição do tema e a ordenação.',
      },
      {
        name: 'Adicionar Títulos de Mídia',
        text: 'Adicione filmes ou séries a partir dos cartões da biblioteca ou das páginas de detalhes.',
      },
      {
        name: 'Gerar Capa de 4 Pôsteres',
        text: 'O SWAYA constrói automaticamente uma capa em mosaico com os títulos da coleção.',
      },
    ],
  },
  'ratings': {
    name: 'Como avaliar mídias e registrar resenhas privadas em Markdown no SWAYA',
    description: 'Use avaliações de 10 estrelas, escreva notas em Markdown e filtre seus títulos favoritos.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Avaliar na Escala de 10 Estrelas',
        text: 'Avalie filmes, séries e cenas com precisão em passos de meia estrela.',
      },
      {
        name: 'Escrever Resenhas Privadas em Markdown',
        text: 'Salve anotações e tags pessoais com armazenamento 100% offline no seu computador.',
      },
      {
        name: 'Filtrar por Avaliações e Favoritos',
        text: 'Filtre sua biblioteca por faixas de estrelas ou veja seus títulos favoritos.',
      },
    ],
  },
  'history': {
    name: 'Como acompanhar e gerenciar o histórico de reprodução no SWAYA',
    description: 'Monitore sessões de reprodução cronológicas, pontos de retomada e registros.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Abrir Registro de Histórico',
        text: 'Examine as sessões de reprodução ordenadas no tempo com marcadores precisos e progresso.',
      },
      {
        name: 'Retomar Títulos Incompletos',
        text: 'Clique em qualquer item não finalizado para continuar a reprodução do ponto exato.',
      },
      {
        name: 'Filtrar ou Limpar Histórico',
        text: 'Filtre por período de datas ou exclua entradas individuais de visualização.',
      },
    ],
  },
  'statistics': {
    name: 'Como analisar o espaço em disco e o DNA da biblioteca no SWAYA',
    description: 'Verifique a capacidade dos discos, gráficos de distribuição de codecs e variedade de gêneros.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Ver Uso de Espaço por Codec e Resolução',
        text: 'Consulte o espaço ocupado por codecs 4K UHD, 1080p FHD, HEVC e AV1.',
      },
      {
        name: 'Explorar as Distribuições do DNA',
        text: 'Navegue por gráficos interativos sobre densidade de gêneros, décadas e estúdios.',
      },
    ],
  },
  'settings': {
    name: 'Como configurar modelos de pastas e chaves de scrapers no SWAYA',
    description: 'Personalize padrões de pastas, insira chaves de API e ative o modo furtivo em 1 clique.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Definir Pastas Principais',
        text: 'Escolha os diretórios de destino para filmes, séries de TV e mídias privadas.',
      },
      {
        name: 'Selecionar Modelos de Pastas',
        text: 'Defina regras Plex/Jellyfin usando tags dinâmicas como {title} ({year}).',
      },
      {
        name: 'Inserir Chaves de API de Scrapers',
        text: 'Adicione suas chaves do TMDb ou StashDB para obter metadados rápidos e sem limites.',
      },
      {
        name: 'Configurar o Modo Furtivo',
        text: 'Defina uma tecla de atalho para ocultar instantaneamente bibliotecas confidenciais.',
      },
    ],
  },
  'torrent': {
    name: 'Como integrar cliente torrent com organização automática no SWAYA',
    description: 'Conecte o qBittorrent, monitore downloads em tempo real e importe automaticamente os arquivos concluídos.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Ativar Integração de Torrent',
        text: 'Insira endereço, porta e credenciais da WebUI do qBittorrent nas Configurações.',
      },
      {
        name: 'Monitorar Downloads Ativos',
        text: 'Acompanhe a velocidade de transferência, tempo estimado e progresso direto no SWAYA.',
      },
      {
        name: 'Organização Automática ao Concluir',
        text: 'O SWAYA busca metadados para os arquivos concluídos e os move para a pasta correta da biblioteca.',
      },
    ],
  },
};
