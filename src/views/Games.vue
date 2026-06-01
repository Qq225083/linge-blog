<template>
  <div class="page games-page">
    <h1 class="page-title"><i class="fa-solid fa-gamepad"></i> 游戏库</h1>
    <p class="page-subtitle">在玩 · 通关 · 弃坑 · 愿望单</p>

    <!-- Category Tabs -->
    <div class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        <i :class="tab.icon"></i> {{ tab.label }}
        <span class="tab-count">{{ games[tab.key].length }}</span>
      </button>
    </div>

    <!-- Game Grid -->
    <div class="card-grid" v-if="currentGames.length">
      <div
        v-for="game in currentGames"
        :key="game.id"
        class="game-card glass-card"
      >
        <div class="game-cover">
          <img :src="game.cover" :alt="game.name" loading="lazy" />
          <div class="game-score" v-if="game.score > 0">
            <span class="score-num">{{ game.score }}</span>
            <span class="score-unit">/10</span>
          </div>
        </div>
        <div class="game-body">
          <h3 class="game-name">{{ game.name }}</h3>
          <div class="game-platform">
            <i class="fa-solid fa-desktop" v-if="game.platform.includes('PC')"></i>
            <i class="fa-brands fa-steam" v-if="game.platform.includes('Steam')"></i>
            <i class="fa-solid fa-gamepad" v-if="game.platform.includes('Switch') || game.platform.includes('PS5')"></i>
            {{ game.platform }}
          </div>
          <div class="game-rating-stars" v-if="game.score > 0">
            <i v-for="s in 10" :key="s"
               class="fa-solid fa-star"
               :class="{ filled: s <= game.score, half: s === Math.ceil(game.score) && game.score % 1 !== 0 }"></i>
          </div>
          <p class="game-comment">
            <i class="fa-solid fa-quote-left"></i> {{ game.comment }}
          </p>
          <div class="game-hours" v-if="game.hours">
            <i class="fa-regular fa-clock"></i> 游戏时长：{{ game.hours }}小时
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state glass-card">
      <p>🎮 暂无该分类的游戏</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('playing')

const tabs = [
  { key: 'playing', label: '在玩', icon: 'fa-solid fa-play' },
  { key: 'completed', label: '通关', icon: 'fa-solid fa-trophy' },
  { key: 'dropped', label: '弃坑', icon: 'fa-solid fa-circle-stop' },
  { key: 'wishlist', label: '愿望单', icon: 'fa-solid fa-heart' },
]

