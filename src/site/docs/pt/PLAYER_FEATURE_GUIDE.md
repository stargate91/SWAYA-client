# Guia do Player MPV do SWAYA

O **Player MPV Integrado** é o motor de reprodução multimídia do SWAYA. Ele reproduz filmes, episódios de TV, cenas adultas e vídeos pessoais diretamente no aplicativo com aceleração total por GPU, sincronização de legendas, navegação por capítulos e salvamento de momentos favoritos.

---

## O Que o Torna Especial

Ao contrário de players genéricos baseados na web, o SWAYA roda um motor nativo **MPV**:

* **Reproduz Praticamente Qualquer Formato:** MKV, MP4, AVI, WebM, TS, MOV com qualquer codec de áudio (Dolby Atmos, DTS-HD, TrueHD, FLAC, AAC) e formato de legendas (ASS, SRT, VTT, PGS).
* **Retomada Exata por Quadro:** Lembra a posição exata da reprodução e sincroniza automaticamente com o banco de dados a cada 5 segundos.
* **Ajuste Inteligente a Barras Pretas:** Os controles na tela detectam a proporção real do vídeo e se alinham à borda visível da imagem.
* **Picture-in-Picture & Tela Cheia:** Clique duas vezes em qualquer lugar ou pressione `F` para alternar entre janela e tela cheia.

---

## Suporte a Modo Duplo (SFW & NSFW)

O player adapta sua interface com base no conteúdo reproduzido:

* **Mídia Convencional (Filmes & Séries de TV):** Focado em marcadores de capítulos, seleção de múltiplas faixas de áudio, legendas embutidas e externas, velocidade e sugestões de próximos episódios.
* **Mídia Adulta (Cenas & Filmes):** Desbloqueia o sistema de **Registro de Momentos**, permitindo salvar capturas e registrar os momentos marcantes com uma única tecla.

---

## Atalhos Completos de Teclado e Mouse

Controle todas as funções sem tirar as mãos do teclado:

| Atalho | Ação | Descrição |
| :--- | :--- | :--- |
| **Espaço** / **Spacebar** | Reproduzir / Pausar | Alterna a reprodução com confirmação na tela |
| **Enter** | Registrar Momento *(Mídia adulta)* | Tira um screenshot e salva o timestamp exato |
| **Seta Esquerda** | Retroceder | Volta 10 segundos |
| **Seta Direita** | Avançar | Avança 10 segundos |
| **Seta Cima** | Aumentar Volume | Aumenta o volume em 5% |
| **Seta Baixo** | Diminuir Volume | Diminui o volume em 5% |
| **Roda do Mouse** | Ajustar Volume | Role para cima ou para baixo para ajustar o som |
| **Duplo Clique** | Tela Cheia | Alterna entre modo janela e tela cheia |
| **M** | Mudo | Silencia ou restaura o áudio |
| **F** | Tela Cheia / PiP | Entra ou sai do modo tela cheia |
| **G** | Atraso de Legenda - | Adianta a legenda em 100ms |
| **H** | Atraso de Legenda + | Atrasa a legenda em 100ms |
| **J** | Atraso de Áudio - | Adianta o áudio em 100ms para corrigir dessincronização |
| **K** | Atraso de Áudio + | Atrasa o áudio em 100ms para corrigir dessincronização |

---

## Registro de Momentos Salvos (Modo Adulto)

Durante a reprodução de mídias adultas, o SWAYA oferece um recurso prático de marcação:

### 1. Registrando um Momento com Uma Tecla (`Enter`)
Sempre que ocorrer um momento especial durante a reprodução:
* Pressione a tecla **`Enter`** no teclado ou clique no botão de **Momento** (ícone de gotas) na barra de controle.
* O SWAYA captura instantaneamente uma imagem em alta resolução do quadro exato do vídeo.
* O marcador de tempo preciso (ex: `14:32`) e a data são gravados no banco de dados local.
* O botão pisca em verde confirmando o salvamento.

### 2. Encontrando Seus Momentos Salvos
Todos os momentos registrados ficam disponíveis em dois lugares:
* **Página de Histórico (`/history?tab=peaks`):** Galeria cronológica com miniaturas capturadas, título e marcador de tempo. Clicar em **Reproduzir Momento** inicia o player exatamente no segundo registrado.
* **Página de Detalhes da Mídia:** A seção dedicada **Momentos Salvos** exibe todos os registros daquele título.

---

## Controles e Menus na Tela

Ao passar o mouse sobre o player, a barra de controle é exibida:

* **Barra de Progresso & Capítulos:** Marcadores de capítulos na linha do tempo com prévia ao passar o mouse.
* **Relógio & Término Estimado:** Exibe a hora atual e a previsão de término da reprodução (ex: *"Termina às 22:45"*).
* **Seletor de Faixa de Áudio:** Alterne facilmente entre faixas de áudio embutidas e arquivos externos.
* **Seletor de Legendas:** Permite escolher legendas embutidas, carregar arquivos `.srt` / `.ass` ou desativá-las.
* **Controle de Velocidade:** Ajuste a velocidade de 0.25x (câmera lenta) até 4x (avanço rápido).
* **Botão Parar:** Salva o progresso imediatamente, fecha o player e retorna à visualização anterior da biblioteca.
