<template>
  <div class="page anime-page">
    <h1 class="page-title"><i class="fa-solid fa-tv"></i> 追番看板</h1>
    <p class="page-subtitle">追番进度 · 年度总结 · 补番计划</p>

    <!-- Currently Watching -->
    <section class="anime-section">
      <h2 class="section-title">
        <i class="fa-solid fa-play"></i> 当前追番列表
      </h2>
      <p class="section-desc">正在同步追更中...</p>

      <div class="anime-list">
        <div v-for="(anime, i) in watchingList" :key="anime.id"
             class="anime-card glass-card"
             :style="{ '--ani-delay': (i * 0.1) + 's' }">
          <div class="anime-cover-area">
            <img :src="anime.cover" :alt="anime.title" loading="lazy" />
            <span class="anime-status-badge" :class="anime.status">
              {{ anime.status === 'airing' ? '连载中' : '已完结' }}
            </span>
          </div>
          <div class="anime-info-area">
            <h3 class="anime-title">{{ anime.title }}</h3>
            <p class="anime-meta">
              <span class="anime-season">{{ anime.season }}</span>
              <span class="anime-genre">{{ anime.genre }}</span>
            </p>
            <div class="anime-progress-area">
              <div class="anime-progress-header">
                <span class="progress-text">
                  进度：<strong>{{ anime.current }} / {{ anime.total }}</strong> 集
                </span>
                <span class="progress-percent" :class="{ done: anime.current === anime.total }">
                  {{ anime.current === anime.total ? '🎉 已追完' : Math.round(anime.current / anime.total * 100) + '%' }}
                </span>
              </div>
              <div class="progress-bar">
                <div class="progress-bar-fill"
                     :style="{ width: (anime.current / anime.total * 100) + '%' }"></div>
              </div>
            </div>
            <div class="anime-rating">
              <span class="rating-label">林哥评分：</span>
              <span class="stars">
                <i v-for="s in 5" :key="s"
                   class="fa-solid fa-star"
                   :class="{ filled: s <= anime.rating }"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Yearly Summary -->
    <section class="summary-section">
      <h2 class="section-title">
        <i class="fa-solid fa-chart-pie"></i> 2025 年度追番总结
      </h2>
      <p class="section-desc">数据截至 {{ currentDate }}</p>

      <div class="summary-cards">
        <div class="summary-card glass-card">
          <span class="sum-big-num">{{ yearStats.completed }}</span>
          <span class="sum-label">已追完番剧</span>
          <div class="sum-bar">
            <div class="sum-bar-fill pink" style="width:85%"></div>
          </div>
        </div>
        <div class="summary-card glass-card">
          <span class="sum-big-num">{{ yearStats.watching }}</span>
          <span class="sum-label">正在追番</span>
          <div class="sum-bar">
            <div class="sum-bar-fill cyan" style="width:40%"></div>
          </div>
        </div>
        <div class="summary-card glass-card">
          <span class="sum-big-num">{{ yearStats.totalEpisodes }}</span>
          <span class="sum-label">累计观看集数</span>
          <div class="sum-bar">
            <div class="sum-bar-fill purple" style="width:90%"></div>
          </div>
        </div>
        <div class="summary-card glass-card">
          <span class="sum-big-num">{{ yearStats.totalHours }}</span>
          <span class="sum-label">累计观看时长（小时）</span>
          <div class="sum-bar">
            <div class="sum-bar-fill yellow" style="width:75%"></div>
          </div>
        </div>
      </div>

      <!-- Genre Distribution (CSS bars) -->
      <div class="genre-chart glass-card">
        <h3 class="chart-title">📊 类型分布</h3>
        <div class="chart-bars">
          <div class="chart-row" v-for="genre in genreStats" :key="genre.name">
            <span class="chart-label">{{ genre.name }}</span>
            <div class="chart-track">
              <div class="chart-fill" :style="{ width: genre.pct + '%', background: genre.color }"></div>
            </div>
            <span class="chart-value">{{ genre.count }}部</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Plan to Watch -->
    <section class="plan-section">
      <h2 class="section-title">
        <i class="fa-solid fa-bookmark"></i> 计划补番
      </h2>
      <p class="section-desc">待补列表，欢迎推荐！</p>
      <div class="plan-grid">
        <div v-for="plan in planList" :key="plan.id" class="plan-card glass-card">
          <div class="plan-priority-badge" :class="plan.priority">{{ plan.priorityLabel }}</div>
          <span class="plan-emoji">{{ plan.emoji }}</span>
          <h4 class="plan-title">{{ plan.title }}</h4>
          <p class="plan-reason">{{ plan.reason }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const currentDate = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })

const watchingList = [
  {
    id: 1, title: '葬送的芙莉莲', season: '2023秋', genre: '奇幻·治愈',
    status: 'completed', current: 28, total: 28, rating: 5,
    cover: 'https://via.placeholder.com/280x160/1a1a3e/00e5ff?text=🧝+芙莉莲',
  },
  {
    id: 2, title: '迷宫饭', season: '2024冬', genre: '美食·奇幻',
    status: 'airing', current: 18, total: 24, rating: 5,
    cover: 'https://via.placeholder.com/280x160/1a1a3e/ffd700?text=🍖+迷宫饭',
  },
  {
    id: 3, title: '为美好的世界献上祝福！3', season: '2024春', genre: '异世界·搞笑',
    status: 'airing', current: 8, total: 12, rating: 4,
    cover: 'https://via.placeholder.com/280x160/1a1a3e/b347ea?text=💥+素晴3',
  },
  {
    id: 4, title: '怪兽8号', season: '2024春', genre: '战斗·科幻',
    status: 'airing', current: 5, total: 12, rating: 4,
    cover: 'https://via.placeholder.com/280x160/1a1a3e/ff2d78?text=👾+怪兽8号',
  },
  {
    id: 5, title: '无职转生Ⅱ', season: '2024春', genre: '异世界·冒险',
    status: 'airing', current: 10, total: 24, rating: 4,
    cover: 'https://via.placeholder.com/280x160/1a1a3e/39ff14?text=⚔️+无职转生',
  },
]

