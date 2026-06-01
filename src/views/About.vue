<template>
  <div class="page about-page">
    <h1 class="page-title">关于我</h1>
    <p class="page-subtitle">
      <i class="fa-solid fa-quote-left"></i>
      在代码与番剧之间寻找真理
      <i class="fa-solid fa-quote-right"></i>
    </p>

    <!-- Character Card -->
    <section class="char-section">
      <div class="char-card glass-card">
        <div class="char-avatar-area">
          <img
            :src="avatarSrc"
            alt="林哥 Avatar"
            class="avatar char-avatar"
            @error="e => e.target.src = 'https://via.placeholder.com/200x200/1a0a2e/ff2d78?text=林哥'"
          />
          <div class="char-level">
            <span class="level-badge">Lv.99</span>
            <div class="char-stars">★★★★★</div>
          </div>
        </div>
        <div class="char-stats-panel">
          <h2 class="char-name">
            <i class="fa-solid fa-crown" style="color:var(--neon-yellow)"></i> 林哥
          </h2>
          <p class="char-class">全栈工程师 / 二次元住民</p>
          <div class="char-table">
            <div class="char-row">
              <span class="char-label"><i class="fa-solid fa-calendar"></i> 入坑年份</span>
              <span class="char-value">2012年 — 距今 {{ currentYear - 2012 }} 年</span>
            </div>
            <div class="char-row">
              <span class="char-label"><i class="fa-solid fa-heart"></i> 本命番剧</span>
              <span class="char-value">
                <span class="anime-tag-mini">《进击的巨人》</span>
                <span class="anime-tag-mini">《EVA》</span>
                <span class="anime-tag-mini">《孤独摇滚》</span>
              </span>
            </div>
            <div class="char-row">
              <span class="char-label"><i class="fa-solid fa-star"></i> 战力值</span>
              <span class="char-value star-rating">
                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
              </span>
            </div>
            <div class="char-row">
              <span class="char-label"><i class="fa-solid fa-code"></i> 技能</span>
              <span class="char-value">Vue · React · Node.js · Python · 日語N2</span>
            </div>
            <div class="char-row">
              <span class="char-label"><i class="fa-solid fa-location-dot"></i> 坐标</span>
              <span class="char-value">成都 · 錦江区</span>
            </div>
            <div class="char-row">
              <span class="char-label"><i class="fa-solid fa-comment"></i> 属性标签</span>
              <span class="char-value">
                <span class="tag pink">社恐</span>
                <span class="tag purple">熬夜冠军</span>
                <span class="tag green">肝帝</span>
                <span class="tag">DD党</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="timeline-section">
      <h2 class="section-title">
        <i class="fa-solid fa-timeline"></i> 追番时间轴
      </h2>
      <p class="section-desc">从入坑到现在的二次元之旅</p>
      <div class="timeline glass-card">
        <div class="timeline-item" v-for="(item, i) in timeline" :key="item.year"
             :style="{ '--tl-delay': (i * 0.1) + 's' }">
          <div class="timeline-marker">
            <div class="tl-dot"></div>
            <div class="tl-line"></div>
          </div>
          <div class="timeline-content">
            <div class="tl-header">
              <span class="tl-year">{{ item.year }}</span>
              <span class="tl-tag">{{ item.season }}</span>
            </div>
            <h4 class="tl-title">{{ item.title }}</h4>
            <p class="tl-desc">{{ item.desc }}</p>
            <div class="tl-emoji">{{ item.emoji }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Equipment -->
    <section class="equipment-section">
      <h2 class="section-title">
        <i class="fa-solid fa-shield-halved"></i> 装备展示
      </h2>
      <p class="section-desc">林哥的战斗装备一览</p>
      <div class="card-grid-3">
        <div class="equip-card glass-card" v-for="item in equipment" :key="item.name"
             :style="{ '--eq-delay': (item.id * 0.08) + 's' }">
          <div class="equip-img">
            <img :src="item.img" :alt="item.name" loading="lazy" />
            <span class="equip-rarity" :class="item.rarity">{{ item.rarityText }}</span>
          </div>
          <div class="equip-info">
            <h4 class="equip-name">{{ item.name }}</h4>
            <p class="equip-comment">"{{ item.comment }}"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="gallery-section">
      <h2 class="section-title">
        <i class="fa-solid fa-images"></i> 林哥美图鉴赏
      </h2>
      <p class="section-desc">捕捉林哥的每一个帅气瞬间 ✨</p>
      <div class="gallery-grid">
        <div
          v-for="(photo, i) in galleryPhotos"
          :key="i"
          class="gallery-item glass-card"
          :style="{ '--gallery-delay': (i * 0.1) + 's' }"
          @click="openLightbox(i)"
        >
          <div class="gallery-img-wrapper">
            <img :src="photo.src" :alt="photo.alt" loading="lazy" />
            <div class="gallery-overlay">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
              <span>{{ photo.alt }}</span>
            </div>
          </div>
          <p class="gallery-caption">{{ photo.caption }}</p>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        class="lightbox-backdrop"
        @click="closeLightbox"
      >
        <button class="lightbox-close" @click="closeLightbox">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <button class="lightbox-prev" @click.stop="prevPhoto">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <div class="lightbox-content" @click.stop>
          <img :src="galleryPhotos[currentPhoto].src" :alt="galleryPhotos[currentPhoto].alt" />
        </div>
        <button class="lightbox-next" @click.stop="nextPhoto">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
        <div class="lightbox-counter">{{ currentPhoto + 1 }} / {{ galleryPhotos.length }}</div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentYear = new Date().getFullYear()
const avatarSrc = import.meta.env.BASE_URL + 'images/linge/IMG_0528.PNG'

const galleryPhotos = [
  { src: import.meta.env.BASE_URL + 'images/linge/IMG_0528.PNG', alt: '林哥帅照', caption: '📸 林哥の日常' },
  { src: import.meta.env.BASE_URL + 'images/linge/39be66973dfc16917447708de1071b58.jpg', alt: '林哥', caption: '✨ 帅气侧颜' },
  { src: import.meta.env.BASE_URL + 'images/linge/bd47507fc4db3275ab090afe875f77b8.jpg', alt: '林哥', caption: '🎮 游戏中的林哥' },
  { src: import.meta.env.BASE_URL + 'images/linge/e6c264c89cc78e8f51714a7c2db29935.jpg', alt: '林哥', caption: '🌟 林哥の名场面' },
  { src: import.meta.env.BASE_URL + 'images/linge/f2b5c4ad34d3e9633f4950bdac9a97ca.jpg', alt: '林哥', caption: '💫 这个角度太绝了' },
]

// Lightbox
const lightboxOpen = ref(false)
const currentPhoto = ref(0)

function openLightbox(index) {
  currentPhoto.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function prevPhoto() {
  currentPhoto.value = (currentPhoto.value - 1 + galleryPhotos.length) % galleryPhotos.length
}

function nextPhoto() {
  currentPhoto.value = (currentPhoto.value + 1) % galleryPhotos.length
}

function onKeydown(e) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevPhoto()
  if (e.key === 'ArrowRight') nextPhoto()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

const timeline = [
  { year: '2012', season: '入坑季', title: '《刀剑神域》', desc: '第一次感受虚拟与现实交错的世界观，从此打开新世界的大门', emoji: '🗡️' },
  { year: '2013', season: '霸权季', title: '《进击的巨人》', desc: '震撼的立体机动装置战斗，献出心脏！', emoji: '⚔️' },
  { year: '2014', season: '泪腺崩坏', title: '《四月是你的谎言》', desc: '春天就要来了，让我与你相遇的春天...', emoji: '🎻' },
  { year: '2016', season: '轮回季', title: '《Re:从零开始的异世界生活》', desc: '486的痛苦轮回，每一次都痛彻心扉', emoji: '🔄' },
  { year: '2018', season: '青春季', title: '《青春猪头少年不会梦到兔女郎学姐》', desc: '量子力学与青春期奇妙碰撞，咲太师傅yyds', emoji: '🐰' },
  { year: '2020', season: '热血季', title: '《咒术回战》', desc: '战斗分镜教科书级别，五条悟天下第一', emoji: '👊' },
  { year: '2022', season: '共鸣季', title: '《孤独摇滚！》', desc: '社恐吉他手的成长，波奇酱就是世界上的另一个我', emoji: '🎸' },
  { year: '2024', season: '治愈季', title: '《葬送的芙莉莲》', desc: '时间与记忆的温柔叙事，每一帧都是壁纸级', emoji: '🧝' },
]

const equipment = [
  { id: 1, name: 'Keychron Q1 Pro', img: 'https://via.placeholder.com/300x200/1a1a3e/00e5ff?text=⌨️+Keychron', comment: '紫色轴体+二次元键帽，打字爽到飞起', rarity: 'sr', rarityText: 'SR' },
  { id: 2, name: 'Sony WH-1000XM5', img: 'https://via.placeholder.com/300x200/1a1a3e/b347ea?text=🎧+Sony', comment: '降噪一开，世界只有我和ACG', rarity: 'ssr', rarityText: 'SSR' },
  { id: 3, name: 'Nintendo Switch OLED', img: 'https://via.placeholder.com/300x200/1a1a3e/ff2d78?text=🎮+Switch', comment: '塞尔达启动器，懂的都懂', rarity: 'ssr', rarityText: 'SSR' },
  { id: 4, name: 'DIY 光污染主机', img: 'https://via.placeholder.com/300x200/1a1a3e/ffd700?text=🖥️+PC', comment: 'RTX 4080+i9，RGB拉满战斗力+50%', rarity: 'ssr', rarityText: 'SSR' },
  { id: 5, name: '手办收藏架', img: 'https://via.placeholder.com/300x200/1a1a3e/ff2d78?text=🎌+手办', comment: 'Saber·初音·蕾姆·约20体，持续增加中', rarity: 'ur', rarityText: 'UR' },
  { id: 6, name: 'Logitech G Pro X', img: 'https://via.placeholder.com/300x200/1a1a3e/00e5ff?text=🖱️+Logitech', comment: '无线轻量，FPS玩家的第三只手', rarity: 'sr', rarityText: 'SR' },
]
</script>

<style scoped>
/* Character Card */
.char-section {
  margin-bottom: 48px;
}

.char-card {
  display: flex;
  gap: 32px;
  padding: 36px;
  align-items: flex-start;
}

.char-avatar-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.char-avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 3px solid var(--neon-pink);
  box-shadow: 0 0 30px rgba(255, 45, 120, 0.35);
  transition: all var(--transition);
}

.char-avatar:hover {
  box-shadow: 0 0 50px rgba(255, 45, 120, 0.6);
  transform: scale(1.05);
}

.level-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--neon-pink), var(--neon-purple));
  color: #fff;
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 2px;
}

