# ANTIGRAVITY: Cozy Spark コードベースのリファクタリング

## プロジェクト概要
- **プロジェクト名**: Cozy Spark
- **ゴール**: Astroで作成したサイトのコード整理（リファクタリング）を行い、保守性を向上させる。
- **現在のフェーズ**: 残りのページ (`works/index.astro` 等) のリファクタリング検討

## 技術スタック
- **フレームワーク**: Astro 5.0+
- **スタイリング**: Component-Oriented Scoped CSS + `global.css`
- **データ管理**: Astro Content Collections (`src/content/schemas/`)

## 要件定義
- **課題**: `src/pages/works/index.astro`（作品一覧ページ）のコードが450行を超えており、保守性が低い。
    - 同じような「作品カード」のHTML/CSSが、ピックアップ・シリーズ・単発・掌編の4回繰り返されている。
    - デザイン変更時に4箇所直す必要があり、バグの温床になる。

### 提案する戦略
1.  **作品カードのコンポーネント化 (`WorkCard.astro`)**
    - 作品一覧で使われている「枠線、タイトル、バッジ、あらすじ」のセットを共通部品にする。
    - これにより `works/index.astro` の記述量を大幅に減らし、デザイン統一を保証する。
2.  **その他のページ (`404`, `index`, `policy`)**
    - 現状シンプルなどで、大きなリファクタリングは不要。
    - ただし、共通の `global.css` 変数を使うように微調整しても良い。

## MVPスコープ（リファクタリング計画）
- **フェーズ 6: 作品一覧の整理**
  - [ ] `src/components/WorkCard.astro` の作成。
  - [ ] `src/pages/works/index.astro` のリファクタリング（WorkCardへの置き換え）。
