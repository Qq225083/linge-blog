<template>
  <div class="page friends-page">
    <h1 class="page-title"><i class="fa-solid fa-users"></i> 友链</h1>
    <p class="page-subtitle">RPG 队伍成员 · 勇者集结</p>

    <!-- Party Banner -->
    <div class="party-banner glass-card">
      <div class="party-stat">
        <i class="fa-solid fa-user-group"></i>
        <span class="party-num">{{ friends.length }}</span>
        <span class="party-label">队伍人数</span>
      </div>
      <div class="party-stat">
        <i class="fa-solid fa-bolt"></i>
        <span class="party-num">{{ totalPower }}</span>
        <span class="party-label">总战斗力</span>
      </div>
      <div class="party-stat">
        <i class="fa-solid fa-flag-checkered"></i>
        <span class="party-num status-text">攻略中</span>
        <span class="party-label">冒险状态</span>
      </div>
    </div>

    <!-- Friend Grid -->
    <div class="card-grid-3">
      <div
        v-for="(friend, i) in friends"
        :key="friend.id"
        class="friend-card glass-card"
        :style="{ '--fr-delay': (i * 0.08) + 's' }"
      >
        <!-- Card Glow Effect -->
        <div class="friend-card-glow"></div>

        <!-- Avatar Area -->
        <div class="friend-avatar-area">
          <img :src="friend.avatar" :alt="friend.name" class="friend-avatar-img" loading="lazy" />
          <span class="friend-class-badge" :class="friend.rpgClass">
            {{ friend.classLabel }}
          </span>
        </div>

        <!-- Info -->
        <div class="friend-info">
          <h3 class="friend-name">{{ friend.name }}</h3>
          <p class="friend-site-name">
            <i class="fa-solid fa-globe"></i> {{ friend.siteName }}
          </p>
          <p class="friend-bio">{{ friend.bio }}</p>
        </div>

        <!-- RPG Stats -->
        <div class="friend-stats-grid">
          <div class="fr-stat hp-stat">
            <span class="fr-stat-icon">❤️</span>
            <span class="fr-stat-label">HP</span>
            <div class="progress-bar mini-bar">
              <div class="progress-bar-fill hp-fill" :style="{ width: friend.hp + '%' }"></div>
            </div>
          </div>
          <div class="fr-stat mp-stat">
            <span class="fr-stat-icon">💎</span>
            <span class="fr-stat-label">MP</span>
            <div class="progress-bar mini-bar">
              <div class="progress-bar-fill mp-fill" :style="{ width: friend.mp + '%' }"></div>
            </div>
          </div>
          <div class="fr-stat atk-stat">
            <span class="fr-stat-value">{{ friend.atk }}</span>
            <span class="fr-stat-label">ATK</span>
          </div>
          <div class="fr-stat def-stat">
            <span class="fr-stat-value">{{ friend.def }}</span>
            <span class="fr-stat-label">DEF</span>
          </div>
        </div>

        <!-- Visit Link -->
        <a
          :href="friend.url"
          target="_blank"
          rel="noopener noreferrer"
          class="friend-visit-btn"
        >
          <i class="fa-solid fa-door-open"></i> 访问据点
        </a>
      </div>
    </div>

    <!-- Exchange CTA -->
    <div class="exchange-cta glass-card">
      <div class="cta-content">
        <div class="cta-icon">
          <i class="fa-solid fa-handshake"></i>
        </div>
        <div class="cta-text">
          <h3>🤝 勇者招募中！</h3>
          <p>如果你的博客也是二次元风格，欢迎交换友链，一起在异世界冒险！</p>
          <p class="cta-email">
            <i class="fa-solid fa-envelope"></i> linge@example.com
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const friends = [
  {
    id: 1,
    name: '星屑の轨迹',
    siteName: 'hoshikuzu.dev',
    bio: '主业前端，副业同人画师。Vue 邪教徒，偶尔画点二次元插画，欢迎来玩！',
    avatar: 'https://via.placeholder.com/100x100/1a1a3e/00e5ff?text=🌟',
    rpgClass: 'mage',
    classLabel: '魔法师',
    hp: 85, mp: 95, atk: 72, def: 48,
    url: 'https://example1.dev',
  },
  {
    id: 2,
    name: '喵了个咪',
    siteName: 'neko-games.blog',
    bio: '独爱 JRPG 与魂系游戏，B站小透明 UP 主。录点游戏实况，欢迎来砍～',
    avatar: 'https://via.placeholder.com/100x100/1a1a3e/ff2d78?text=🐱',
    rpgClass: 'warrior',
    classLabel: '战士',
    hp: 92, mp: 40, atk: 88, def: 65,
    url: 'https://example2.game',
  },
  {
    id: 3,
    name: '时の旅人',
    siteName: 'chronos.tech',
    bio: 'Rustaceans + Gopher，边写代码边追番。时间管理大师，崩铁也是我的菜～',
    avatar: 'https://via.placeholder.com/100x100/1a1a3e/b347ea?text=⏳',
    rpgClass: 'sage',
    classLabel: '贤者',
    hp: 70, mp: 98, atk: 65, def: 55,
    url: 'https://example3.tech',
  },
  {
    id: 4,
    name: '樱小路の日常',
    siteName: 'sakura-life.life',
    bio: '手账 · 料理 · 摄影 | 努力让每一天都闪闪发光，治愈系博主',
    avatar: 'https://via.placeholder.com/100x100/1a1a3e/ffd700?text=🌸',
    rpgClass: 'healer',
    classLabel: '治愈师',
    hp: 78, mp: 88, atk: 40, def: 60,
    url: 'https://example4.life',
  },
  {
    id: 5,
    name: '第七维度',
    siteName: '7th-dimension.ai',
    bio: 'ML/DL 炼丹师，用 AI 生成二次元老婆。AIGC × 二次元布道者',
    avatar: 'https://via.placeholder.com/100x100/1a1a3e/39ff14?text=🔮',
    rpgClass: 'mage',
    classLabel: '魔法师',
    hp: 68, mp: 96, atk: 78, def: 42,
    url: 'https://example5.ai',
  },
  {
    id: 6,
    name: '夜刀神の部屋',
    siteName: 'yatogami-anime.org',
    bio: '每季度万字长评，动画考据狂魔。冷门番挖掘机，分镜分析爱好者',
    avatar: 'https://via.placeholder.com/100x100/1a1a3e/00e5ff?text=🌙',
    rpgClass: 'sage',
    classLabel: '贤者',
    hp: 74, mp: 90, atk: 55, def: 50,
    url: 'https://example6.anime',
  },
]

