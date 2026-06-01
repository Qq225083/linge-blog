<template>
  <div class="page blog-page">
    <h1 class="page-title"><i class="fa-solid fa-pen-to-square"></i> 博客</h1>
    <p class="page-subtitle">番剧评测 · 游戏攻略 · 二次元杂谈 · 技术笔记</p>

    <!-- Tag Filter -->
    <div class="tag-filter">
      <span class="tag" :class="{ active: activeTag === 'all' }" @click="activeTag = 'all'">
        <i class="fa-solid fa-layer-group"></i> 全部
      </span>
      <span class="tag" :class="{ active: activeTag === 'anime' }" @click="activeTag = 'anime'">
        <i class="fa-solid fa-tv"></i> 番剧评测
      </span>
      <span class="tag pink" :class="{ active: activeTag === 'game' }" @click="activeTag = 'game'">
        <i class="fa-solid fa-gamepad"></i> 游戏攻略
      </span>
      <span class="tag purple" :class="{ active: activeTag === 'otaku' }" @click="activeTag = 'otaku'">
        <i class="fa-solid fa-feather"></i> 二次元杂谈
      </span>
      <span class="tag green" :class="{ active: activeTag === 'tech' }" @click="activeTag = 'tech'">
        <i class="fa-solid fa-code"></i> 技术笔记
      </span>
    </div>

    <!-- Blog Stats -->
    <div class="blog-stats glass-card">
      <div class="stat-item">
        <span class="stat-num">{{ articles.length }}</span>
        <span class="stat-label">篇文章</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-num">{{ totalViews }}</span>
        <span class="stat-label">总阅读量</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-num">{{ totalWords }}</span>
        <span class="stat-label">总字数</span>
      </div>
    </div>

    <!-- Article Grid -->
    <div class="card-grid" v-if="filteredArticles.length">
      <article
        v-for="article in filteredArticles"
        :key="article.id"
        class="blog-card glass-card"
        @click="goDetail(article.id)"
      >
        <div class="blog-card-cover">
          <img :src="article.cover" :alt="article.title" loading="lazy" />
          <div class="blog-card-overlay">
            <span class="overlay-btn">
              <i class="fa-solid fa-book-open"></i> 阅读更多
            </span>
          </div>
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span class="tag" :class="tagClass(article.tag)">{{ tagLabel(article.tag) }}</span>
            <span class="blog-card-date">
              <i class="fa-regular fa-calendar"></i> {{ article.date }}
            </span>
          </div>
          <h3 class="blog-card-title">{{ article.title }}</h3>
          <p class="blog-card-excerpt">{{ article.excerpt }}</p>
          <div class="blog-card-footer">
            <span class="blog-card-views">
              <i class="fa-regular fa-eye"></i> {{ article.views }}
            </span>
            <span class="blog-card-readmore">
              阅读更多 <i class="fa-solid fa-arrow-right"></i>
            </span>
          </div>
        </div>
      </article>
    </div>

    <div v-else class="empty-state glass-card">
      <i class="fa-solid fa-face-frown" style="font-size:2rem;display:block;margin-bottom:8px;"></i>
      <p>暂无该分类的文章，敬请期待～</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTag = ref('all')

