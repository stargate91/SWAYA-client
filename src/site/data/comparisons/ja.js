export const ja = {
  filebot: {
    title: 'SWAYA vs FileBot: 最新デスクトップメディアワークステーション＆ファイル一括リネーマー',
    metaTitle: 'Windows / Linux向けFileBotの決定版オルタナティブ - SWAYA 一括リネーム＆MPVプレイヤー',
    metaDescription: 'FileBotのモダンな代替ソフトをお探しですか？SWAYAはTMDbやStashDBでファイルをリネームし、オフラインライブラリと4K MPVプレイヤーを1つに統合。',
    heroTagline: '単なるファイル名変更で終わらせず、コレクション全体の整理と再生を楽しみませんか？',
    heroSubtitle: 'FileBotはファイル名変更に優れていますが、SWAYAはローカルメディアを次の次元へ導きます。ディスク整理、美しいオフラインライブラリ、そして内蔵4K HDR MPVプレイヤーをひとつのWindowsデスクトップアプリに統合しました。',
    competitorPricing: '年額 $6 または 永久ライセンス $48',
    swayaPricing: '発売記念 永久ライセンス €39（通常 €79）',
    whenToChooseCompetitor: [
      'ヘッドレスLinuxやNASスクリプト用の軽量なコマンドライン（CLI）ツールのみが必要な場合。',
      '高度なGroovyリネーム式や自動化スクリプトフックを自作したい場合。',
      'すでに別のメディアサーバー（PlexやKodi）を利用しており、内蔵プレイヤーが不要な場合。',
    ],
    whenToChooseSwaya: [
      'ディスク上のファイル整理・リネームと、即座のライブラリ閲覧・再生を1つのアプリで完結させたい場合。',
      '一般の映画・アニメ・ドラマ（TMDb）とアダルト作品（StashDB、FansDB、ThePornDB）の両方を管理したい場合。',
      'フレーム精度のレジューム再生に対応し、トランスコード不要のハードウェアアクセラレーション対応MPVプレイヤーが欲しい場合。',
      '安全なドライラン（事前確認）とファイル競合防止機能を備えた美しいWindowsアプリを好む場合。',
    ],
    matrix: [
      { feature: 'ディスク上の物理ファイルのリネームと整理', swayaNote: 'TMDb, ThePornDB, StashDB, FansDB', competitorNote: 'TheMovieDB, TVmaze, AniDB' },
      { feature: 'ドライランプレビュー＆競合防止機能', swayaNote: 'スマートな競合検出と安全な置き換え', competitorNote: 'プレビューリスト表示' },
      { feature: '内蔵4K/HDR MPVビデオプレイヤー', swayaNote: 'ハードウェアGPU再生、字幕＆音声同期', competitorNote: 'プレイヤー機能なし' },
      { feature: '視覚的なオフラインライブラリ＆詳細ページ', swayaNote: 'ポスター、背景画像、キャスト、ジャンル、評価', competitorNote: 'ライブラリUIなし' },
      { feature: 'アダルトメディア＆StashDBスクレイパー対応', swayaNote: 'StashDB・FansDBネイティブ連携＆出演者索引', competitorNote: '一般データベースのみ' },
      { feature: 'PIN保護付きデュアルモード（SFW / NSFW）', swayaNote: '完全なデータベース分離と瞬時ロック', competitorNote: '非対応' },
      { feature: 'Torrentクライアント自動取り込み（qBittorrent）', swayaNote: '直接統合＆その場でシード維持インポート', competitorNote: 'カスタムCLIスクリプト経由のみ' },
      { feature: '100% オフライン＆サーバー不要（常駐デーモン0）', swayaNote: 'バックグラウンド常駐サービス・開放ポートなし', competitorNote: 'ローカルJavaアプリケーション' },
      { feature: 'モダンなWindows UI（Java環境不要）', swayaNote: 'ネイティブなデスクトップアプリケーション', competitorNote: 'Java / Swing インターフェース' },
      { feature: '一度の購入でずっと使える永久ライセンス', swayaNote: '発売記念 €39 / 通常 €79 買い切り', competitorNote: '$48 買い切り または 年額 $6' },
    ],
    deepDives: [
      {
        title: 'リネームの枠を超えた、完全なメディア体験',
        description: 'FileBotの役割はファイル名を変えた時点で終わります。SWAYAはリネームされたファイルを即座にポスター、出演者情報、エピソード概要、カスタムフィルターを備えた豊かなライブラリへと昇華させます。',
      },
      {
        title: '内蔵4K HDR MPVプレイヤー',
        description: '外部プレイヤーを起動する必要はありません。SWAYA内の動画をクリックするだけで、高ビットレートMKV、HDR、Dolby Atmos、多言語字幕をGPUアクセラレーションで即座に快適再生できます。',
      },
      {
        title: '一般作品とアダルト作品をひとつのアプリで',
        description: 'SWAYAは業界初のデュアルモード構造を採用。TMDbによる映画・アニメとStashDBによるシーンを、PINコードロックで完全に分離・保護しながら快適に共存管理できます。',
      },
    ],
    faqs: [
      {
        q: 'アニメや映画の一括リネームにおいて、SWAYAはFileBotの代わりになりますか？',
        a: 'はい。ダウンロードフォルダをスキャンし、TMDbでタイトルを照合、エピソードの手動調整も可能で、設定した命名規則に沿って物理ファイルを自動整理・リネームします。',
      },
      {
        q: '整理中もTorrentのシード（アップロード）を維持できますか？',
        a: 'はい。「その場でインポート」機能により、ディスク上のファイルパスや名前を変更せずにメタデータとポスターのみをライブラリに取り込むことが可能です。',
      },
      {
        q: 'SWAYAを動かすのにJavaのインストールは必要ですか？',
        a: 'いいえ。SWAYAはスタンドアロンのネイティブWindowsアプリのため、Javaや外部ランタイムのインストールは一切不要です。',
      },
    ],
  },
  plex: {
    title: 'SWAYA vs Plex: サーバー不要の完全100%オフラインメディアワークステーション',
    metaTitle: 'Windows / Linux向けPlex代替ソフト（サーバー不要） - SWAYA',
    metaDescription: 'サーバー設定なしで使えるプライベートなPlexオルタナティブをお探しですか？SWAYAはハードディスクのファイルを整理し、アカウント不要で4K HDRをMPV再生します。',
    heroTagline: 'サーバー、クラウド連携、テレメトリーに縛られないあなただけのコレクション。',
    heroSubtitle: 'Plexは家庭内ネットワーク配信向けですが、常時稼働のサーバーデーモン、クラウドログイン、有料サブスクが必要です。SWAYAはゼロ設定で100%オフラインの快適なデスクトップ体験を提供します。',
    competitorPricing: '無料 / 月額 $4.99 / 永久 $119 (Plex Pass)',
    swayaPricing: '発売記念 永久ライセンス €39（通常 €79）',
    whenToChooseCompetitor: [
      'スマートTVやスマートフォン、外出先の家族へメディアをストリーミング配信したい場合。',
      '複数ユーザー向けのリアルタイムトランスコードを行う専用NASやホームサーバーを構築している場合。',
      'iOS、Android、Apple TV間での再生進捗リモート同期が必要な場合。',
    ],
    whenToChooseSwaya: [
      '映画やアニメをWindows or Linux PC、ノートPC、直結モニターで楽しむ場合。',
      '100%のプライバシーを守りたい場合（クラウド登録ゼロ、テレメトリーゼロ、開放ポートゼロ）。',
      'ハードディスク内の物理ファイル自体を綺麗にリネーム・フォルダ分類したい場合。',
      'サーバーのメンテやトランスコードの不具合・カクつきから解放されたい場合。',
    ],
    matrix: [
      { feature: '100% オフライン＆サーバー設定一切不要', swayaNote: '即起動のデスクトップアプリ、常駐デーモンなし', competitorNote: 'Plex Media Serverの常駐が必要' },
      { feature: 'ディスク上の物理ファイルのリネーム＆整理', swayaNote: '実際のファイルを直接整理・リネーム', competitorNote: '仮想DBのみ（ファイル本体は未変更）' },
      { feature: 'クラウド登録不要 / 完全なプライバシー', swayaNote: 'ログイン不要、ローカルSQLiteデータベース', competitorNote: 'Plexオンライン認証とテレメトリー必須' },
      { feature: 'ネイティブMPVプレイヤー（トランスコード不要）', swayaNote: 'あらゆるコーデックを4K HDRで直接再生', competitorNote: '再生時に不要なトランスコードが頻発' },
      { feature: 'アダルトメディア（StashDB）＆デュアルモード', swayaNote: '専用アダルトモード＆StashDB/FansDB', competitorNote: '不安定な非公式プラグインが必要' },
      { feature: '対話型ドライラン（事前テスト）整理機能', swayaNote: '移動・リネーム前に編集・確認可能', competitorNote: '受動的なフォルダ監視のみ' },
      { feature: 'Torrentクライアント直接連携（シード維持）', swayaNote: 'qBittorrent / Transmission直接連携', competitorNote: '標準では非対応' },
      { feature: '月額不要の永久買い切り価格', swayaNote: '発売記念 €39 一回限りの支払い', competitorNote: 'Plex Pass 永久 $119 または 月額 $4.99' },
      { feature: 'フレーム精度の名場面ブックマーク', swayaNote: 'Enterキー1発でスクショ＆タイムスタンプ保存', competitorNote: '非対応' },
      { feature: 'アプリ終了後のCPU/メモリ負荷ゼロ', swayaNote: '閉じればシステム負荷は完全にゼロ', competitorNote: 'バックグラウンドで常にサーバーが稼働' },
    ],
    deepDives: [
      {
        title: 'サーバーの常駐負荷もポート開放も一切なし',
        description: 'PlexはMedia Serverの常駐やポート設定、外部サーバー障害への対応が必要です。SWAYAは起動1秒の軽量デスクトップソフトで、指示なしに勝手に外部通信することはありません。',
      },
      {
        title: '仮想ライブラリではなく、実際の物理ディスクを整理',
        description: 'Plexは乱雑なフォルダの上に仮想的にメタデータをかぶせるだけです。SWAYAは物理ドライブ上の実際のファイルやフォルダを直接綺麗に構造化します。',
      },
      {
        title: 'トランスコードのイライラから解放されるネイティブMPV',
        description: '4K HDRの再生やPGS/ASS字幕の描画でPlexが重くなっていませんか？SWAYAに内蔵されたMPVエンジンは、あらゆる動画コーデックをGPUアクセラレーションで滑らかに再生します。',
      },
    ],
    faqs: [
      {
        q: 'インターネット接続がない環境でもSWAYAは使えますか？',
        a: 'はい！SWAYAは完全な100%オフライン設計です。メタデータ取得後（または独自動画）は、ネット環境がなくてもすべての検索や再生が快適に行えます。',
      },
      {
        q: 'SWAYAはPlexのようにスマホやテレビにストリーミングできますか？',
        a: 'SWAYAはPCおよびノートPC向けの高性能ローカルデスクトップワークステーションとして設計されており、外部機器へのストリーミング機能は意図的に備えていません。',
      },
      {
        q: 'SWAYAは再生履歴を送信したりログインを要求しますか？',
        a: 'いいえ。SWAYAはアカウント登録もオンラインログインも不要で、視聴履歴などのテレメトリーを送信することは一切ありません。すべてのデータはお手元のPC内にのみ保存されます。',
      },
    ],
  },
  tinymediamanager: {
    title: 'SWAYA vs tinyMediaManager: 最新メディアオーガナイザー＆プレイヤー',
    metaTitle: 'Windows / Linux向けtinyMediaManager代替ソフト - SWAYA',
    metaDescription: 'tinyMediaManagerに代わるモダンな管理ソフトをお探しですか？SWAYAは高速な一括リネーム、TMDb/StashDB取得、内蔵4K MPVプレイヤーをJava不要で実現。',
    heroTagline: '重いJava製UIに悩まされることなく、メディアの整理から視聴までを瞬時に。',
    heroSubtitle: 'tinyMediaManagerは高機能なNFOジェネレータですが、Javaを必要とし再生プレイヤーがありません。SWAYAはディスクの物理整理、洗練されたライブラリ、4K MPV再生をひとまとめにしました。',
    competitorPricing: '年額 €15 (v4/v5 Pro)',
    swayaPricing: '発売記念 永久ライセンス €39（通常 €79）',
    whenToChooseCompetitor: [
      'Kodi環境に読み込ませるための極めて詳細な.NFOファイルを生成したい場合。',
      'macOS、Linux、Windowsの混在環境で同一ソフトを動かしたい場合。',
      'XML/NFOの詳細なタグを手動で細かく編集したい場合。',
    ],
    whenToChooseSwaya: [
      'Javaのインストールなしで、軽快でモダンなWindowsデスクトップアプリを使いたい場合。',
      '整理・閲覧・1クリック再生をすべて1つのソフトでシームレスに行いたい場合。',
      '一般作品（映画・アニメ）とアダルト作品（StashDB、FansDB）を1つの場所で管理したい場合。',
      '年額更新ではなく、一度の支払いで永久に使い続けられるライセンスが欲しい場合。',
    ],
    matrix: [
      { feature: '物理ディスクのリネームとフォルダ構造化', swayaNote: 'スマートテンプレート＆安全な競合回避', competitorNote: 'パターン指定リネーマー' },
      { feature: 'ハードウェアアクセラレーション内蔵動画プレイヤー', swayaNote: 'ネイティブ4K HDR MPVプレイヤー', competitorNote: '再生エンジン非搭載' },
      { feature: 'アダルトメディア（StashDB / FansDB）スクレイパー', swayaNote: '専用スクレイパー＆出演者インデックス', competitorNote: '非対応' },
      { feature: 'PIN保護付きデュアルモード（プライバシー保護）', swayaNote: '完全分離データベース＆クイックロック', competitorNote: 'プライバシー・デュアルモードなし' },
      { feature: 'モダンなUI（Javaランタイム不要）', swayaNote: '軽量で応答性の高いネイティブアプリ', competitorNote: 'Java Swing インターフェース' },
      { feature: '対話型の照合・編集モーダル', swayaNote: '高速検索・エピソード選択・タグ編集', competitorNote: 'スクレイパーダイアログ' },
      { feature: 'Torrentクライアント連携（シード維持）', swayaNote: 'その場でインポート＆クライアント連携', competitorNote: '非対応' },
      { feature: '視聴履歴＆名場面タイムスタンプ管理', swayaNote: '詳細な再生統計・ピン留め機能', competitorNote: '簡易的な視聴フラグのみ' },
      { feature: 'ライセンス形態', swayaNote: '一括買い切りの永久ライセンス（€39）', competitorNote: '年額 €15 のサブスクリプション' },
    ],
    deepDives: [
      {
        title: '整理・閲覧・再生をひとつに集約',
        description: 'tinyMediaManagerではメタデータを編集したあと、動画を見るためにVLCやMPCなどの外部プレイヤーを毎回起動する必要があります。SWAYAなら洗練された1つのアプリで全て完結します。',
      },
      {
        title: '毎年の更新料が不要な永久ライセンス',
        description: 'tMM v4/v5はオンラインスクレイパーを利用するために年額€15の更新が必要です。SWAYAは一度の購入（€39）で将来のアップデートも含めて永久に利用できます。',
      },
      {
        title: '一般作品とアダルト作品の包括的なスクレイピング',
        description: 'tMMは一般映画・ドラマのみに対応していますが、SWAYAはStashDBやFansDB、ThePornDBにもネイティブ対応しており、すべてのメディアを一括管理できます。',
      },
    ],
    faqs: [
      {
        q: 'SWAYAはKodiやJellyfinで読み込める形式で整理してくれますか？',
        a: 'はい。Plex、Jellyfin、Kodiの標準的な命名規則とフォルダ階層に沿って整理するため、他のメディアソフトでも正確に認識されます。',
      },
      {
        q: 'SWAYAはJava製の管理ソフトより高速に起動しますか？',
        a: 'はい。Java Virtual Machine（JVM）の起動ラグがないため、最小限のメモリ消費で瞬時に起動します。',
      },
    ],
  },
  stash: {
    title: 'SWAYA vs StashApp: Webサーバー不要のネイティブデスクトップワークステーション',
    metaTitle: 'Windows / Linux向けStashApp代替ソフト - SWAYA デスクトップオーガナイザー',
    metaDescription: 'StashAppのWindowsネイティブな代替ソフトをお探しですか？SWAYAはStashDBスクレイピング、ファイル整理、内蔵MPVプレイヤーをWebサーバーなしで実現。',
    heroTagline: 'Localhost WebサーバーやDockerに頼らない、究極のプライベートメディアステーション。',
    heroSubtitle: 'Stashは優れたアダルトメディアサーバーですが、ブラウザ上のWebアプリとして動作します。SWAYAはTMDbとStashDBの両方をネイティブに扱い、MPVプレイヤーを内蔵したWindows専用ソフトです。',
    competitorPricing: '無料 / オープンソース',
    swayaPricing: '発売記念 永久ライセンス €39（通常 €79）',
    whenToChooseCompetitor: [
      'ヘッドレスLinuxサーバーやDocker上で運用し、複数端末からブラウザアクセスしたい場合。',
      '特殊なサイト用の自作コミュニティプラグインを活用したい場合。',
      'ブラウザ上で動作するオープンソースのWebアプリを好む場合。',
    ],
    whenToChooseSwaya: [
      'バックグラウンドでWebサーバー（`localhost:9999`）を常駐させず、単体のWindowsアプリとして使いたい場合。',
      '映画・アニメ（TMDb）とアダルト作品（StashDB）を1つのアプリでスマートに切り替えたい場合。',
      '物理ディスク上のファイルを安全にリネーム・フォルダ分類したい場合。',
      'ブラウザの制約を受けず、重い4K 60fps/VR動画もGPUアクセラレーションで滑らかにMPV再生したい場合。',
    ],
    matrix: [
      { feature: 'ネイティブアプリ（Localhostサーバー不要）', swayaNote: '単一実行ファイル、常駐デーモン0', competitorNote: 'localhost:9999でGoサーバーが常駐' },
      { feature: '物理ディスク上のファイル名変更＆フォルダ整理', swayaNote: '実際のファイルをリネーム＆移動', competitorNote: '監視フォルダ内のファイルはそのまま' },
      { feature: 'デュアルモード：一般（TMDb）＋アダルト（StashDB）', swayaNote: 'SFWとNSFWを1クリックで安全切替', competitorNote: 'アダルトメディア専用' },
      { feature: 'GPUアクセラレーション対応ネイティブ4K MPV', swayaNote: 'あらゆる形式をコマ落ちなく快適再生', competitorNote: 'ブラウザHTML5プレイヤー（対応形式に制限）' },
      { feature: '対話型の照合・一括編集モーダル', swayaNote: '安全なドライラン一覧と一括操作', competitorNote: 'タガーインターフェース' },
      { feature: '出演者プロフィール・スタジオレーベル・タグ', swayaNote: '詳細な出演者情報＆写真ギャラリー', competitorNote: '出演者データベース' },
      { feature: 'Enterキー1発の名場面保存＆スクショ記録', swayaNote: 'タイムラインへのピン留め＆ギャラリー', competitorNote: 'シーンマーカー＆O-meter' },
      { feature: 'PIN保護によるプライバシーロック', swayaNote: '瞬時ロック＆アダルトDBの完全非表示', competitorNote: '簡易認証プラグイン' },
      { feature: 'Torrentクライアント直接統合（qBittorrent）', swayaNote: '直接同期＆シード維持インポート', competitorNote: '外部スクリプトが必要' },
    ],
    deepDives: [
      {
        title: 'ブラウザのコーデック制限を超越するネイティブMPV',
        description: 'StashはブラウザのHTML5で動画を再生するため、HEVC 10-bitや高ビットレート4Kなどで再生不可やトランスコード負荷が発生しがちです。SWAYA内蔵のMPVプレイヤーはCPUに負荷をかけず快適に再生します。',
      },
      {
        title: 'すべてのメディアを統合するデュアルモード',
        description: '一般映画用とアダルト用で別々のソフトを起動する必要はありません。SWAYAならデータベースを完全に分離したまま、安全に1クリックで切り替えられます。',
      },
      {
        title: 'ハードディスク内の物理ファイルを綺麗に整理',
        description: 'データベース上でのみ管理してディスク内が散らかったままになるStashと異なり、SWAYAはスタジオ名や出演者名の規則に沿って物理ファイルを綺麗に分類します。',
      },
    ],
    faqs: [
      {
        q: 'SWAYAはStashDBから直接メタデータを取得できますか？',
        a: 'はい！設定画面でStashDBのAPIキーを入力するだけで、タイトル、出演者、スタジオ、公開日、高解像度カバー画像を自動取得します。',
      },
      {
        q: 'アダルト作品のプライバシーはどのように保護されますか？',
        a: 'SWAYAには専用のPINロック機能があります。ロック中はアダルトメディアが完全に隠蔽され、PINを入力するまで表示されません。',
      },
    ],
  },
  jellyfin: {
    title: 'SWAYA vs Jellyfin: ローカルデスクトップ再生 vs ホームメディアサーバー',
    metaTitle: 'Windows / Linux向けJellyfin代替ソフト（サーバー不要） - SWAYA',
    metaDescription: 'Dockerやサーバー保守不要のシンプルなメディア環境をお探しですか？SWAYAはネットワーク設定なしでファイルを整理し、4K HDRをMPV再生します。',
    heroTagline: 'Dockerコンテナやサーバー設定に悩まされない、快適なハードディスクメディア環境。',
    heroSubtitle: 'Jellyfinは優れたホームネットワーク用サーバーですが、自分のPCで動画を見て整理したいだけなら、SWAYAのほうが圧倒的に高速かつ手軽です。',
    competitorPricing: '無料 / オープンソース (FOSS)',
    swayaPricing: '発売記念 永久ライセンス €39（通常 €79）',
    whenToChooseCompetitor: [
      '家中のスマートTVやスマートフォンに動画をストリーミング配信したい場合。',
      'Linux/Dockerサーバーを常時稼働させ、複数ユーザーを管理したい場合。',
      '完全なオープンソースサーバーソフトにこだわりたい場合。',
    ],
    whenToChooseSwaya: [
      '手元のWindows or Linux PCやノートPCで映画を鑑賞し、ダウンロードファイルを整理したい場合。',
      'ポート開放や常駐デーモン、トランスコード設定の手間を省きたい場合。',
      '物理ファイルのリネームと、ネイティブMPVによる高画質4K再生を求めたい場合。',
      '一般作品と同時にStashDBのアダルト作品も管理したい場合。',
    ],
    matrix: [
      { feature: 'サーバー設定・保守作業ゼロ', swayaNote: '即起動、バックグラウンド常駐なし', competitorNote: 'サーバーのインストール・保守が必要' },
      { feature: '物理ディスク上のファイル名変更＆整理', swayaNote: '実際のファイルを移動＆構造化', competitorNote: '読み取り専用の仮想ライブラリ' },
      { feature: '内蔵4K HDR MPVプレイヤー', swayaNote: 'GPUネイティブ再生で遅延ゼロ', competitorNote: 'Web/HTML5または外部クライアント' },
      { feature: 'アダルトメディア（StashDB）＆デュアルモード', swayaNote: 'StashDB/FansDBネイティブ統合', competitorNote: '外部プラグインが必要' },
      { feature: '100% オフライン＆開放ポートゼロ', swayaNote: '開放ポートなし、100%ローカル動作', competitorNote: 'ローカルネットワークサーバーが必要' },
      { feature: '対話型ドライラン（事前確認）整理機能', swayaNote: '完全な調整＆競合防止保護', competitorNote: '受動的なフォルダ監視のみ' },
      { feature: 'Torrentクライアント直接統合（シード維持）', swayaNote: 'qBittorrent直接連携', competitorNote: '非対応' },
      { feature: '名場面・ブックマークのタイムスタンプ記録', swayaNote: 'キー1発でスクショ＆マーク保存', competitorNote: '非対応' },
    ],
    deepDives: [
      {
        title: 'サーバーの複雑さを排除したデスクトップの快適性',
        description: 'Jellyfinの導入にはポート管理や常駐プロセスの設定が必要です。SWAYAは単一の完結したデスクトップアプリで、起動した瞬間に使えます。',
      },
      {
        title: '物理ドライブ上の実ファイルを整理',
        description: 'Jellyfinは事前に手動でファイルを整理しておく必要があります。SWAYAは散らかったダウンロードフォルダを自らスキャンし、整理・リネームを実行します。',
      },
      {
        title: 'ネイティブMPVの圧倒的なパフォーマンス',
        description: '内蔵MPVエンジンにより、4K HDR動画のシークも瞬時で、字幕の描画ズレやコマ落ちのない滑らかな再生を楽しめます。',
      },
    ],
    faqs: [
      {
        q: 'SWAYAで整理したファイルをJellyfinで読み込めますか？',
        a: 'はい！SWAYAは標準的な命名規則に沿って整理するため、Jellyfinなどのストリーミングサーバーでもエラーなく綺麗に認識されます。',
      },
      {
        q: 'SWAYAはバックグラウンドでシステムリソースを消費しますか？',
        a: 'いいえ。SWAYAを終了すれば、バックグラウンドにサービスやデーモンが残ることは一切ありません。',
      },
    ],
  },
  kodi: {
    title: 'SWAYA vs Kodi: 不安定なアドオンに悩まされない最新デスクトップメディアセンター',
    metaTitle: 'Windows or Linux PC向けKodi代替ソフト - SWAYA',
    metaDescription: 'PC向けに設計されたモダンなKodi代替ソフトをお探しですか？SWAYAはMPVプレイヤー、ファイル整理、洗練されたUIを統合。',
    heroTagline: 'マウス、キーボード、そしてハードディスクのために設計されたモダンなメディア体験。',
    heroSubtitle: 'Kodiはテレビのリモコン操作には適していますが、PCモニターでのマウス操作には不向きでアドオン破損の不安もあります。SWAYAはWindowsデスクトップのために作られました。',
    competitorPricing: '無料 / オープンソース (FOSS)',
    swayaPricing: '発売記念 永久ライセンス €39（通常 €79）',
    whenToChooseCompetitor: [
      'テレビに接続したHTPCを赤外線リモコンで操作したい場合。',
      'IPTVやPVRなどの専門的なストリーミングアドオンを多用する場合。',
      'ソファから見る10フィートUIを求めている場合。',
    ],
    whenToChooseSwaya: [
      'マウスとキーボードを使ってWindows or Linux PCで快適にメディアを扱いたい場合。',
      'ハードディスク内のファイルを安全にリネーム・フォルダ整理したい場合。',
      'アップデートで壊れる心配のない、軽量で堅牢なアプリを使いたい場合。',
      '映画・アニメ（TMDb）とアダルト作品（StashDB）を1つの場所で管理したい場合。',
    ],
    matrix: [
      { feature: 'モダンなデスクトップUI（マウス＆キーボード最適化）', swayaNote: '滑らかなWindows / Linux向けUI', competitorNote: 'テレビ用リモコン向けUI' },
      { feature: '物理ディスク上のファイル名変更＆フォルダ整理', swayaNote: '実際のファイルを一括リネーム・移動', competitorNote: 'データベースのみ（ファイル名は不変）' },
      { feature: '内蔵4K/HDR MPVビデオエンジン', swayaNote: 'ハードウェアGPU再生、コマ落ちなし', competitorNote: '内蔵プレイヤーエンジン' },
      { feature: 'アダルトメディア（StashDB）＆デュアルモード', swayaNote: 'StashDB/FansDBネイティブ統合', competitorNote: '不安定な外部アドオンが必要' },
      { feature: '抜群の安定性（アドオン破損の心配なし）', swayaNote: '自己完結型の堅牢な設計', competitorNote: '本体アップデート時にアドオンが頻繁に破損' },
      { feature: 'ドライランプレビュー＆競合防止', swayaNote: '移動前の安全な事前確認', competitorNote: '非対応' },
      { feature: 'Torrentクライアント直接統合（シード維持）', swayaNote: 'qBittorrent直接連携', competitorNote: '外部スクリプトが必要' },
    ],
    deepDives: [
      {
        title: '10フィートUIではなく、デスクトップファーストの快適操作',
        description: 'Kodiはリモコン専用に設計されているため、マルチウィンドウ環境やマウスでの操作は快適とは言えません。SWAYAはWindows上での俊敏な操作に最適化されています。',
      },
      {
        title: 'ハードディスク上の物理ファイルを直接整理',
        description: 'Kodiは事前にリネームされたファイルを前提としています。SWAYAは未整理のダウンロードファイルを自動判別し、物理的にリネーム・移動を行います。',
      },
      {
        title: 'アドオンのメンテナンスストレスがゼロ',
        description: 'スクレイパー、ライブラリ管理、プレイヤー、名場面保存など、必要な機能がすべてSWAYA本体に内包されているため、プラグインの不具合に悩まされません。',
      },
    ],
    faqs: [
      {
        q: 'SWAYAを使ってKodi用のファイル準備ができますか？',
        a: 'はい！SWAYAはKodiがスクレイプエラーなく認識できる標準的なファイル名・フォルダ構成に整理します。',
      },
      {
        q: 'SWAYAはKodiより簡単に使えますか？',
        a: 'はるかに簡単です。アドオンの導入やリポジトリ管理、複雑なXMLスキンの設定は一切不要で、インストール後すぐにお使いいただけます。',
      },
    ],
  },
};
