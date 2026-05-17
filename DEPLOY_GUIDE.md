# 🚀 wantmony 博客部署上线指南

---

## 📁 网站文件结构

```
~/Desktop/wantmony/
├── index.html        ← 首页（导航栏 + 个人介绍 + 最新文章）
├── articles.html     ← 全部文章列表页
├── article.html      ← 文章详情页（通过URL参数加载不同文章）
├── about.html        ← 关于我页面
├── css/
│   └── style.css     ← 全部样式
├── js/
│   ├── articles-data.js  ← 文章数据（纯前端静态数据）
│   └── main.js           ← 页面功能逻辑
├── articles/         ← 预留（后续可扩展）
└── images/           ← 预留（存放图片）
```

> ✅ 纯静态网站，无需后端、无需数据库，部署超简单！

---

## 🛠 部署方案（三选一，按推荐排序）

---

### 方案一：Vercel ⭐ 最推荐

**优点**：免费、自动HTTPS、全球CDN、支持自定义域名
**步骤**：

1. **注册 Vercel**
   - 打开 https://vercel.com
   - 用 GitHub / GitLab / 邮箱注册

2. **上传代码到 GitHub**
   ```bash
   # 如果还没装git
   brew install git

   # 初始化仓库
   cd ~/Desktop/wantmony
   git init
   git add .
   git commit -m "first commit"

   # 去 GitHub 新建一个仓库（不要勾选 README），复制远程地址
   git remote add origin https://github.com/你的用户名/wantmony.git
   git push -u origin main
   ```

3. **在 Vercel 导入**
   - 点击 "Add New → Project"
   - 选择刚上传的 `wantmony` 仓库
   - Framework Preset 选 **Other**
   - 直接点 **Deploy**，什么都不用配
   - 等几十秒，你的网站就上线了！

4. **可选：绑定自定义域名**
   - 在 Vercel 项目 Settings → Domains 里添加
   - 按提示配DNS记录即可

---

### 方案二：Cloudflare Pages（免费、速度快）

**步骤**：

1. 注册 https://pages.cloudflare.com
2. 关联 GitHub 仓库（同上）
3. 创建项目，构建设置留空（静态网站无需构建）
4. 部署完成，自动获得 `.pages.dev` 域名
5. 同样支持自定义域名 + 免费HTTPS

---

### 方案三：GitHub Pages（最简单）

**步骤**：

1. 把 `~/Desktop/wantmony` 文件夹上传到 GitHub 仓库，仓库名设为 `你的用户名.github.io`
2. 进入仓库 Settings → Pages
3. Source 选 "Deploy from a branch" → main 分支 → / (root)
4. 过几分钟，访问 `https://你的用户名.github.io` 即可

> ⚠️ 注意：GitHub Pages 仓库名必须是 `你的用户名.github.io` 才会自动部署根目录

---

## 🔒 安全与隐私保护

| 项目 | 说明 |
|------|------|
| ✅ **无后端** | 纯HTML+CSS+JS，没有服务器、没有数据库、没有API接口，攻击面极少 |
| ✅ **无个人信息** | 代码中只有昵称（虾虾）和示例邮箱（hi@wantmony.com），未暴露真实姓名、学校、地址、手机号 |
| ✅ **HTTPS** | 无论用Vercel、Cloudflare还是GitHub Pages，都自动提供免费HTTPS加密 |
| ✅ **静态CDN** | Vercel和Cloudflare都带有DDoS防护和CDN加速 |
| ✅ **无Cookie** | 网站不使用任何Cookie或追踪脚本 |
| ✅ **无登录系统** | 不涉及用户注册登录，无需担心账号密码泄露 |
| ⚠️ **网站分析** | 如果后续加统计工具（如Google Analytics），注意不要收集读者敏感信息 |

### 🔐 如果后续想扩展功能（评论、统计等）：

- **评论系统**：推荐用第三方服务如 **Giscus**（基于GitHub Discussions，不需要自己建服务器）
- **访问统计**：推荐 **Plausible** 或 **Umami**（可自建，不追踪个人信息）
- **搜索功能**：可以先手动增加，不需要后端

---

## 💡 小提示

1. **如何新增文章？**
   - 打开 `js/articles-data.js`
   - 在 `articles` 数组开头添加一个新对象（格式和其他文章一样）
   - 保存后刷新即可！

2. **如何修改头像/昵称？**
   - 头像：在 `index.html` 的 `.hero-avatar` 里改 emoji
   - 昵称：在 `index.html` 的 `h1` 和 `about.html` 里改

3. **想加图片怎么办？**
   - 把图片放到 `images/` 文件夹
   - 在文章内容中用 `<img src="images/你的图片.jpg" alt="描述">` 引用

---

🎉 **主人现在就可以试着用 Vercel 部署上线啦！**
有啥不懂的随时问我 🦐
