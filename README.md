# 🌌 林哥の次元 — Linge's Blog

> 「代码写得好，不如二次元浓度高」

一个专为资深二次元老宅 **林哥** 打造的赛博朋克暗黑风格个人博客。基于 Vite + Vue 3 构建，兼容 GitHub Pages 部署。

---

## ✨ 特性

- 🎨 **赛博朋克暗黑美学** — 深蓝紫黑底色 + 霓虹粉/青高亮，粒子星空背景
- 🖱️ **Canvas 粒子交互** — 鼠标吸引粒子 + 粒子间连线
- 🪟 **毛玻璃效果** — 固定导航栏、卡片、面板全面采用 glass morphism
- 📱 **响应式布局** — 桌面端 / 平板 / 手机三端适配
- 📄 **6 个完整页面** — 首页、关于我、博客、追番看板、游戏库、友链
- 🖼️ **林哥美图鉴赏** — 照片画廊 + 全屏灯箱 (Lightbox)，支持键盘导航
- ⌨️ **打字机效果 + Glitch 故障文字** — 首页专属特效
- 🌐 **Font Awesome 6** — 全套图标支持
- 🔄 **页面切换淡入动画** — Vue `<transition>` 实现

---test  

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| [Vite 5](https://vitejs.dev/) | 构建工具 |
| [Vue 3](https://vuejs.org/) | 前端框架 (Composition API) |
| [Vue Router 4](https://router.vuejs.org/) | 路由 (Hash 模式) |
| [Font Awesome 6](https://fontawesome.com/) | 图标库 |
| Canvas API | 粒子星空背景 |
| CSS3 | 毛玻璃、动画、响应式布局 |
| [GitHub Actions](https://github.com/features/actions) | CI/CD 自动部署 |

---

## 🚀 本地开发

```bash
# 克隆项目
git clone https://github.com/YOUR_USERNAME/linge-blog.git
cd linge-blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打包构建
npm run build

# 本地预览构建产物
npm run preview
```

---

## 📦 部署

### GitHub Pages

项目已配置 GitHub Actions 自动部署。每次 `push` 到 `main` 分支时：

1. 自动运行 `npm ci && npm run build`
2. 将 `dist/` 目录部署到 GitHub Pages

> **首次使用需要**：在仓库 Settings → Pages 中将 Source 选为 **GitHub Actions**。

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/linge-blog)

或手动配置：

1. 在 [Vercel](https://vercel.com/) 中导入此仓库
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. 点击 Deploy

---

## 📁 项目结构

```
linge-blog/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions 自动部署
├── public/
│   └── images/linge/        # 林哥照片资源
├── src/
│   ├── assets/
│   │   └── styles.css       # 全局样式 & CSS 变量
│   ├── components/
│   │   ├── NavBar.vue        # 固定导航栏
│   │   └── ParticleBackground.vue  # 粒子星空背景
│   ├── router/
│   │   └── index.js          # Vue Router 配置
│   ├── views/
│   │   ├── Home.vue          # 首页
│   │   ├── About.vue         # 关于我 (含照片画廊)
│   │   ├── Blog.vue          # 博客列表
│   │   ├── BlogDetail.vue    # 博客详情
│   │   ├── Anime.vue         # 追番看板
│   │   ├── Games.vue         # 游戏库
│   │   └── Friends.vue       # 友链
│   └── App.vue               # 根组件
├── index.html                # 入口 HTML
├── vite.config.js            # Vite 配置
└── package.json
```

--- 

## 📄 License

MIT — 本项目仅供学习和个人使用。林哥照片请勿他用。

---

<p align="center">
  <i class="fa-solid fa-star" style="color:#ff2d78"></i>
  林哥の次元 · 永远的二次元
  <i class="fa-solid fa-star" style="color:#00e5ff"></i>
</p>
