## 開啟方式

1. 安裝套件

需要有 node.js 和 npm，版本依照 `.nvmrc`

```bash
cd frontend && npm install

cd ../backend && npm install
```

2. 建立 .env 檔案

把 .env 檔案貼到 backend 資料夾裡面，

需要依據 `backend/.env.example` 的欄位寫到 `.env` 中。

3. 開啟檔案

需要開啟兩個 terminal 分別執行 backend 和 frontend
    
```bash
cd backend && npm run dev
```

```bash
cd frontend && npm run dev
```

同時使用 docker-compose 啟動 mysql

```bash
cd backend

docker compose up -d
```

你可以連接到 localhost:8081 啟動 adminer

4. 打開 `localhost:3000`，開始使用
