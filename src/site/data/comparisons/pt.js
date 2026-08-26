export const pt = {
  filebot: {
    title: 'SWAYA vs FileBot: Estação Multimídia Moderna & Renomeação de Arquivos',
    metaTitle: 'Alternativa ao FileBot para Windows - SWAYA Batch Renamer & Player',
    metaDescription: 'Procurando uma alternativa moderna ao FileBot? O SWAYA renomeia arquivos no disco com TMDb e StashDB, inclui biblioteca offline e player MPV 4K.',
    heroTagline: 'Por que apenas renomear arquivos quando você pode organizar e reproduzir toda a sua coleção?',
    heroSubtitle: 'O FileBot é ótimo para renomear arquivos, mas o SWAYA eleva suas mídias a outro patamar: organização de discos, elegante biblioteca offline e player MPV 4K HDR integrado em um aplicativo moderno para Windows.',
    competitorPricing: '$6/ano ou $48 vitalício',
    swayaPricing: '€39 lançamento vitalício (€79 regular)',
    whenToChooseCompetitor: [
      'Você precisa apenas de uma ferramenta de linha de comando (CLI) para Linux headless ou scripts em NAS.',
      'Você escreve expressões personalizadas em Groovy e scripts automatizados.',
      'Você já utiliza um media center separado (como Plex ou Kodi) e não quer um player integrado.',
    ],
    whenToChooseSwaya: [
      'Você quer uma solução desktop completa: renomear no disco E reproduzir instantaneamente na biblioteca.',
      'Você gerencia filmes/séries convencionais (TMDb) e cenas adultas (StashDB, FansDB, ThePornDB).',
      'Você quer um player MPV com aceleração de hardware, retomada exata e zero transcodificação.',
      'Você prefere uma interface desktop moderna com simulação segura e proteção contra conflitos.',
    ],
    matrix: [
      { feature: 'Renomeação física de arquivos no disco', swayaNote: 'TMDb, ThePornDB, StashDB, FansDB', competitorNote: 'TheMovieDB, TVmaze, AniDB' },
      { feature: 'Prévia de teste e proteção contra conflitos', swayaNote: 'Detecção inteligente de conflitos e substituição', competitorNote: 'Lista de pré-visualização' },
      { feature: 'Player de vídeo 4K/HDR MPV integrado', swayaNote: 'Aceleração por hardware, sincronização de legendas e áudio', competitorNote: 'Nenhum player embutido' },
      { feature: 'Biblioteca offline visual e páginas de detalhes', swayaNote: 'Pôsteres, fundos, elenco, gêneros, avaliações', competitorNote: 'Sem interface de biblioteca' },
      { feature: 'Mídia adulta e suporte a scrapers StashDB', swayaNote: 'Integração nativa StashDB, FansDB e índice de artistas', competitorNote: 'Apenas bancos convencionais' },
      { feature: 'Modo Duplo (SFW / NSFW) com PIN', swayaNote: 'Isolamento completo do banco de dados e bloqueio', competitorNote: 'Não disponível' },
      { feature: 'Importação automática de torrents (qBittorrent)', swayaNote: 'Integração nativa e seeding no local', competitorNote: 'Apenas via scripts CLI' },
      { feature: '100% Offline e sem servidores (0 daemons)', swayaNote: 'Sem serviços em segundo plano ou portas abertas', competitorNote: 'Aplicativo Java local' },
      { feature: 'Interface moderna para Windows (Sem Java)', swayaNote: 'Aplicativo desktop nativo', competitorNote: 'Interface Java / Swing' },
      { feature: 'Licença vitalícia em pagamento único', swayaNote: '€39 lançamento / €79 vitalício', competitorNote: '$48 vitalício ou $6/ano' },
    ],
    deepDives: [
      {
        title: 'Além da simples renomeação: um universo de mídia completo',
        description: 'O FileBot para assim que os arquivos são renomeados. O SWAYA transforma seus arquivos em uma rica biblioteca visual com pôsteres, biografias de artistas, resumos de episódios e listas personalizadas.',
      },
      {
        title: 'Player MPV 4K HDR integrado',
        description: 'Não é preciso abrir players externos. Clique em qualquer vídeo no SWAYA para reproduzir instantaneamente arquivos MKV pesados, HDR, Dolby Atmos e legendas com aceleração total da GPU.',
      },
      {
        title: 'Mídias convencionais e adultas no mesmo lugar',
        description: 'O SWAYA é a primeira estação multimídia com arquitetura de Modo Duplo: gerencie filmes com TMDb e cenas adultas com StashDB, protegidas por um PIN opcional.',
      },
    ],
    faqs: [
      {
        q: 'O SWAYA pode substituir o FileBot para renomear filmes e séries?',
        a: 'Sim. O SWAYA analisa suas pastas de downloads, identifica títulos com o TMDb, permite correspondência interativa e renomeia fisicamente os arquivos na sua estrutura personalizada.',
      },
      {
        q: 'O SWAYA suporta continuar o seeding de torrents durante a organização?',
        a: 'Sim. O modo "Importar no Local" coleta todos os metadados e pôsteres para a biblioteca enquanto mantém os arquivos e pastas físicas intactos no disco para seeding.',
      },
      {
        q: 'É necessário ter o Java instalado para rodar o SWAYA?',
        a: 'Não. O SWAYA é um aplicativo nativo para Windows que não necessita de Java nem de dependências externas.',
      },
    ],
  },
  plex: {
    title: 'SWAYA vs Plex: Estação Multimídia 100% Offline Sem Servidores',
    metaTitle: 'Alternativa ao Plex para Windows Sem Servidor - SWAYA',
    metaDescription: 'Procurando uma alternativa privada ao Plex sem servidores? O SWAYA organiza arquivos no disco, roda 4K HDR via MPV e dispensa contas na nuvem.',
    heroTagline: 'Sua coleção pessoal sem servidores, contas na nuvem ou telemetria.',
    heroSubtitle: 'O Plex foi feito para streaming doméstico, mas requer daemons sempre rodando, contas online e assinaturas Plex Pass. O SWAYA oferece uma experiência desktop direta e 100% offline no seu PC.',
    competitorPricing: 'Grátis / $4.99/mês / $119 vitalício (Plex Pass)',
    swayaPricing: '€39 lançamento vitalício (€79 regular)',
    whenToChooseCompetitor: [
      'Você quer transmitir mídias para Smart TVs, smartphones e compartilhar com a família fora de casa.',
      'Você mantém um servidor doméstico ou NAS com transcodificação multiusuário.',
      'Você precisa de sincronização remota entre aparelhos iOS, Android e Apple TV.',
    ],
    whenToChooseSwaya: [
      'Você assiste a filmes e séries diretamente no seu computador ou monitor com Windows.',
      'Você busca 100% de privacidade: zero contas na nuvem, zero telemetria e zero portas de rede abertas.',
      'Você quer que os arquivos reais no seu disco rígido sejam renomeados e organizados.',
      'Você não quer lidar com configuração de servidores nem falhas de transcodificação.',
    ],
    matrix: [
      { feature: '100% Offline e zero configuração de servidor', swayaNote: 'App desktop imediato, sem daemons', competitorNote: 'Requer servidor Plex Media Server' },
      { feature: 'Renomeação e organização física de arquivos', swayaNote: 'Renomeia arquivos reais no disco', competitorNote: 'Apenas banco virtual' },
      { feature: 'Sem contas na nuvem / Privacidade total', swayaNote: 'Sem login, banco SQLite local', competitorNote: 'Autenticação online Plex obrigatória' },
      { feature: 'Player MPV nativo (Sem transcodificação)', swayaNote: 'Reproduz qualquer codec em 4K HDR', competitorNote: 'Frequentemente transcodifica vídeos' },
      { feature: 'Mídia adulta (StashDB) e Modo Duplo', swayaNote: 'Modo adulto dedicado & StashDB/FansDB', competitorNote: 'Requer plugins instáveis de terceiros' },
      { feature: 'Organizador interativo com teste prévio', swayaNote: 'Verificação e edição antes de mover', competitorNote: 'Apenas varredura passiva de pastas' },
      { feature: 'Integração com torrents (Importação no local)', swayaNote: 'Integração direta com qBittorrent', competitorNote: 'Não suportado nativamente' },
      { feature: 'Preço único vitalício (Sem mensalidades)', swayaNote: '€39 lançamento pagamento único', competitorNote: '$119 vitalício ou $4.99/mês' },
      { feature: 'Marcadores precisos de momentos favoritos', swayaNote: 'Captura e timestamp com a tecla Enter', competitorNote: 'Não disponível' },
      { feature: 'Zero consumo de CPU/RAM em segundo plano', swayaNote: 'Nada roda após fechar o programa', competitorNote: 'Servidor roda permanentemente em segundo plano' },
    ],
    deepDives: [
      {
        title: 'Zero servidores em segundo plano, zero portas abertas',
        description: 'O Plex exige serviços em execução contínua. O SWAYA é um aplicativo desktop leve: ao fechá-lo, nada permanece rodando no sistema.',
      },
      {
        title: 'Organização real no disco vs bibliotecas virtuais',
        description: 'O Plex apenas mapeia metadados sobre pastas bagunçadas. O SWAYA limpa, renomeia e estrutura os arquivos físicos nos seus discos.',
      },
      {
        title: 'Player MPV nativo sem dores de cabeça com transcode',
        description: 'Esqueça travamentos ao reproduzir 4K HDR ou legendas PGS: o motor MPV integrado no SWAYA roda tudo com aceleração suave da GPU.',
      },
    ],
    faqs: [
      {
        q: 'Posso usar o SWAYA sem conexão com a internet?',
        a: 'Sim! O SWAYA funciona 100% offline. Após a coleta de metadados e pôsteres, nenhuma conexão é necessária para navegar ou assistir.',
      },
      {
        q: 'O SWAYA faz streaming para Smart TVs como o Plex?',
        a: 'O SWAYA é desenvolvido sob medida como uma estação desktop para PCs e notebooks, sem servidor de streaming para TVs ou celulares.',
      },
      {
        q: 'O SWAYA coleta dados de uso ou exige login?',
        a: 'Não. O SWAYA não exige contas online nem transmite histórico de visualização. Tudo fica exclusivamente no seu computador.',
      },
    ],
  },
  tinymediamanager: {
    title: 'SWAYA vs tinyMediaManager: Gestão de Mídia e Player Desktop',
    metaTitle: 'Alternativa ao tinyMediaManager para Windows - SWAYA',
    metaDescription: 'Procurando uma alternativa ao tinyMediaManager? O SWAYA oferece renomeação em lote, scraping TMDb/StashDB e player MPV 4K sem Java.',
    heroTagline: 'Organize e aproveite suas mídias sem interfaces Java lentas.',
    heroSubtitle: 'O tinyMediaManager é um bom gerador de NFOs, mas exige Java e não possui player integrado. O SWAYA combina renomeação de discos, biblioteca visual e player MPV 4K.',
    competitorPricing: '€15/ano (v4/v5 Pro)',
    swayaPricing: '€39 lançamento vitalício (€79 regular)',
    whenToChooseCompetitor: [
      'Você precisa de arquivos .NFO detalhados para uma instalação existente do Kodi.',
      'Você gerencia mídias no macOS, Linux e Windows simultaneamente.',
      'Você precisa de edição avançada de tags XML/NFO.',
    ],
    whenToChooseSwaya: [
      'Você quer um aplicativo desktop moderno e rápido sem instalar Java.',
      'Você quer um fluxo integrado: organizar, navegar e assistir em um só clique.',
      'Você gerencia mídias adultas (StashDB, FansDB) junto com filmes e séries.',
      'Você prefere uma licença vitalícia em vez de anuidade recorrente.',
    ],
    matrix: [
      { feature: 'Renomeação no disco e estrutura de pastas', swayaNote: 'Modelos inteligentes e proteção contra conflitos', competitorNote: 'Renomeador baseado em padrões' },
      { feature: 'Player de vídeo com aceleração por hardware', swayaNote: 'Player nativo 4K HDR MPV', competitorNote: 'Sem motor de reprodução embutido' },
      { feature: 'Scrapers de mídia adulta (StashDB / FansDB)', swayaNote: 'Scrapers dedicados e índice de artistas', competitorNote: 'Não suportado' },
      { feature: 'Modo Duplo com proteção por PIN', swayaNote: 'Banco de dados isolado e bloqueio rápido', competitorNote: 'Sem modo de privacidade' },
      { feature: 'Interface desktop moderna (Sem Java)', swayaNote: 'App nativo leve e rápido', competitorNote: 'Interface Java Swing' },
      { feature: 'Janelas interativas de correspondência e edição', swayaNote: 'Busca rápida, seletor de episódios e editor de tags', competitorNote: 'Diálogos de scraper' },
      { feature: 'Integração com torrents (Manter seeding)', swayaNote: 'Importação no local e preservação de seeds', competitorNote: 'Não disponível' },
      { feature: 'Histórico de reprodução e registro de momentos', swayaNote: 'Estatísticas detalhadas, timestamps e fotos', competitorNote: 'Flags básicas de assistido' },
      { feature: 'Modelo de licença', swayaNote: 'Pagamento único vitalício (€39)', competitorNote: 'Assinatura anual de €15/ano' },
    ],
    deepDives: [
      {
        title: 'Tudo em um: organizar, navegar e reproduzir',
        description: 'Com o tinyMediaManager, você precisa alternar constantemente entre o tMM e um player externo. O SWAYA oferece um ambiente unificado e elegante.',
      },
      {
        title: 'Pagamento único vitalício vs assinaturas anuais',
        description: 'O tMM v4/v5 cobra assinatura anual para scrapers online. O SWAYA é adquirido uma única vez com todas as atualizações inclusas.',
      },
      {
        title: 'Scraping completo convencional e adulto',
        description: 'Enquanto o tMM se limita a filmes e séries, o SWAYA traz suporte de primeira linha para StashDB e FansDB.',
      },
    ],
    faqs: [
      {
        q: 'O SWAYA gera arquivos compatíveis com o Kodi/Jellyfin?',
        a: 'O SWAYA organiza pastas e arquivos de acordo com os padrões universais do Plex/Jellyfin/Kodi, garantindo leitura perfeita em qualquer outro software.',
      },
      {
        q: 'O SWAYA abre mais rápido que programas em Java?',
        a: 'Sim. O SWAYA inicia instantaneamente com baixo uso de memória, sem a sobrecarga de inicialização da Máquina Virtual Java.',
      },
    ],
  },
  stash: {
    title: 'SWAYA vs StashApp: Estação de Trabalho Desktop Sem Servidor Web',
    metaTitle: 'Alternativa ao StashApp para Windows - SWAYA Desktop Organizer',
    metaDescription: 'Procurando uma alternativa nativa ao StashApp para Windows? O SWAYA reúne StashDB, renomeação de discos e player MPV sem servidores.',
    heroTagline: 'A estação multimídia privada definitiva sem servidores localhost ou Docker.',
    heroSubtitle: 'O Stash é um ótimo servidor para mídias adultas no navegador. O SWAYA é um aplicativo nativo para Windows compatível com TMDb e StashDB com player MPV integrado.',
    competitorPricing: 'Grátis / Open Source',
    swayaPricing: '€39 lançamento vitalício (€79 regular)',
    whenToChooseCompetitor: [
      'Você mantém um servidor Linux ou Docker para acesso em rede.',
      'Você utiliza plugins especializados da comunidade.',
      'Você procura um aplicativo web para rodar exclusivamente no navegador.',
    ],
    whenToChooseSwaya: [
      'Você quer um único app desktop sem servidores rodando em segundo plano (`localhost:9999`).',
      'Você quer filmes convencionais (TMDb) e cenas adultas (StashDB) em um só app.',
      'Você quer renomear e estruturar arquivos físicos no disco com proteção de conflitos.',
      'Você quer um player MPV com aceleração de GPU sem as limitações dos navegadores.',
    ],
    matrix: [
      { feature: 'App desktop nativo (Sem servidor localhost)', swayaNote: 'Executável único, 0 daemons em background', competitorNote: 'Roda servidor Go em localhost:9999' },
      { feature: 'Renomeação e organização de arquivos no disco', swayaNote: 'Renomeia e move arquivos reais', competitorNote: 'Deixa arquivos inalterados nas pastas' },
      { feature: 'Modo Duplo: Convencional (TMDb) + Adulto (StashDB)', swayaNote: 'Alternância instantânea entre perfis SFW e NSFW', competitorNote: 'Apenas mídia adulta' },
      { feature: 'Player 4K MPV nativo com aceleração por GPU', swayaNote: 'Reproduz qualquer codec com fluidez total', competitorNote: 'Player HTML5 no navegador' },
      { feature: 'Tabelas interativas de correspondência e edição', swayaNote: 'Simulação segura com ações em lote', competitorNote: 'Interface tagger' },
      { feature: 'Perfis de artistas, estúdios e tags', swayaNote: 'Perfis ricos e galerias de fotos', competitorNote: 'Banco de dados de artistas' },
      { feature: 'Registro de momentos marcantes e screenshots', swayaNote: 'Captura e timestamp com a tecla Enter', competitorNote: 'Marcadores de cenas' },
      { feature: 'Bloqueio de privacidade com PIN', swayaNote: 'Bloqueio instantâneo e banco adulto oculto', competitorNote: 'Plugin de autenticação básica' },
      { feature: 'Integração com torrents (qBittorrent)', swayaNote: 'Sincronização direta e suporte a seeding', competitorNote: 'Apenas via scripts externos' },
    ],
    deepDives: [
      {
        title: 'Player MPV nativo vs limitações de codecs do navegador',
        description: 'O Stash usa HTML5 no navegador, exigindo transcodificação para vídeos pesados em 4K HEVC 10-bit. O player MPV integrado no SWAYA roda qualquer formato sem sobrecarregar a CPU.',
      },
      {
        title: 'Biblioteca unificada para todos os conteúdos',
        description: 'Chega de manter programas separados: o SWAYA oferece alternância instantânea entre os modos Geral e Adulto com total isolamento de dados.',
      },
      {
        title: 'Organização real dos arquivos nos seus discos',
        description: 'Ao contrário do Stash, que apenas cadastra arquivos no banco, o SWAYA renomeia e organiza seus downloads em pastas limpas no disco.',
      },
    ],
    faqs: [
      {
        q: 'O SWAYA busca informações diretamente no StashDB?',
        a: 'Sim! Basta inserir sua chave de API do StashDB nas Configurações para identificar títulos, artistas, estúdios e capas em alta resolução.',
      },
      {
        q: 'Como o SWAYA protege a privacidade de mídias adultas?',
        a: 'O SWAYA conta com um bloqueio por PIN: quando ativado, a biblioteca adulta fica 100% invisível até que você digite sua senha.',
      },
    ],
  },
  jellyfin: {
    title: 'SWAYA vs Jellyfin: Estação Desktop vs Servidor Doméstico',
    metaTitle: 'Alternativa ao Jellyfin para Windows Sem Servidor - SWAYA',
    metaDescription: 'Procurando uma alternativa ao Jellyfin para PC? O SWAYA organiza arquivos no disco e roda 4K HDR via MPV sem configurações de rede.',
    heroTagline: 'Sua coleção no disco sem containers Docker ou servidores.',
    heroSubtitle: 'O Jellyfin é um excelente servidor para streaming doméstico. Mas se você quer apenas gerenciar e assistir vídeos no seu PC, o SWAYA oferece uma solução desktop direta.',
    competitorPricing: 'Grátis / Open Source (FOSS)',
    swayaPricing: '€39 lançamento vitalício (€79 regular)',
    whenToChooseCompetitor: [
      'Você quer transmitir mídias para Smart TVs e celulares em toda a casa.',
      'Você mantém um servidor Linux/Docker com múltiplos usuários.',
      'Você prioriza software de servidor estritamente open source.',
    ],
    whenToChooseSwaya: [
      'Você assiste a filmes e organiza downloads diretamente no seu PC com Windows.',
      'Você não quer abrir portas de rede, configurar daemons ou perfis de transcodificação.',
      'Você quer renomeação real de arquivos e reprodução nativa em 4K no MPV.',
      'Você quer suporte nativo ao StashDB ao lado de filmes convencionais.',
    ],
    matrix: [
      { feature: 'Zero configuração e zero manutenção de servidores', swayaNote: 'Inicia na hora, sem daemons em background', competitorNote: 'Instalação de servidor obrigatória' },
      { feature: 'Renomeação e organização física de arquivos', swayaNote: 'Movimentação e estrutura reais no disco', competitorNote: 'Biblioteca virtual somente leitura' },
      { feature: 'Player MPV 4K HDR integrado', swayaNote: 'Aceleração de GPU nativa sem travamentos', competitorNote: 'Clientes web/HTML5 ou wrappers' },
      { feature: 'Mídia adulta (StashDB) e Modo Duplo', swayaNote: 'Integração nativa StashDB/FansDB', competitorNote: 'Requer plugins de terceiros' },
      { feature: '100% Offline sem portas de rede abertas', swayaNote: 'Sem portas abertas, 100% local', competitorNote: 'Requer servidor na rede local' },
      { feature: 'Organizador interativo com simulação prévia', swayaNote: 'Controle total e proteção contra conflitos', competitorNote: 'Apenas monitoramento de pastas' },
      { feature: 'Integração com torrents (Modo Seeding)', swayaNote: 'Integração direta com qBittorrent', competitorNote: 'Não suportado' },
      { feature: 'Registro de momentos favoritos e marcadores', swayaNote: 'Captura e marcação com 1 tecla', competitorNote: 'Não disponível' },
    ],
    deepDives: [
      {
        title: 'Simplicidade no desktop vs complexidade de servidores',
        description: 'O Jellyfin requer configuração de portas de rede e serviços. O SWAYA é um aplicativo desktop autônomo que funciona de imediato.',
      },
      {
        title: 'Estrutura real de arquivos no disco',
        description: 'O Jellyfin pressupõe que os arquivos já estejam organizados. O SWAYA faz o trabalho pesado de organizar seus downloads nos discos.',
      },
      {
        title: 'Performance nativa com MPV',
        description: 'Desfrute de avanço instantâneo, legendas perfeitas e reprodução suave em 4K HDR com o motor MPV embutido no SWAYA.',
      },
    ],
    faqs: [
      {
        q: 'Posso usar o SWAYA para organizar pastas para o Jellyfin?',
        a: 'Sim! O SWAYA organiza arquivos de acordo com padrões convencionais reconhecidos perfeitamente pelo Jellyfin.',
      },
      {
        q: 'O SWAYA consome recursos do sistema em segundo plano?',
        a: 'Não. Ao fechar o SWAYA, nenhum serviço ou processo permanece ativo no sistema.',
      },
    ],
  },
  kodi: {
    title: 'SWAYA vs Kodi: Media Center Moderno Sem Plugins Problemáticos',
    metaTitle: 'Alternativa ao Kodi para PC Windows - SWAYA',
    metaDescription: 'Procurando uma alternativa moderna ao Kodi para PC? O SWAYA oferece player MPV, renomeação de arquivos e interface fluida sem plugins frágeis.',
    heroTagline: 'Uma experiência multimídia moderna feita para mouse, teclado e discos.',
    heroSubtitle: 'O Kodi é ideal para televisores com controle remoto, mas desajeitado no monitor do PC. O SWAYA foi desenvolvido sob medida para o desktop Windows.',
    competitorPricing: 'Grátis / Open Source (FOSS)',
    swayaPricing: '€39 lançamento vitalício (€79 regular)',
    whenToChooseCompetitor: [
      'Você mantém um HTPC na TV da sala controlado por controle remoto.',
      'Você utiliza plugins específicos para IPTV ou PVR.',
      'Você quer uma interface de 10 pés para o sofá.',
    ],
    whenToChooseSwaya: [
      'Você utiliza um PC com Windows com mouse e teclado.',
      'Você quer renomeação segura de arquivos e ordem nos seus discos rígidos.',
      'Você quer um programa estável que não quebre após atualizações.',
      'Você quer gerenciar filmes (TMDb) e conteúdo adulto (StashDB) no mesmo app.',
    ],
    matrix: [
      { feature: 'Interface desktop moderna (Mouse e Teclado)', swayaNote: 'Interface fluida para PC', competitorNote: 'Interface de TV para controle remoto' },
      { feature: 'Renomeação e organização física de arquivos', swayaNote: 'Renomeia e move arquivos reais no disco', competitorNote: 'Apenas banco, não renomeia arquivos' },
      { feature: 'Motor de vídeo MPV 4K/HDR integrado', swayaNote: 'Aceleração por hardware sem travamentos', competitorNote: 'Player interno do Kodi' },
      { feature: 'Mídia adulta (StashDB) e Modo Duplo', swayaNote: 'Integração nativa StashDB/FansDB', competitorNote: 'Requer plugins instáveis' },
      { feature: 'Estabilidade sólida sem plugins frágeis', swayaNote: 'Arquitetura integrada e confiável', competitorNote: 'Plugins quebram com frequência em updates' },
      { feature: 'Simulação com proteção contra conflitos', swayaNote: 'Prévia segura antes da movimentação', competitorNote: 'Não aplicável' },
      { feature: 'Integração com torrents (Modo Seeding)', swayaNote: 'Conexão direta com qBittorrent', competitorNote: 'Requer scripts externos' },
    ],
    deepDives: [
      {
        title: 'Foco no computador em vez de interface para TV',
        description: 'O Kodi foi desenhado para controle remoto. O SWAYA foi otimizado para navegação rápida com mouse, janelas e atalhos no Windows.',
      },
      {
        title: 'Renomeação física de arquivos no disco',
        description: 'O Kodi requer arquivos previamente renomeados. O SWAYA faz o trabalho por você, identificando e renomeando os arquivos no disco.',
      },
      {
        title: 'Zero dor de cabeça com manutenção de plugins',
        description: 'Todos os recursos essenciais - scrapers, biblioteca e player - estão nativamente integrados no SWAYA.',
      },
    ],
    faqs: [
      {
        q: 'Posso usar o SWAYA para preparar arquivos para o Kodi?',
        a: 'Sim! O SWAYA organiza arquivos em padrões universais que o Kodi reconhece automaticamente sem erros.',
      },
      {
        q: 'O SWAYA é mais fácil de usar do que o Kodi?',
        a: 'Muito mais fácil. Não requer repositórios, configurações complexas de XML ou instalação de plugins-funciona perfeitamente direto de fábrica.',
      },
    ],
  },
};
