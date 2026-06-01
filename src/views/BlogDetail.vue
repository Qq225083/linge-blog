<template>
  <div class="page blog-detail-page">
    <!-- Back button -->
    <router-link to="/blog" class="back-link">
      <i class="fa-solid fa-arrow-left"></i> 返回博客列表
    </router-link>

    <article v-if="article" class="article-content">
      <!-- Cover -->
      <div class="article-cover">
        <img :src="article.cover" :alt="article.title" />
      </div>

      <!-- Header -->
      <header class="article-header">
        <div class="article-meta-row">
          <span class="tag" :class="tagClass(article.tag)">{{ tagLabel(article.tag) }}</span>
          <span class="article-date">
            <i class="fa-regular fa-calendar"></i> {{ article.date }}
          </span>
          <span class="article-views">
            <i class="fa-regular fa-eye"></i> {{ article.views }} 阅读
          </span>
          <span class="article-words">
            <i class="fa-regular fa-file-lines"></i> {{ article.words }} 字
          </span>
        </div>
        <h1 class="article-title">{{ article.title }}</h1>
      </header>

      <!-- Body -->
      <div class="article-body glass-card no-hover">
        <p>{{ article.excerpt }}</p>

        <!-- Simulated full content -->
        <p>这篇文章将深入探讨{{ tagLabel(article.tag) }}领域的相关话题。作为一个资深二次元兼全栈工程师，林哥会以独特的视角为你分析。</p>

        <h2>引言</h2>
        <p>在开始之前，我们先来回顾一下相关的背景。{{ tagLabel(article.tag) }}一直是二次元圈子里备受关注的话题。无论你是刚入坑的新人，还是已经在这个圈子摸爬滚打多年的老宅，相信这篇文章都能给你带来一些新的思考。</p>

        <h2>核心观点</h2>
        <p>作为一个在二次元深耕多年的老宅，我认为这个话题可以从以下几个维度来分析：</p>

        <ol>
          <li><strong>制作水平：</strong>动画/游戏的制作质量是决定第一印象的关键因素。从画面精细度到音效设计，每一个细节都值得仔细品味。</li>
          <li><strong>剧情深度：</strong>好的故事能引起观众的共鸣。无论是热血的战斗还是细腻的情感描写，剧情的厚度决定了作品能否成为经典。</li>
          <li><strong>声优表现：</strong>优秀的声优能为角色注入灵魂。一个恰到好处的配音可以让角色形象更加立体。</li>
          <li><strong>配乐氛围：</strong>一首好的BGM能让观众瞬间回到作品的世界中。配乐是营造氛围的重要工具。</li>
        </ol>

        <blockquote>
          <i class="fa-solid fa-quote-left"></i>
          每个人心中都有属于自己的神作。重要的不是别人怎么评价，而是这部作品对你意味着什么。
          <i class="fa-solid fa-quote-right"></i>
        </blockquote>

        <h2>深入分析</h2>
        <p>从创作者的角度来看，制作一个优秀的作品需要多方面的努力。以最近热门的几部番剧为例，我们能看到动画行业在技术和艺术层面的持续进步。画质的提升、叙事手法的创新、以及更丰富的题材选择，都在推动着这个行业向前发展。</p>

        <p>而从观众的角度来说，我们的审美和期待也在不断提升。十年前我们可能只需要酷炫的战斗场面就能满足，但现在我们更期待完整的世界观、立体的角色塑造、有深度的主题表达。</p>

        <h2>总结</h2>
        <p>总的来说，无论是追番、打游戏还是写代码，保持热爱和好奇是最重要的。二次元不仅是娱乐，它更是一种文化、一种生活方式。希望每个热爱二次元的人都能在这个世界里找到属于自己的乐趣。</p>

        <p style="text-align:center;margin-top:32px;">— END —</p>
      </div>

      <!-- Article Footer -->
      <div class="article-footer">
        <div class="article-tags">
          <span class="tag pink"><i class="fa-solid fa-tag"></i> {{ tagLabel(article.tag) }}</span>
          <span class="tag purple">二次元</span>
          <span class="tag">林哥の次元</span>
        </div>
        <div class="article-nav">
          <router-link v-if="prevArticle" :to="'/blog/' + prevArticle.id" class="btn article-nav-btn">
            <i class="fa-solid fa-arrow-left"></i> {{ prevArticle.title.slice(0, 15) }}...
          </router-link>
          <router-link v-if="nextArticle" :to="'/blog/' + nextArticle.id" class="btn article-nav-btn">
            {{ nextArticle.title.slice(0, 15) }}... <i class="fa-solid fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </article>

    <div v-else class="empty-state glass-card">
      <p>文章不存在或已被删除 😢</p>
      <router-link to="/blog" class="btn" style="margin-top:16px;">返回博客列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const articles = [
  {
    id: 1, title: '《葬送的芙莉莲》完结评测：时间的重量与旅途的意义',
    excerpt: '当勇者一行人从魔王城凯旋，人类与精灵的时间尺度差异被前所未有地放大。这部作品用极为温柔的方式，讲述了时间的残酷、记忆的重量，以及"了解一个人"需要多远的路...',
    tag: 'anime', date: '2024-03-15', views: '12.6k', words: '3,200',
    cover: 'https://via.placeholder.com/900x400/1a1a3e/00e5ff?text=📖+葬送的芙莉莲',
  },
  {
    id: 2, title: '《艾尔登法环》黄金树之影 DLC 全 BOSS 攻略指南',
    excerpt: '历经 120+ 小时，终于拿下了黄金树之影的全部追忆 Boss。分享每个 Boss 的逃课打法、装备推荐和剧情解析...',
    tag: 'game', date: '2024-06-28', views: '8.3k', words: '5,600',
    cover: 'https://via.placeholder.com/900x400/1a1a3e/ff2d78?text=⚔️+艾尔登法环',
  },
  {
    id: 3, title: '傲娇学概论：为何这个属性经久不衰？',
    excerpt: '从明日香到辉夜大小姐，从古典傲娇到现代傲娇，这20年傲娇角色经历了怎样的演变？...',
    tag: 'otaku', date: '2024-02-10', views: '6.9k', words: '4,100',
    cover: 'https://via.placeholder.com/900x400/1a1a3e/b347ea?text=💭+傲娇学概论',
  },
  {
    id: 4, title: '用 Vue 3 + Vite 重构了我的追番管理工具',
    excerpt: '分享如何用 Composition API + Pinia + Tailwind CSS 从零构建追番进度管理 SPA...',
    tag: 'tech', date: '2024-01-20', views: '4.2k', words: '2,800',
    cover: 'https://via.placeholder.com/900x400/1a1a3e/39ff14?text=💻+Vue3+追番工具',
  },
  {
    id: 5, title: '2024年1月新番扫雷报告：本季霸权花落谁家？',
    excerpt: '一口气看了20+部新番的第一集，为你选出最值得追的TOP 10...',
    tag: 'anime', date: '2024-01-15', views: '15.1k', words: '4,800',
    cover: 'https://via.placeholder.com/900x400/1a1a3e/ffd700?text=📺+2024冬新番扫雷',
  },
  {
    id: 6, title: '《崩坏：星穹铁道》2.0 版本：匹诺康尼剧情深度解读',
    excerpt: '从钟表匠的遗产到家族的内斗，从流萤的秘密到黄泉的真实身份...',
    tag: 'game', date: '2024-02-08', views: '9.7k', words: '3,900',
    cover: 'https://via.placeholder.com/900x400/1a1a3e/ff2d78?text=🚂+星穹铁道2.0',
  },
]