const totalPower = computed(() =>
  friends.reduce((sum, f) => sum + f.atk + f.def, 0)
)
</script>

<style scoped>
/* Party Banner */
.party-banner {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-bottom: 32px;
  padding: 28px 32px;
}

.party-stat {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.party-stat i {
  font-size: 1.4rem;
  color: var(--neon-cyan);
  margin-bottom: 4px;
}

.party-num {
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--neon-pink), var(--neon-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.party-num.status-text {
  font-size: 1.2rem;
  -webkit-text-fill-color: var(--neon-cyan);
  color: var(--neon-cyan);
}

.party-label {
  font-size: 0.82rem;
  color: var(--text-muted);
}

/* Friend Card */
.friend-card {
  padding: 28px 22px;
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: fr-enter 0.5s ease-out both;
  animation-delay: var(--fr-delay, 0s);
}

@keyframes fr-enter {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.friend-card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(ellipse at center, rgba(255,45,120,0.06), transparent 50%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.friend-card:hover .friend-card-glow {
  opacity: 1;
}

/* Avatar */
.friend-avatar-area {
  position: relative;
  display: inline-block;
  margin-bottom: 14px;
}

.friend-avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid var(--neon-cyan);
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
  object-fit: cover;
  transition: all var(--transition);
}

.friend-card:hover .friend-avatar-img {
  border-color: var(--neon-pink);
  box-shadow: 0 0 30px rgba(255, 45, 120, 0.4);
  transform: rotate(10deg) scale(1.08);
}

.friend-class-badge {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 12px;
  border-radius: 10px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 1px;
  white-space: nowrap;
}

.friend-class-badge.warrior { background: rgba(255,69,58,0.2); color: #ff453a; border: 1px solid rgba(255,69,58,0.3); }
.friend-class-badge.mage { background: rgba(0,122,255,0.2); color: #007aff; border: 1px solid rgba(0,122,255,0.3); }
.friend-class-badge.healer { background: rgba(52,199,89,0.2); color: #34c759; border: 1px solid rgba(52,199,89,0.3); }
.friend-class-badge.sage { background: rgba(179,71,234,0.2); color: var(--neon-purple); border: 1px solid rgba(179,71,234,0.3); }

/* Info */
.friend-name {
  font-size: 1.15rem;
  font-weight: 900;
  margin-bottom: 2px;
}

.friend-site-name {
  font-size: 0.82rem;
  color: var(--neon-cyan);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.friend-bio {
  font-size: 0.82rem;
  color: var(--text-secondary);
  margin-bottom: 14px;
  line-height: 1.5;
  min-height: 36px;
}

/* RPG Stats */
.friend-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 12px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.025);
  border-radius: var(--radius);
  margin-bottom: 16px;
  border: 1px solid rgba(255,255,255,0.04);
}

.fr-stat {
  display: flex;
  align-items: center;
  gap: 5px;
}

.fr-stat-icon {
  font-size: 0.7rem;
}

.fr-stat-label {
  font-size: 0.7rem;
  font-weight: 900;
  color: var(--text-muted);
  min-width: 20px;
}

.fr-stat-value {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--neon-yellow);
}

.mini-bar {
  flex: 1;
  height: 5px;
  border-radius: 3px;
}

.hp-fill { background: linear-gradient(90deg, #ff453a, #ff6b5a); }
.mp-fill { background: linear-gradient(90deg, #007aff, #5ac8fa); }

/* Visit Button */
.friend-visit-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  border-radius: 10px;
  background: rgba(0, 229, 255, 0.1);
  border: 1px solid rgba(0, 229, 255, 0.2);
  color: var(--neon-cyan);
  font-weight: 700;
  font-size: 0.85rem;
  transition: all var(--transition);
}

.friend-visit-btn:hover {
  background: var(--neon-cyan);
  color: #000;
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.4);
}

/* Exchange CTA */
.exchange-cta {
  margin-top: 36px;
  padding: 28px 32px;
}

.cta-content {
  display: flex;
  align-items: center;
  gap: 24px;
}

.cta-icon {
  font-size: 2.5rem;
  color: var(--neon-yellow);
  flex-shrink: 0;
}

.cta-text h3 {
  font-size: 1.2rem;
  margin-bottom: 6px;
}

.cta-text p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.cta-email {
  margin-top: 4px;
  color: var(--neon-cyan) !important;
  font-weight: 600;
}

@media (max-width: 768px) {
  .party-banner {
    gap: 24px;
    flex-wrap: wrap;
  }
  .cta-content {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 600px) {
  .party-banner {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
