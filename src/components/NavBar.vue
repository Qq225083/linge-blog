<template>
  <nav class="navbar" :class="{ scrolled }" ref="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="navbar-brand">
        <i class="fa-solid fa-star"></i> 林哥の次元
      </router-link>

      <button
        class="navbar-toggle"
        :class="{ active: menuOpen }"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul class="navbar-links" :class="{ open: menuOpen }" @click="closeMenu">
        <li>
          <router-link to="/"><i class="fa-solid fa-house"></i> 首页</router-link>
        </li>
        <li>
          <router-link to="/about"><i class="fa-solid fa-circle-user"></i> 关于我</router-link>
        </li>
        <li>
          <router-link to="/blog"><i class="fa-solid fa-pen"></i> 博客</router-link>
        </li>
        <li>
          <router-link to="/anime"><i class="fa-solid fa-tv"></i> 追番</router-link>
        </li>
        <li>
          <router-link to="/games"><i class="fa-solid fa-gamepad"></i> 游戏</router-link>
        </li>
        <li>
          <router-link to="/friends"><i class="fa-solid fa-users"></i> 友链</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const menuOpen = ref(false)
const navbar = ref(null)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

function closeMenu() {
  menuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
