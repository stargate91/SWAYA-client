# Guia de Downloads & Torrents do SWAYA

Baixar filmes e séries de TV no SWAYA é extremamente simples. Este guia explica como os componentes trabalham juntos, como configurar em 3 passos rápidos e como gerenciar seus downloads sem sair do aplicativo.

---

## Como Funciona (A Visão Geral)

Três ferramentas trabalhando em perfeita harmonia:
1. **Você** encontra um filme ou série no SWAYA e clica em **Download**.
2. **Jackett** (integrado no SWAYA) busca lançamentos nos seus sites de rastreadores favoritos.
3. **qBittorrent** recebe o torrent e realiza o download real dos arquivos.
4. **SWAYA** exibe o progresso em tempo real para monitorar velocidades, pausar, retomar ou iniciar seed.

---

## Configuração Rápida em 3 Passos

1. **Ative os Downloads no SWAYA:**
   * Vá em **Configurações** > **Integração de Torrents** e ative **Automação de Downloads**.
2. **Conecte o qBittorrent:**
   * No qBittorrent: **Ferramentas** > **Opções** > **Interface Web (Web UI)**.
   * Ative o acesso remoto (porta `8080`, usuário e senha).
   * Insira essas credenciais no SWAYA e defina a pasta de download.
3. **Adicione Rastreadores no Jackett:**
   * Nas configurações do SWAYA, clique em **Abrir Painel do Jackett**.
   * Clique em **Adicionar indexador** e adicione seus sites favoritos.

---

## Como Buscar e Baixar Mídias

* **Busca em 1 Clique:** Clique no ícone de **Download** (nuvem com seta para baixo) em qualquer card ou página de detalhes. O SWAYA preenche automaticamente o título, ano ou episódio.
* **Escolha a Melhor Versão:** Filtre por qualidade (*1080p*, *4K*), codec (*x264*, *HEVC*) ou fonte. Clique em **Download** para enviar ao qBittorrent.
* **Gerenciamento na Página de Downloads:** Acompanhe velocidades em tempo real, pause, retome ou controle o envio (seeding) com filtros inteligentes (`Todos`, `Baixando`, `Concluídos`, `Pausados`).
