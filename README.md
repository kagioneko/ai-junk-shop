# かぎねこ電脳ジャンク

AIを安全に使うための部品（SKOS / Credential Broker / CPOS）の取扱説明書と、
実験で生まれたAIのパーツを並べたジャンク屋風の紹介サイトです。

- 店先：`index.html`（主力パーツ・組み立て例・ジャンク棚）
- 取扱説明書：`skos.html` / `broker.html` / `cpos.html`
  （上段「ふつうの言葉で」、下段「技術者向けの仕様書」の2段構成）
- ジャンク棚の陳列データ：`js/shelf.js`

ビルド不要の静的サイトです。ローカルで見るときは:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

各ページの説明は、それぞれのリポジトリの README とコードをもとに書いています。
食い違いがある場合は各リポジトリの原文が正です。

お問い合わせ：contact@kagioneko.com

## License

MIT License — see [LICENSE](LICENSE).
