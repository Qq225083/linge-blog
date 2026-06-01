<template>
  <div class="page home-page">
    <!-- Hero Section -->
    <div class="hero" ref="heroSection">
      <!-- Glitch decoration line -->
      <div class="hero-decoration">
        <span class="deco-line"></span>
        <span class="deco-diamond"><i class="fa-solid fa-gem"></i></span>
        <span class="deco-line"></span>
      </div>

      <!-- Main Title with typewriter -->
      <div class="hero-title-wrapper">
        <h1 class="hero-title">
          <span class="title-char" v-for="(char, i) in titleChars" :key="i"
            :style="{ animationDelay: (0.08 * i) + 's' }"
          >{{ char }}</span>
        </h1>
      </div>

      <!-- Subtitle -->
      <p class="hero-subtitle typewriter">{{ heroSign }}</p>
      <p class="hero-tagline">
        <span class="glitch-text" data-text="在代码与番剧之间寻找真理">
          在代码与番剧之间寻找真理
        </span>
      </p>
      <p class="hero-concentration">
        <i class="fa-solid fa-flask"></i> 二次元浓度：<span class="concentration-value">99.9%</span>
        <span class="concentration-bar">
          <span class="concentration-fill"></span>
        </span>
      </p>
    </div>

    <!-- Menu Cards -->
    <div class="menu-cards">
      <router-link to="/blog" class="menu-card glass-card" style="--card-delay: 0.1s">
        <div class="menu-card-glow"></div>
        <div class="menu-card-icon-wrapper">
          <i class="fa-solid fa-pen-to-square menu-card-icon"></i>
        </div>
        <h3 class="menu-card-title">博客</h3>
        <p class="menu-card-desc">番剧评测 · 游戏攻略 · 技术笔记</p>
        <div class="menu-card-footer">
          <span class="menu-card-arrow">
            <i class="fa-solid fa-arrow-right"></i> 进入
          </span>
        </div>
      </router-link>

      <router-link to="/anime" class="menu-card glass-card" style="--card-delay: 0.2s">
        <div class="menu-card-glow"></div>
        <div class="menu-card-icon-wrapper">
          <i class="fa-solid fa-tv menu-card-icon"></i>
        </div>
        <h3 class="menu-card-title">追番看板</h3>
        <p class="menu-card-desc">追番进度 · 年度总结 · 补番计划</p>
        <div class="menu-card-footer">
          <span class="menu-card-arrow">
            <i class="fa-solid fa-arrow-right"></i> 进入
          </span>
        </div>
      </router-link>

      <router-link to="/games" class="menu-card glass-card" style="--card-delay: 0.3s">
        <div class="menu-card-glow"></div>
        <div class="menu-card-icon-wrapper">
          <i class="fa-solid fa-gamepad menu-card-icon"></i>
        </div>
        <h3 class="menu-card-title">游戏库</h3>
        <p class="menu-card-desc">在玩 · 通关 · 弃坑 · 愿望单</p>
        <div class="menu-card-footer">
          <span class="menu-card-arrow">
            <i class="fa-solid fa-arrow-right"></i> 进入
          </span>
        </div>
      </router-link>

      <router-link to="/about" class="menu-card glass-card" style="--card-delay: 0.4s">
        <div class="menu-card-glow"></div>
        <div class="menu-card-icon-wrapper">
          <i class="fa-solid fa-circle-user menu-card-icon"></i>
        </div>
        <h3 class="menu-card-title">关于我</h3>
        <p class="menu-card-desc">角色属性 · 入坑历程 · 装备展示</p>
        <div class="menu-card-footer">
          <span class="menu-card-arrow">
            <i class="fa-solid fa-arrow-right"></i> 进入
          </span>
        </div>
      </router-link>
    </div>

    <!-- Enter World Button -->
    <div class="enter-world">
      <router-link to="/about" class="btn btn-lg btn-glow enter-btn">
        <i class="fa-solid fa-door-open"></i> 进入异世界
        <i class="fa-solid fa-door-open"></i>
      </router-link>
      <p class="enter-hint">点击穿越到林哥的二次元宇宙</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const heroSign = '在代码与番剧之间寻找真理 | 二次元浓度 99.9%'

const titleChars = ['林', '哥', 'の', '次', '元']
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 40px;
}

/* Hero Section */
.hero {
  text-align: center;
  margin-bottom: 56px;
}

.hero-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}

.deco-line {
  display: block;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--neon-pink), transparent);
}

.deco-diamond {
  color: var(--neon-pink);
  font-size: 1.2rem;
  animation: float 2.5s ease-in-out infinite;
}

.hero-title-wrapper {
  margin-bottom: 16px;
}

