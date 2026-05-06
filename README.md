## Directory Structure
- `public/assets/img/` : 作品のOGP画像や表紙画像を格納。
    - ogp.png : OGP画像
- `public/images/` : サイト内で使用するその他画像。
    - ss/others : 掌編小説用画像
        01.png など
- apple-touch-icon.png : アプリアイコン
- favicon.ico : ファビコン
- robots.txt : サイトのクロール許可設定
- `src/assets/` : 静的ファイル（背景画像等）※2/23現在、未使用
- `src/components/` : 作品カードやヘッダー・フッターなどの共通コンポーネント
    - Footer.astro : フッター
    - Header.astro : ヘッダー
    - NovelViewer.astro : 小説本文表示コンポーネント
    - SSViewer.astro : 掌編小説表示コンポーネント
    - WorkCard.astro : 作品カード←★★？？？？★★
- `src/content/episodes/` : 小説本文（各話のエピソード）。Markdown形式で記述。
    - 作品名/話数.md
- `src/content/policy/` : サイトポリシー
    - index.md : サイトポリシーに記載している本文
- `src/content/schemas/` : スキーマ設定
    - episodes.ts : エピソードのスキーマ設定←★★？？？？★★
    - works.ts : 作品のスキーマ設定←★★？？？？★★
- `src/content/works/` : 作品のメタ情報（作品名、あらすじ、タグ、表示非表示フラグ等）
    - 作品名/作品ID.md
- `src/content/`
    - config.ts : 設定ファイル
- `src/layouts/`
    - Layout.astro : 共通レイアウト
- `src/pages/` : ルーティング用のページ
    - works/[workId]/[episodeId].astro : 小説本文ページ
    - works/[workId].astro : 作品目次ページ
    - works/index.astro : 作品一覧ページ
    - 404.astro : 404ページ
    - index.astro : クッションページ
    - policy.astro : サイトポリシー
- `src/styles/` : グローバルCSS（`global.css`）など。
    - global.css : サイト全体の色・余白等のグローバル設定





---

## Pages / Contents

- Index
  - 年齢確認・BL作品であることの同意

- Top
  - サイト概要
  - 作品一覧への導線

- Works
  - 観測者は恋を知る（全7話）
  - 観測者は干渉を許す（全11話）
  - はい先生、スマホ出して！（一話完結）
  - ケーキはタスクに含まれますか（一話完結）

- External Links (BOOTH)※当面は作品タイトルのみ掲載し「工事中」表記とする
  - 夜明けまで（R18）
  - Beyond Control（R18）
  - 鏡の中の境界線（R18）

- Short Pieces
  - 掌編小説
  - X掲載200字小説（画像形式）

---

## Global Navigation

- 常設ナビはサイトタイトル（トップへのリンク）のみ
- 作品一覧はTopページから遷移

---

## URL Design

- 作品は /works/{work-slug}/
- 各話は /works/{work-slug}/{episode-number}/
- 各話は 01, 02 の連番
- 各ディレクトリ配下に index.html を置き、小説本文を載せる
- R18作品はサイト内に本文ページを持たずBOOTHへリンク予定、当面「工事中」表記のみ
- Short Pieces は /short-pieces/ にまとめて掲載
- 各作品ごとの個別URLは持たせない



------
お疲れ様です！実装完了、おめでとうございます。ご要望通り、最新更新バッジ（UP）機能の運用について、手順とロジックをまとめてご説明します。

---
## 最新更新バッジ（UP）機能 運用マニュアル
### 1. 動作の仕組み
この機能は、**作品メタ情報** (`src/content/works/{work_id}.md`) の Frontmatter にある `isUpdated` フラグに基づいて動作します。

`isUpdated: true` の場合
| **作品一覧ページ** (`/works/`) | 作品名の隣に「UP」バッジが表示されます。
| **目次ページ** (`/works/{workId}/`) | **その作品の最も新しいエピソード（`order`が最大のもの）**のタイトル横に「UP」バッジが表示されます。

### 2. 運用手順
新しいエピソードを公開したり、既存のエピソードを更新した場合など、サイト全体でその作品を「最新」として強調したい時に以下の手順を実行します。

#### 【表示させる手順】
1.  対象となる作品のメタ情報ファイルを開きます。
    *   場所: `src/content/works/{作品ID}.md`
2.  Frontmatter (ファイルの先頭の `---` で囲まれた部分) に、以下の行を追加または修正します。

    ```markdown
    ---
    title: "観測者は恋を知る"
    # ... 他のメタ情報
    isUpdated: true 
    ---
    ```

3.  ファイルを保存し、サイトをビルド/デプロイします。

#### 【非表示にする手順】

「UP」バッジの表示が不要になったら、以下の手順でフラグを解除します。

1.  対象となる作品のメタ情報ファイルを開きます。
    *   場所: `src/content/works/{作品ID}.md`
2.  Frontmatter の `isUpdated: true` の行を削除します。

3.  ファイルを保存し、サイトをビルド/デプロイします。

### 3. バッジの表示条件（技術詳細）

*   **作品一覧ページ**: `work.data.isUpdated` が `true` であればバッジが表示されます。
*   **目次ページ**:
    1.  `work.data.isUpdated` が `true` であること（フラグが立っていること）。
    2.  表示しようとしているエピソードが、その作品の中で `order` プロパティの値が最も大きいもの（＝最新のエピソード）であること。

この2つの条件が揃ったエピソードにのみバッジが表示されます。


-----
ヘッダー・フッターが表示されているページでは、isFullHeight は指定しない（デフォルトのまま）

本文ページ、二つ目の<p>タグ開始直後の段落行頭に全角スペースがふたつ入ってしまう問題。（手で削除して対応中）