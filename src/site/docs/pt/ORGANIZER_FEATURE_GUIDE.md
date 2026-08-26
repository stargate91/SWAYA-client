# Guia do Organizador e Gerenciamento de Arquivos do SWAYA

O **Organizador (Organizer)** é a central de classificação do SWAYA. Pense nele como um assistente inteligente que analisa sua pasta de downloads bagunçada, identifica a qual filme, série ou cena cada arquivo pertence, busca pôsteres e descrições na internet e organiza tudo perfeitamente em pastas limpas no seu disco.

---

## Como Funciona: As 2 Formas de Organizar

Quando estiver pronto para processar seus arquivos, o SWAYA oferece dois caminhos distintos:

### 1. Organizar, Renomear e Mover (Padrão)
O SWAYA pega seus arquivos, limpa os nomes caóticos (ex: transformando `Inception.2010.1080p.BluRay.x264.mkv` em `Inception (2010) [1080p].mkv`), cria estruturas organizadas de pastas no seu disco e move tudo para a sua biblioteca permanente.

### 2. Importar no Local (Arquivos Intocados no Disco)
Se você faz seed de torrents, compartilha arquivos com outros softwares ou prefere manter a estrutura física intacta no disco, você pode importar os arquivos **no local (In-Place)**:
* O SWAYA coleta todos os ricos metadados, pôsteres, elenco, avaliações e imagens de fundo para sua biblioteca.
* Os arquivos físicos no disco rígido permanecem em suas pastas originais com seus nomes originais.
* **Como usar:** Clique na pequena seta no canto direito do botão principal **Renomear** e escolha **Organizar no Local (Organize In-Place)**.

---

## O Que Configurar Antes de Iniciar

Antes de executar uma varredura, acesse as **Configurações** para definir suas preferências de organização:

1. **Pastas de Destino da Biblioteca:** Onde devem ficar os filmes, séries e cenas organizados? Você pode definir uma pasta geral para conteúdo convencional e uma pasta privada separada para mídia adulta, ou compartilhar a mesma raiz.
2. **Estrutura de Pastas & Modelos:** Escolha a profundidade das pastas (ex: `Filmes/Inception (2010)/...` vs. listas planas), a anotação de edições (ex: `Director's Cut`) e o formato de anos e resoluções.
3. **Arquivos Extras & Legendas:** Decida o que acontece com trailers, amostras, legendas (.srt) e artes (.nfo, .jpg). O SWAYA pode agrupá-los em uma subpasta `Extras/` ou mantê-los ao lado do vídeo principal.
4. **Resolução de Conflitos:** Se um arquivo com o mesmo nome já existir na biblioteca, você pode instruir o SWAYA a manter ambos, ignorar o novo, sobrescrever ou substituir apenas se o novo tiver qualidade superior.

---

## Suporte a Modo Duplo & Scrapers Disponíveis

O Organizador se adapta ao modo **Geral (SFW)** ou **Adulto (NSFW)** através da chave seletora na barra superior:

### Modo Geral (SFW)
* **Filmes & Séries de TV:** Alimentado pelo **TMDb** (The Movie Database). Uma chave de API permite a identificação automática de títulos, episódios, datas de lançamento, gêneros e estúdios.

### Modo Adulto (NSFW)
* **Filmes Adultos:** Identificação via **TMDb** e **ThePornDB**.
* **Séries Adultas:** Identificação via **TMDb**.
* **Cenas Adultas:** Identificação de altíssima precisão através do **StashDB**, **FansDB** e **ThePornDB**, com correspondência exata de artistas, estúdios, datas e capas em alta resolução.

### Modo Vídeo / Offline (Ambos os Modos)
* **Sem Necessidade de Chaves de API:** Funciona diretamente sem conexão com a internet ou contas de terceiros.
* **Ideal Para:** Vídeos caseiros, gravações de smartphone, clipes raros ou mídias de nicho inexistentes em bancos de dados públicos online.
* **Como Funciona:** Importa o vídeo com informações técnicas essenciais (resolução, codecs, canais de áudio, duração).

---

## Ferramentas Poderosas no Organizador

O Organizador oferece controle total antes que qualquer arquivo seja movido ou renomeado:

| Arquivo no Disco | Título Identificado | Tipo de Correspondência | Ações |
| :--- | :--- | :--- | :--- |
| `mov_01.mkv` | `Inception (2010)` | Filme | [Corresponder] [Editar] [...] |
| `ep_s01e01.mp4` | `Breaking Bad - S01E01` | Episódio de TV | [Corresponder] [Editar] [...] |

### 1. Modal de Correspondência (Match Modal)
Se a varredura automática não encontrar um título ou identificar o item errado:
* Clique no botão **Corresponder (Match)** em qualquer linha da tabela.
* Uma janela de busca se abre onde você pode ajustar a pesquisa, filtrar por ano ou trocar o provedor de metadados na hora.
* Para séries de TV, você pode navegar por todas as temporadas e episódios com miniaturas e descrições, escolhendo o episódio exato com um único clique.

### 2. Modal de Substituição (Override Modal)
Precisa ajustar detalhes específicos antes de aplicar?
* Clique no botão **Editar / Substituir** em uma linha.
* Modifique o título identificado, ano de lançamento, número da temporada ou do episódio.
* Defina tags de edição (ex: `Theatrical Cut`, `Extended Edition`, `Remastered`).
* Especifique formatos de áudio (ex: `Dual Audio`, `Surround Sound`, `Commentary`).
* Reclassifique o item (ex: transforme um arquivo de filme em extra, bônus ou trailer).

### 3. Ações Diretas & Menu de Contexto com Botão Direito
Cada linha de arquivo conta com botões de ação rápida:
* **Corresponder:** Abre o navegador de candidatos e pesquisa.
* **Substituir:** Edita metadados personalizados e classificação.
* **Inspecionar:** Visualiza detalhes de fluxos de mídia (bitrate de vídeo, codecs de áudio, faixas de legendas).
* **Bloquear:** Trava uma correspondência para que varreduras futuras não a alterem.
* **Ignorar / Remover:** Exclui o arquivo do lote de organização atual.
* **Menu de Contexto do Botão Direito:** Clicar com o botão direito em qualquer linha abre um menu de contexto completo com todas as ações disponíveis.

### 4. Barra de Ações Flutuante & Operações em Massa
Ao selecionar vários arquivos usando as caixas de seleção à esquerda:
* Uma moderna **Floating Action Bar** aparece na parte inferior da tela.
* **Substituição em Massa:** Edite vários arquivos ao mesmo tempo (definir o mesmo nome de série, aplicar tags de edição ou renumerar episódios em sequência com arrastar e soltar).
* **Corresponder em Massa:** Execute buscas em lote em todas as linhas selecionadas.
* **Ignorar & Remover em Massa:** Exclua grandes grupos de arquivos com um único clique.
