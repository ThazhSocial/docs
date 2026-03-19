# Thazh Social API Docs

Trang tài liệu API cho Thazh Social — xây dựng với React + Vite, deploy lên GitHub Pages.

## 🚀 Deploy lên GitHub Pages

### Bước 1: Đổi tên repo trong vite.config.js

Mở file `vite.config.js` và thay `thazh-api-docs` bằng tên repo GitHub của bạn:

```js
export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPO_NAME/',  // ← đổi chỗ này
})
```

### Bước 2: Push lên GitHub

```bash
git init
git add .
git commit -m "feat: init Thazh API docs"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Bước 3: Bật GitHub Pages

1. Vào **Settings** → **Pages**
2. **Source**: chọn `GitHub Actions`
3. GitHub Actions sẽ tự động build và deploy sau mỗi lần push

### Bước 4: Truy cập

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

---

## 💻 Chạy local

```bash
npm install
npm run dev
```

## 🏗️ Build

```bash
npm run build
npm run preview
```

## 📁 Cấu trúc

```
src/
├── pages/
│   ├── HomePage.jsx      # Giới thiệu + status codes + rate limits
│   ├── PostsPage.jsx     # Posts, Feed, Comments, Likes, Reposts
│   ├── UsersPage.jsx     # Users, Follows, Blocks, Notifications, Search
│   ├── MessagesPage.jsx  # Messages, E2EE, Nicknames
│   ├── SocialPage.jsx    # Groups, Stories, Polls, Hashtags, Bookmarks
│   ├── OAuthPage.jsx     # OAuth 2.0 flow + Developer Apps
│   ├── ShareKitPage.jsx  # Embed, Share URL, Webhooks
│   └── SDKPage.jsx       # JS, Python, Swift, Kotlin examples
├── components/
│   ├── CodeBlock.jsx     # Syntax highlighted code block
│   └── EndpointTable.jsx # API endpoint table
├── App.jsx               # Sidebar navigation + routing
├── index.css             # Design system + all styles
└── main.jsx
```
