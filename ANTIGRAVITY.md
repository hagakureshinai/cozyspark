# ANTIGRAVITY: Cozy Spark コードベースのリファクタリング

## プロジェクト概要
- **プロジェクト名**: Cozy Spark
- **ゴール**: Astroで作成したサイトのコード整理（リファクタリング）を行い、保守性を向上させる。
- **現在のフェーズ**: ページコンポーネントのリファクタリング

## 技術スタック
- **フレームワーク**: Astro 5.0+
- **スタイリング**: Component-Oriented Scoped CSS + `global.css`

## 要件定義
- `[workId].astro` (作品詳細/短編表示) と `[episodeId].astro` (エピソード表示) のコードが複雑化している。
- **課題**: `observer_rip/01.md` (シリーズ作品の一話) と、短編作品で、本文の表示幅が異なっている。
    - 原因判明: 
        - 短編 (`[workId].astro`で表示) は `narrow=false` (幅1000px)
        - シリーズ (`[episodeId].astro`で表示) は `narrow=true` (幅700px)
    - **解決策**: 小説本文を表示するときは、短編・連載問わず `narrow=true` (700px) に統一すべき。

### 提案する戦略
1. **共通コンポーネントの作成 (`NovelViewer.astro`)**
   - 小説本文の表示部分（縦書き/横書き対応、ルビ、字下げ、前後のナビゲーションなど）を共通化する。
2. **ページファイルの責務整理**
   - `[workId].astro`: 作品情報の取得と、短編なら `NovelViewer`、シリーズなら目次を表示。
   - `[episodeId].astro`: エピソード情報の取得と、`NovelViewer` の表示。
3. **デザインの統一**
   - 小説本文ページは全て `narrow=true` (幅700px) で固定する。

## MVPスコープ（リファクタリング計画）
- **フェーズ 4: ページリファクタリング**
  - [ ] `src/components/NovelViewer.astro` の作成。
  - [ ] `src/pages/works/[workId].astro` のリファクタリング（短編の幅修正）。
  - [ ] `src/pages/works/[workId]/[episodeId].astro` のリファクタリング（共通化）。