const articles = [
  {
    id: 1,
    title: '《葬送的芙莉莲》完结评测：时间的重量与旅途的意义',
    excerpt: '当勇者一行人从魔王城凯旋，人类与精灵的时间尺度差异被前所未有地放大。这部作品用极为温柔的方式，讲述了时间的残酷、记忆的重量，以及"了解一个人"需要多远的路...',
    tag: 'anime',
    date: '2024-03-15',
    views: '12.6k',
    words: '3,200',
    cover: 'https://via.placeholder.com/600x340/1a1a3e/00e5ff?text=📖+葬送的芙莉莲',
  },
  {
    id: 2,
    title: '《艾尔登法环》黄金树之影 DLC 全 BOSS 攻略指南',
    excerpt: '历经 120+ 小时，终于拿下了黄金树之影的全部追忆 Boss。分享每个 Boss 的逃课打法、装备推荐和剧情解析。梅瑟莫的火焰、拉塔恩的终局，每一场战斗都值得铭记...',
    tag: 'game',
    date: '2024-06-28',
    views: '8.3k',
    words: '5,600',
    cover: 'https://via.placeholder.com/600x340/1a1a3e/ff2d78?text=⚔️+艾尔登法环',
  },
  {
    id: 3,
    title: '傲娇学概论：为何这个属性经久不衰？',
    excerpt: '从明日香到辉夜大小姐，从古典傲娇到现代傲娇，这 20 年傲娇角色经历了怎样的演变？聊聊傲娇的心理学基础、配音技巧，以及为什么我们永远会为傲娇心动...',
    tag: 'otaku',
    date: '2024-02-10',
    views: '6.9k',
    words: '4,100',
    cover: 'https://via.placeholder.com/600x340/1a1a3e/b347ea?text=💭+傲娇学概论',
  },
  {
    id: 4,
    title: '用 Vue 3 + Vite 重构了我的追番管理工具',
    excerpt: '分享如何用 Composition API + Pinia + Tailwind CSS 从零构建追番进度管理 SPA。支持本地存储、拖拽排序、进度可视化，顺便聊聊 Vite 的构建优化技巧...',
    tag: 'tech',
    date: '2024-01-20',
    views: '4.2k',
    words: '2,800',
    cover: 'https://via.placeholder.com/600x340/1a1a3e/39ff14?text=💻+Vue3+追番工具',
  },
  {
    id: 5,
    title: '2024年1月新番扫雷报告：本季霸权花落谁家？',
    excerpt: '一口气看了 20+ 部新番的第一集，为你选出最值得追的 TOP 10。从制作质量、剧情潜力、声优阵容多维度评分，本季霸权番竟然是这部冷门佳作...',
    tag: 'anime',
    date: '2024-01-15',
    views: '15.1k',
    words: '4,800',
    cover: 'https://via.placeholder.com/600x340/1a1a3e/ffd700?text=📺+2024冬新番扫雷',
  },
  {
    id: 6,
    title: '《崩坏：星穹铁道》2.0 版本：匹诺康尼剧情深度解读',
    excerpt: '从钟表匠的遗产到家族的内斗，从流萤的秘密到黄泉的真实身份，聊聊 2.0 主线中那些细思极恐的伏笔与叙事诡计。崩铁支棱起来了...',
    tag: 'game',
    date: '2024-02-08',
    views: '9.7k',
    words: '3,900',
    cover: 'https://via.placeholder.com/600x340/1a1a3e/ff2d78?text=🚂+星穹铁道2.0',
  },
]

const totalViews = computed(() => {
  const sum = articles.reduce((s, a) => s + parseFloat(a.views), 0)
  return sum.toFixed(1) + 'k'
})

const totalWords = computed(() => {
  const sum = articles.reduce((s, a) => s + parseInt(a.words.replace(',', '')), 0)
  return (sum / 1000).toFixed(1) + 'k'
})

const filteredArticles = computed(() => {
  if (activeTag.value === 'all') return articles
  return articles.filter((a) => a.tag === activeTag.value)
})

const tagMap = {
  anime: '番剧评测',
  game: '游戏攻略',
  otaku: '二次元杂谈',
  tech: '技术笔记',
}

function tagLabel(tag) { return tagMap[tag] || tag }
function tagClass(tag) {
  if (tag === 'game') return 'pink'
  if (tag === 'otaku') return 'purple'
  if (tag === 'tech') return 'green'
  return ''
}

function goDetail(id) {
  router.push({ name: 'BlogDetail', params: { id } })
}
</script>

<style scoped>
.tag-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 24px;
}

.blog-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 20px 32px;
  margin-bottom: 32px;
  text-align: center;
}

.stat-item {
  flex: 1;
}

.stat-num {
  display: block;
  font-size: 1.6rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--neon-pink), var(--neon-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(255,255,255,0.08);
}

/* Blog Card */
.blog-card {
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.blog-card-cover {
  height: 180px;
  overflow: hidden;
  position: relative;
}

.blog-card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .blog-card-cover img {
  transform: scale(1.1);
}

.blog-card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition);
}

.blog-card:hover .blog-card-overlay {
  opacity: 1;
}

.overlay-btn {
  padding: 10px 22px;
  border-radius: 10px;
  background: rgba(255, 45, 120, 0.9);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  transform: translateY(8px);
  transition: transform var(--transition);
}

.blog-card:hover .overlay-btn {
  transform: translateY(0);
}

.blog-card-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.blog-card-date {
  font-size: 0.8rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.blog-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.45;
  transition: color var(--transition);
}

.blog-card:hover .blog-card-title {
  color: var(--neon-pink);
}

.blog-card-excerpt {
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.blog-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-card-views {
  font-size: 0.82rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.blog-card-readmore {
  font-size: 0.85rem;
  color: var(--neon-cyan);
  font-weight: 600;
  opacity: 0;
  transform: translateX(-8px);
  transition: all var(--transition);
  display: flex;
  align-items: center;
  gap: 4px;
}

.blog-card:hover .blog-card-readmore {
  opacity: 1;
  transform: translateX(0);
}

.empty-state {
  text-align: center;
  padding: 60px 24px;
  font-size: 1.1rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .blog-stats {
    flex-direction: column;
    gap: 12px;
  }
  .stat-divider {
    width: 60px;
    height: 1px;
  }
}
</style>