.hero-title {
  display: flex;
  justify-content: center;
  gap: 6px;
  font-size: 5rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 8px;
}

.title-char {
  display: inline-block;
  opacity: 0;
  animation: char-appear 0.6s ease-out forwards;
  background: linear-gradient(135deg, var(--neon-pink) 20%, var(--neon-cyan) 50%, var(--neon-purple) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(255, 45, 120, 0.5));
  transition: transform 0.3s;
}

.title-char:hover {
  transform: translateY(-8px) scale(1.15);
  filter: drop-shadow(0 0 30px rgba(0, 229, 255, 0.8));
}

@keyframes char-appear {
  0% { opacity: 0; transform: translateY(-30px) scale(0.5); }
  60% { opacity: 1; transform: translateY(4px) scale(1.08); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.hero-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  letter-spacing: 3px;
  margin-bottom: 8px;
}

.hero-tagline {
  margin-bottom: 12px;
}

.glitch-text {
  font-size: 1.1rem;
  color: var(--text-secondary);
  position: relative;
  letter-spacing: 2px;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  color: var(--neon-cyan);
  animation: glitch-1 2s infinite linear alternate-reverse;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
}

.glitch-text::after {
  color: var(--neon-pink);
  animation: glitch-2 3s infinite linear alternate-reverse;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
}

@keyframes glitch-1 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 1px); }
  40% { transform: translate(2px, -1px); }
  60% { transform: translate(-1px, -1px); }
  80% { transform: translate(1px, 1px); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translate(0); }
  25% { transform: translate(1px, -1px); }
  50% { transform: translate(-1px, 1px); }
  75% { transform: translate(-2px, -1px); }
}

.hero-concentration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.hero-concentration i {
  color: var(--neon-yellow);
}

.concentration-value {
  font-weight: 900;
  background: linear-gradient(135deg, var(--neon-pink), var(--neon-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.2rem;
}

.concentration-bar {
  display: inline-block;
  width: 80px;
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 3px;
  overflow: hidden;
  vertical-align: middle;
}

.concentration-fill {
  display: block;
  width: 99.9%;
  height: 100%;
  background: linear-gradient(90deg, var(--neon-pink), var(--neon-cyan));
  border-radius: 3px;
}

/* Menu Cards */
.menu-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 960px;
  width: 100%;
  margin-bottom: 48px;
}

.menu-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 18px 22px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  animation: card-enter 0.6s ease-out both;
  animation-delay: var(--card-delay, 0s);
}

@keyframes card-enter {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.menu-card-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255,45,120,0.15), transparent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s ease;
}

.menu-card:hover .menu-card-glow {
  width: 300px;
  height: 300px;
}

.menu-card-icon-wrapper {
  margin-bottom: 14px;
  position: relative;
  z-index: 1;
}

.menu-card-icon {
  font-size: 2.8rem;
  color: var(--neon-cyan);
  transition: all var(--transition);
  filter: drop-shadow(0 0 8px rgba(0, 229, 255, 0.3));
}

.menu-card:hover .menu-card-icon {
  color: var(--neon-pink);
  transform: scale(1.2) rotate(-5deg);
  filter: drop-shadow(0 0 16px rgba(255, 45, 120, 0.6));
}

.menu-card-title {
  font-size: 1.2rem;
  font-weight: 900;
  margin-bottom: 6px;
  background: linear-gradient(135deg, #fff, var(--neon-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
}

.menu-card:hover .menu-card-title {
  background: linear-gradient(135deg, var(--neon-pink), var(--neon-cyan));
  -webkit-background-clip: text;
  background-clip: text;
}

.menu-card-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.menu-card-footer {
  position: relative;
  z-index: 1;
}

.menu-card-arrow {
  font-size: 0.82rem;
  color: var(--neon-pink);
  font-weight: 700;
  opacity: 0;
  transform: translateY(8px);
  transition: all var(--transition);
  display: flex;
  align-items: center;
  gap: 4px;
}

.menu-card:hover .menu-card-arrow {
  opacity: 1;
  transform: translateY(0);
}

/* Enter World Button */
.enter-world {
  text-align: center;
  animation: card-enter 0.6s ease-out 0.5s both;
}

.enter-btn {
  font-size: 1.1rem;
  padding: 16px 44px;
  gap: 12px;
  margin-bottom: 10px;
}

.enter-hint {
  font-size: 0.82rem;
  color: var(--text-muted);
  letter-spacing: 2px;
}

@media (max-width: 900px) {
  .menu-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2.6rem;
    gap: 2px;
  }

  .menu-cards {
    grid-template-columns: 1fr;
    max-width: 320px;
  }

  .hero-subtitle {
    font-size: 0.8rem;
    letter-spacing: 1px;
  }
}
</style>
