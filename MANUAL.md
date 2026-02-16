# Cozy Spark 運用マニュアル

このドキュメントでは、Cozy Sparkウェブサイトの日常的な更新作業（小説の追加など）や、デザインのカスタマイズ方法について解説します。

---

## 1. 作品の追加・更新

### 1-1. 新規作品の登録

新しい作品を公開する場合の手順です。

1. **フォルダ/ファイルの作成**
   - **長編の場合**:
     `src/content/works/` に `[作品ID].md` を作成します。（例: `observer_rip.md`）
   - **短編の場合**:
     `src/content/works/` に `[作品ID].md` を作成します。の場合はこれ一つで完結します（エピソードファイルは不要）。

2. **フロントマター（設定項目）の記述**
   各 `.md` ファイルの先頭に以下の情報を記述します。

   ```yaml
   ---
   title: "作品タイトル"
   category: "series"  # シリーズ: series / 単発: single / 掌編: ss
   status: "ongoing"   # 連載中: ongoing / 完結: completed
   order: 1            # サイト内での表示順（小さい順）
   lastUpdated: 2024-01-01  # 最終更新日
   isDraft: false      # 工事中の場合は true
   isR18: false        # R18作品の場合は true
   wordCount: "約10,000字"   # およその文字数（任意）
   description: "ここにあらすじを書きます。"
   
   # ▼短編の場合のみ必要な設定
   isShort: true
   # ▼外部リンク（Pixivなど）の場合のみ
   externalLink: "https://pixiv.net/..."
   ---
   ```

   - **短編の場合**: `.md` の本文（`---` の下）に直接小説本文を書いてください。
   - **長編の場合**: このファイルは「作品情報（親）」として機能します。本文は書きません。

### 1-2. エピソードの追加（連載の続き）

シリーズ作品や単発作品の「本文（各話）」を追加する手順です。

1. **フォルダの確認**
   `src/content/episodes/` の中に、親作品と同じIDのフォルダを作成します。（例: `src/content/episodes/observer_rip/`）

2. **エピソードファイルの作成**
   そのフォルダの中に `[話数].md` などの名前でファイルを作成します。（例: `01.md`, `02.md`）

3. **フロントマターの記述**

   ```yaml
   ---
   workId: "observer_rip"  # 親作品のIDと必ず一致させる
   title: "第1話 タイトル"
   order: 1                # 1話なら1, 2話なら2
   pubDate: 2024-01-01     # 公開日
   wordCount: "3,000字"
   ---
   本文をここに書きます。
   ルビは {漢字|かんじ} の形式で書けます。
   ```

### 1-3. ステータス変更とバッジ

- **完結済にする**: 親作品 `.md` の `status` を `ongoing` から `completed` に変更します。
- **UPバッジをつける**: 親作品 `.md` に `isUpdated: true` を追加します。
  - ※次回更新時に `false` に戻すか削除するとバッジが消えます。

---

## 2. サイト運用の変更

### 2-1. 「初めての方へ（ピックアップ）」の変更

トップページの「おすすめ作品」枠を変更するには、プログラムファイルを少し編集します。

1. **編集ファイル**: `src/pages/works/index.astro`
2. **場所**: ファイル上部の `pickupConfig` という部分を探します。

   ```javascript
   const pickupConfig = [
     { id: "observer_cake", label: "＊見出しテキスト" },
     { id: "beyond_border", label: "＊見出しテキスト" },
   ];
   ```

3. **変更**: `id` に表示したい作品のID（ファイル名）を、`label` に紹介文を入力します。

### 2-2. 外部サイト作品の登録

Pixivや他サイトの作品を一覧に載せたい場合：

1. `src/content/works/` に通常通り `.md` を作成します。
2. フロントマターに `externalLink: "URL"` を記入します。
3. タイトルをクリックすると、そのURLへ別タブでジャンプするようになります。

---

## 3. デザイン（配色）の変更

サイト全体の色味は `src/styles/global.css` で一括管理されています。

### 変更方法

`src/styles/global.css` を開き、以下の変数を書き換えるだけで全ページに反映されます。

```css
:root {
    --bg-color: #fdfdfd;       /* 背景色 */
    --text-color: #333;        /* メインの文字色 */
    --sub-text-color: #666;    /* 補足情報の文字色（あらすじ等） */
    
    --accent-color: #888;      /* アクセントカラー（線の色、見出しの下線など） */
    --link-color: #A03A3A;     /* リンクの色（赤系） */
    --warning-color: #A03A3A;  /* 注意書きの色（R18注記など） */
    
    --border-color: #ccc;      /* 枠線の色（ボタン等） */
}
```

- **ヒント**: テーマカラーを青系にしたい場合は、`--link-color` と `--warning-color` を青色コード（例: `#0056b3`）に変更してみてください。
