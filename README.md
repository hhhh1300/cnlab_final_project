## 開啟方式

1. 安裝套件

需要有 node.js 和 npm，版本依照 `.nvmrc`

```bash
cd frontend && npm install

cd ../backend && npm install
```

3. 建立 .env 檔案

把 .env 檔案貼到 backend 資料夾裡面，

需要依據 `backend/.env.example` 的欄位寫到 `.env` 中，需要額外連接 [google](https://console.cloud.google.com/) 和 [facebook](https://developers.facebook.com/?locale=zh_TW) 的 api，
以及 linepay 的 api，

另外 google 和 facebook 的 api 需要設定 callback url，分別是 `http://localhost:8080/api/user/google/callback` 和 `http://localhost:8080/api/user/facebook/callback`。

4. 開啟檔案

需要開啟兩個 terminal 分別執行 backend 和 frontend
    
```bash
cd backend && npm run dev
```

```bash
cd frontend && npm run dev
```

同時使用 docker-compose 啟動 postgres

```bash
cd backend

docker compose up -d
```

5. 打開 `localhost:3000`，開始使用