const games = {
  playing: [
    {
      id: 1, name: '艾尔登法环 黄金树之影', platform: 'Steam / PC',
      score: 9.5, comment: '宫崎英高的怜悯，DLC 体量堪比一个新游戏，痛并快乐着',
      hours: 120, cover: 'https://via.placeholder.com/400x220/1a1a3e/ffd700?text=🗡️+艾尔登法环',
    },
    {
      id: 2, name: '崩坏：星穹铁道', platform: 'PC / iOS',
      score: 8.5, comment: '每日打卡模拟器，但剧情确实越来越精彩了',
      hours: 280, cover: 'https://via.placeholder.com/400x220/1a1a3e/00e5ff?text=🚂+星穹铁道',
    },
  ],
  completed: [
    {
      id: 3, name: '塞尔达传说：王国之泪', platform: 'Nintendo Switch',
      score: 10, comment: '年度游戏实至名归，究极手的自由度令人惊叹',
      hours: 180, cover: 'https://via.placeholder.com/400x220/1a1a3e/39ff14?text=🗺️+王国之泪',
    },
    {
      id: 4, name: '女神异闻录5 皇家版', platform: 'Steam / PC',
      score: 9.5, comment: '心之怪盗团永远的神，UI 设计带偏整个行业',
      hours: 140, cover: 'https://via.placeholder.com/400x220/1a1a3e/ff2d78?text=🎭+P5R',
    },
    {
      id: 5, name: '只狼：影逝二度', platform: 'Steam / PC',
      score: 9, comment: '打铁模拟器，和义父对砍那场战斗终生难忘',
      hours: 65, cover: 'https://via.placeholder.com/400x220/1a1a3e/b347ea?text=⚔️+只狼',
    },
    {
      id: 6, name: '空洞骑士', platform: 'Nintendo Switch',
      score: 9, comment: '等待丝之歌的第 N 年，Team Cherry 在做什么？',
      hours: 55, cover: 'https://via.placeholder.com/400x220/1a1a3e/00e5ff?text=🐛+空洞骑士',
    },
  ],
  dropped: [
    {
      id: 7, name: '原神', platform: 'PC / iOS',
      score: 7, comment: '太肝了，圣遗物地狱让人身心俱疲，退坑保平安',
      hours: 500, cover: 'https://via.placeholder.com/400x220/1a1a3e/ff2d78?text=🌬️+原神',
    },
    {
      id: 8, name: 'APEX Legends', platform: 'Steam / PC',
      score: 6, comment: '被外挂和炸鱼劝退，但泰坦陨落的精神永不灭',
      hours: 200, cover: 'https://via.placeholder.com/400x220/1a1a3e/ff2d78?text=🔫+APEX',
    },
  ],
  wishlist: [
    {
      id: 9, name: '黑神话：悟空', platform: 'Steam / PC',
      score: 0, comment: '国产之光！从第一个预告片就在等，必入豪华版',
      hours: 0, cover: 'https://via.placeholder.com/400x220/1a1a3e/ffd700?text=🐒+黑神话',
    },
    {
      id: 10, name: '丝之歌', platform: 'Nintendo Switch',
      score: 0, comment: '有生之年系列...小骑士我们什么时候再见？',
      hours: 0, cover: 'https://via.placeholder.com/400x220/1a1a3e/b347ea?text=🪡+丝之歌',
    },
  ],
}

const currentGames = computed(() => games[activeTab.value] || [])
</script>

<style scoped>
/* Tab Bar */
.tab-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 28px;
  flex-wrap: wrap;
  justify-content: center;
}

.tab-btn {
  padding: 10px 20px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-secondary);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition);
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tab-btn:hover {
  border-color: var(--neon-cyan-soft);
  color: var(--text-primary);
}

.tab-btn.active {
  background: rgba(0, 229, 255, 0.15);
  border-color: var(--neon-cyan);
  color: var(--neon-cyan);
  box-shadow: 0 0 18px rgba(0, 229, 255, 0.15);
}

.tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  font-size: 0.72rem;
  font-weight: 700;
}

.tab-btn.active .tab-count {
  background: rgba(0,229,255,0.2);
}

/* Game Card */
.game-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.game-cover {
  height: 180px;
  overflow: hidden;
  position: relative;
}

.game-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.game-card:hover .game-cover img {
  transform: scale(1.08);
}

.game-score {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: baseline;
  gap: 2px;
  padding: 6px 12px;
  border-radius: 10px;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.1);
}

.score-num {
  font-size: 1.3rem;
  font-weight: 900;
  color: var(--neon-yellow);
}

.score-unit {
  font-size: 0.72rem;
  color: var(--text-muted);
}

.game-body {
  padding: 18px 20px 22px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.game-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.game-platform {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.game-rating-stars {
  margin-bottom: 8px;
}

.game-rating-stars i {
  font-size: 0.67rem;
  margin-right: 1px;
  color: rgba(255,255,255,0.12);
}

.game-rating-stars i.filled {
  color: var(--neon-yellow);
}

.game-rating-stars i.half {
  color: var(--neon-yellow);
  opacity: 0.5;
}

.game-comment {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-style: italic;
  flex: 1;
  margin-bottom: 8px;
}

.game-comment i {
  color: var(--neon-pink);
  font-size: 0.7rem;
  margin-right: 2px;
}

.game-hours {
  font-size: 0.8rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 5px;
}

.game-hours i { color: var(--neon-cyan); }

.empty-state {
  text-align: center;
  padding: 48px 24px;
  color: var(--text-muted);
}
</style>