const yearStats = {
  completed: 34,
  watching: 8,
  totalEpisodes: 487,
  totalHours: 162,
}

const genreStats = [
  { name: '奇幻', count: 12, pct: 35, color: 'var(--neon-pink)' },
  { name: '异世界', count: 8, pct: 24, color: 'var(--neon-cyan)' },
  { name: '搞笑日常', count: 5, pct: 15, color: 'var(--neon-yellow)' },
  { name: '战斗热血', count: 5, pct: 15, color: 'var(--neon-purple)' },
  { name: '恋爱', count: 3, pct: 8, color: 'var(--neon-green)' },
  { name: '其他', count: 1, pct: 3, color: '#aaa' },
]

const planList = [
  { id: 1, title: 'Clannad ～After Story～', emoji: '🌸', reason: '催泪神作，做好哭的准备', priority: 'high', priorityLabel: '优先' },
  { id: 2, title: '三月的狮子', emoji: '♟️', reason: '新房昭之+将棋，期待已久', priority: 'high', priorityLabel: '优先' },
  { id: 3, title: '少女终末旅行', emoji: '🏍️', reason: '末世日常，画风很对胃口', priority: 'mid', priorityLabel: '想补' },
  { id: 4, title: '比宇宙更远的地方', emoji: '🐧', reason: '南极冒险，口碑炸裂', priority: 'mid', priorityLabel: '想补' },
]
</script>

<style scoped>
/* Watching List */
.anime-section { margin-bottom: 48px; }

.anime-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.anime-card {
  display: flex;
  gap: 20px;
  padding: 0;
  overflow: hidden;
  animation: ani-enter 0.5s ease-out both;
  animation-delay: var(--ani-delay, 0s);
}

@keyframes ani-enter {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.anime-cover-area {
  width: 220px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.anime-cover-area img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.anime-status-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.72rem;
  font-weight: 700;
}

.anime-status-badge.airing { background: rgba(0,229,255,0.25); color: var(--neon-cyan); }
.anime-status-badge.completed { background: rgba(57,255,20,0.25); color: var(--neon-green); }

.anime-info-area {
  padding: 18px 18px 18px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.anime-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.anime-meta {
  display: flex;
  gap: 10px;
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-bottom: 14px;
}

.anime-season {
  padding: 1px 8px;
  border-radius: 6px;
  background: rgba(255,45,120,0.1);
  color: var(--neon-pink);
  font-size: 0.75rem;
}

.anime-progress-area {
  margin-bottom: 12px;
}

.anime-progress-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.progress-text strong { color: var(--text-primary); }

.progress-percent {
  color: var(--neon-cyan);
  font-weight: 700;
}

.progress-percent.done { color: var(--neon-green); }

.anime-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.stars i {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.15);
  margin-right: 2px;
}

.stars i.filled {
  color: var(--neon-yellow);
}

/* Summary Section */
.summary-section { margin-bottom: 48px; }

.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.summary-card {
  text-align: center;
  padding: 24px 16px;
}

.sum-big-num {
  display: block;
  font-size: 2.4rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--neon-pink), var(--neon-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2px;
}

.sum-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  display: block;
  margin-bottom: 10px;
}

.sum-bar {
  height: 4px;
  background: rgba(255,255,255,0.06);
  border-radius: 2px;
  overflow: hidden;
}

.sum-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1s ease;
}

.sum-bar-fill.pink { background: var(--neon-pink); }
.sum-bar-fill.cyan { background: var(--neon-cyan); }
.sum-bar-fill.purple { background: var(--neon-purple); }
.sum-bar-fill.yellow { background: var(--neon-yellow); }

/* Genre Chart */
.genre-chart {
  padding: 24px 28px;
}

.chart-title {
  font-size: 1.1rem;
  margin-bottom: 18px;
}

.chart-bars {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chart-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chart-label {
  width: 80px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.chart-track {
  flex: 1;
  height: 18px;
  background: rgba(255,255,255,0.04);
  border-radius: 9px;
  overflow: hidden;
}

.chart-fill {
  height: 100%;
  border-radius: 9px;
  transition: width 1.2s ease;
  position: relative;
}

.chart-fill::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2));
  animation: shimmer 2s infinite;
}

.chart-value {
  font-size: 0.82rem;
  color: var(--text-muted);
  min-width: 36px;
  text-align: right;
}

/* Plan Section */
.plan-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.plan-card {
  text-align: center;
  padding: 24px 20px;
  position: relative;
}

.plan-priority-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 3px 10px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 700;
}

.plan-priority-badge.high { background: rgba(255,45,120,0.2); color: var(--neon-pink); }
.plan-priority-badge.mid { background: rgba(179,71,234,0.2); color: var(--neon-purple); }

.plan-emoji {
  display: block;
  font-size: 2.5rem;
  margin-bottom: 8px;
}

.plan-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.plan-reason {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .anime-card {
    flex-direction: column;
  }

  .anime-cover-area {
    width: 100%;
    height: 140px;
  }

  .anime-info-area {
    padding: 16px;
  }

  .summary-cards { grid-template-columns: repeat(2, 1fr); }
  .plan-grid { grid-template-columns: 1fr; }
}
</style>
