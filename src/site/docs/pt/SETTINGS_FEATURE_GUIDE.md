# Guia de Configurações & Preferências do SWAYA

A página de **Configurações (Settings)** é a central de comando do SWAYA. Ela permite personalizar como os arquivos são escaneados, identificados, renomeados e organizados nos seus discos, configurar o player de vídeo, personalizar o visual com mais de 30 temas e gerenciar scrapers de metadados.

---

## Visão Geral do Sistema

Todos os módulos do SWAYA utilizam suas configurações em tempo real:

```
 ┌──────────────────────┐      ┌────────────────────────┐      ┌──────────────────────┐
 │   MÍDIA DE ENTRADA   │ ───► │      MOTOR SWAYA       │ ───► │ BIBLIOTECA ORGANIZADA│
 │ Downloads caóticos e │      │ Identifica metadados,  │      │ Pastas limpas, nomes │
 │ vídeos brutos        │      │ formata nomes e regras │      │ perfeitos, pôsteres  │
 └──────────────────────┘      └───────────┬────────────┘      └──────────────────────┘
                                           │
                        Lê suas regras personalizadas de
                                 CONFIGURAÇÕES
```

---

## Seção 1: Os 3 Modos de Organização

O SWAYA suporta três métodos para gerenciar mídias nos seus discos:

| Modo | O Que Faz no Disco |
| :--- | :--- |
| **1. Mover & Organizar** *(Biblioteca)* | Move os arquivos da pasta de download para subpastas estruturadas (ex: `Filmes/Inception (2010)/Inception (2010) [1080p].mkv`). |
| **2. Renomear no Local** | Renomeia os arquivos no local exato onde estão, sem movê-los entre pastas. |
| **3. Apenas Registrar** | Indexa a mídia no banco do SWAYA e busca pôsteres sem alterar nomes ou diretórios no disco. |

---

## Seção 2: O Motor de Organização e Nomenclatura

### 1. Predefinições Prontas vs Controle Personalizado

Em **Organização > Predefinições**, você pode selecionar padrões conhecidos do setor:

* **Plex:** `Filmes/Inception (2010)/Inception (2010) [1080p].mkv` & `Séries/Breaking Bad/Season 01/Breaking Bad - S01E01.mkv`
* **Jellyfin / Emby:** `Filmes/Inception (2010)/Inception (2010).mkv` com artes `backdrop.jpg` e `logo.png`
* **Kodi:** Estrutura com marcadores de ano e resolução.
* **Mínimo:** Nomes limpos sem subpastas aninhadas.

### 2. Resolução de Conflitos (`Estratégia de Duplicados`)
* `Substituir se for melhor` *(Recomendado)*: Compara resolução (4K > 1080p > 720p), bitrate e canais de áudio, verificando a duração para evitar trocar um filme por uma amostra.
* `Manter ambos`: Renomeia o novo arquivo com número sequencial (ex: `Inception (2010) [1].mkv`).
* `Sobrescrever`: Substitui incondicionalmente o arquivo existente.
* `Ignorar`: Mantém o arquivo de destino intacto e cancela a movimentação.

### 3. Tags Dinâmicas nos Modelos
* `{title}`: Título oficial identificado
* `{year}`: Ano de lançamento com 4 dígitos
* `{resolution}`: Tag de qualidade (`1080p`, `2160p (4K)`)
* `{edition}`: Edição especial (`Director's Cut`, `Extended`)
* `{show}`, `{season}`, `{episode}`: Série de TV, temporada e episódio (`S01E01`)
* `{studio}`, `{performers}`, `{date}`: Estúdio, artistas e data de lançamento

---

## Seção 3: Principais Configurações do App

1. **Geral:** Perfil de usuário, pasta de downloads de entrada, pasta da biblioteca de destino e idioma da interface.
2. **Aparência & Temas:** Mais de 30 temas visuais (Dark Clássico, Tokyo Night, Dracula, AMOLED Modern, Synthwave, Cyberpunk, Nord).
3. **Player & Idiomas:** Escolha entre player integrado, VLC ou MPC-HC; seleção inteligente de faixas de áudio e legendas automáticas.
4. **Conteúdo Adulto & Filtros:** Pasta isolada para conteúdo adulto, preferência de gênero de artistas e lista de bloqueio de tags para recomendações.
5. **Integrações de API:** Configuração de chaves para TMDb, OMDb, StashDB, FansDB e ThePornDB.
6. **Automação de Torrents:** Conexão com qBittorrent e Jackett para pesquisar e baixar diretamente pelo SWAYA.
7. **Manutenção & Backup:** Exportação/importação de configurações em arquivo `.json`, limpeza de cache de metadados e restauração de padrões.

---

## Atalhos de Produtividade
* **`Ctrl + S` / `Cmd + S`:** Salva instantaneamente todas as alterações nas configurações.
* **Busca na barra lateral:** Filtre abas rapidamente digitando termos de busca (ex: *"tmdb"*, *"vlc"*, *"legendas"*).