const article = computed(() => {
  const id = parseInt(route.params.id)
  return articles.find(a => a.id === id) || null
})

const currentIndex = computed(() => {
  if (!article.value) return -1
  return articles.indexOf(article.value)
})

const prevArticle = computed(() => {
  if (currentIndex.value > 0) return articles[currentIndex.value - 1]
  return null
})

const nextArticle = computed(() => {
  if (currentIndex.value < articles.length - 1) return articles[currentIndex.value + 1]
  return null
})

const tagMap = {
  anime: '番剧评测', game: '游戏攻略', otaku: '二次元杂谈', tech: '技术笔记',
}
function tagLabel(tag) { return tagMap[tag] || tag }
function tagClass(tag) {
  if (tag === 'game') return 'pink'
  if (tag === 'otaku') return 'purple'
  if (tag === 'tech') return 'green'
  return ''
}
</script>

<style scoped>
.blog-detail-page {
  max-width: 860px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 24px;
  transition: color var(--transition);
}

.back-link:hover {
  color: var(--neon-cyan);
}

.article-cover {
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 28px;
  border: 1px solid var(--glass-border);
}

.article-cover img {
  width: 100%;
  display: block;
}

.article-header {
  margin-bottom: 28px;
}

.article-meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.article-date,
.article-views,
.article-words {
  font-size: 0.82rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.article-title {
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.35;
}

.article-body {
  font-size: 1.02rem;
  line-height: 1.9;
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.article-body h2 {
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--text-primary);
  margin: 32px 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.article-body ol {
  padding-left: 24px;
  margin: 12px 0;
}

.article-body li {
  margin-bottom: 8px;
}

.article-body li strong {
  color: var(--neon-cyan);
}

.article-body blockquote {
  border-left: 3px solid var(--neon-pink);
  padding: 16px 20px;
  margin: 20px 0;
  background: rgba(255, 45, 120, 0.05);
  border-radius: 0 var(--radius) var(--radius) 0;
  font-style: italic;
  color: var(--text-primary);
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: wrap;
}

.article-body blockquote i {
  color: var(--neon-pink);
  font-size: 0.9rem;
}

.article-body p {
  margin-bottom: 12px;
}

.article-footer {
  margin-bottom: 40px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.article-nav {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.article-nav-btn {
  text-transform: none;
  font-size: 0.88rem;
  flex: 0 1 auto;
  padding: 10px 18px;
}

.empty-state {
  text-align: center;
  padding: 60px 24px;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 1.5rem;
  }

  .article-nav {
    flex-direction: column;
  }
}
</style>