.char-stars {
  color: var(--neon-yellow);
  font-size: 0.85rem;
  letter-spacing: 2px;
}

.char-stats-panel {
  flex: 1;
}

.char-name {
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.char-class {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 18px;
  letter-spacing: 1px;
}

.char-table {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.char-row {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.025);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  gap: 16px;
}

.char-label {
  font-size: 0.82rem;
  color: var(--text-muted);
  min-width: 100px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.char-label i {
  font-size: 0.75rem;
  color: var(--neon-cyan);
}

.char-value {
  font-weight: 600;
  font-size: 0.92rem;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.anime-tag-mini {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  background: rgba(0, 229, 255, 0.1);
  color: var(--neon-cyan);
  border: 1px solid rgba(0, 229, 255, 0.15);
}

.star-rating {
  color: var(--neon-yellow);
  font-size: 0.9rem !important;
}

/* Timeline */
.timeline-section {
  margin-bottom: 48px;
}

.timeline {
  position: relative;
  padding: 32px 0 32px 40px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 17px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, var(--neon-pink), var(--neon-cyan), var(--neon-purple));
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  padding-bottom: 32px;
  animation: tl-enter 0.5s ease-out both;
  animation-delay: var(--tl-delay, 0s);
}

.timeline-item:last-child {
  padding-bottom: 0;
}

@keyframes tl-enter {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.timeline-marker {
  position: absolute;
  left: -40px;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.tl-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--neon-pink);
  box-shadow: 0 0 14px rgba(255, 45, 120, 0.6);
  border: 3px solid var(--bg-deep);
  flex-shrink: 0;
  margin-top: 4px;
}

.tl-line {
  width: 2px;
  flex: 1;
  min-height: 20px;
  background: rgba(255,255,255,0.06);
}

.timeline-item:last-child .tl-line {
  display: none;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius);
  padding: 18px 20px;
  position: relative;
  transition: all var(--transition);
}

.timeline-content:hover {
  border-color: var(--border-glow);
  background: rgba(255, 45, 120, 0.04);
  box-shadow: 0 0 20px rgba(255, 45, 120, 0.08);
}

.tl-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.tl-year {
  font-weight: 900;
  color: var(--neon-pink);
  font-size: 0.95rem;
}

.tl-tag {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 8px;
  background: rgba(0, 229, 255, 0.1);
  color: var(--neon-cyan);
}

.tl-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.tl-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.tl-emoji {
  position: absolute;
  right: 18px;
  top: 18px;
  font-size: 1.6rem;
  opacity: 0.4;
  transition: opacity var(--transition);
}

.timeline-content:hover .tl-emoji {
  opacity: 1;
}

/* Equipment */
.equip-card {
  padding: 0;
  overflow: hidden;
  animation: eq-enter 0.5s ease-out both;
  animation-delay: var(--eq-delay, 0s);
}

@keyframes eq-enter {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.equip-img {
  height: 160px;
  overflow: hidden;
  position: relative;
}

.equip-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.equip-card:hover .equip-img img {
  transform: scale(1.1);
}

.equip-rarity {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 10px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 1px;
}

.equip-rarity.sr { background: rgba(179,71,234,0.25); color: var(--neon-purple); border: 1px solid rgba(179,71,234,0.3); }
.equip-rarity.ssr { background: rgba(255,215,0,0.25); color: var(--neon-yellow); border: 1px solid rgba(255,215,0,0.3); }
.equip-rarity.ur { background: linear-gradient(135deg, rgba(255,45,120,0.3), rgba(0,229,255,0.3)); color: #fff; border: 1px solid rgba(255,45,120,0.4); }

.equip-info {
  padding: 16px 18px 20px;
}

.equip-name {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.equip-comment {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-style: italic;
}

/* Gallery */
.gallery-section {
  margin-top: 48px;
  margin-bottom: 24px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.gallery-item {
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  animation: gallery-enter 0.5s ease-out both;
  animation-delay: var(--gallery-delay, 0s);
}

@keyframes gallery-enter {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.gallery-img-wrapper {
  height: 220px;
  overflow: hidden;
  position: relative;
}

.gallery-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover .gallery-img-wrapper img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity var(--transition);
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-overlay i {
  font-size: 2rem;
  color: var(--neon-pink);
}

.gallery-overlay span {
  font-size: 0.85rem;
  color: #fff;
  font-weight: 600;
}

.gallery-caption {
  padding: 10px 14px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-align: center;
  border-top: 1px solid var(--glass-border);
}

/* Lightbox */
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
  z-index: 1;
}

.lightbox-close:hover {
  background: var(--neon-pink);
  border-color: var(--neon-pink);
}

.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
  z-index: 1;
}

.lightbox-prev { left: 24px; }
.lightbox-next { right: 24px; }

.lightbox-prev:hover,
.lightbox-next:hover {
  background: var(--neon-pink);
  border-color: var(--neon-pink);
}

.lightbox-content {
  max-width: 90vw;
  max-height: 85vh;
}

.lightbox-content img {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: var(--radius);
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.5);
}

.lightbox-counter {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 16px;
  border-radius: 20px;
  background: rgba(0,0,0,0.6);
  color: var(--text-secondary);
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .char-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .char-row {
    flex-direction: column;
    gap: 4px;
    text-align: center;
  }

  .char-label {
    min-width: auto;
  }

  .char-value {
    justify-content: center;
  }

  .timeline {
    padding-left: 30px;
  }

  .tl-emoji {
    display: none;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .gallery-img-wrapper {
    height: 160px;
  }

  .lightbox-prev { left: 8px; }
  .lightbox-next { right: 8px; }
  .lightbox-prev,
  .lightbox-next {
    width: 38px;
    height: 38px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
