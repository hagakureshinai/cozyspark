# ANTIGRAVITY: Cozy Spark コードベースのリファクタリング

## プロジェクト概要
- **プロジェクト名**: Cozy Spark
- **ゴール**: Astroで作成したサイトのコード整理（リファクタリング）を行い、保守性を向上させる。
- **現在のフェーズ**: コンテンツ管理 (`src/content/config.ts`) のリファクタリング

## 技術スタック
- **フレームワーク**: Astro 5.0+
- **スタイリング**: Component-Oriented Scoped CSS + `global.css`
- **データ管理**: Astro Content Collections (Zod Schema)

## 要件定義
- `src/content/config.ts` が肥大化しつつあり、可読性が低下している。
- **課題**: 
    - 作品 (`works`) とエピソード (`episodes`) の定義が1つのファイルに混在している。
    - `zod` スキーマの定義が長くなり、何が必須で何がオプションかがパッと見で分かりにくい。
    - 将来フィールドが増えたときにさらに見通しが悪くなる。

### 提案する戦略
1. **スキーマ定義の分離**
   - `src/content/schemas/works.ts` と `src/content/schemas/episodes.ts` に分割する。
2. **型定義の明示**
   - TypeScriptの型推論に頼るだけでなく、`infer` を使って型をエクスポートし、他のコンポーネントで使い回せるようにする。
   - 例: `type Work = z.infer<typeof workSchema>;`

## MVPスコープ（リファクタリング計画）
- **フェーズ 5: コンテンツ管理の整理**
  - [ ] `src/content/schemas/` ディレクトリの作成。
  - [ ] `works` スキーマの分離。
  - [ ] `episodes` スキーマの分離。
  - [ ] `config.ts` をシンプルにする。
