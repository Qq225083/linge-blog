<template>
  <div id="app-root">
    <ParticleBackground />
    <NavBar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <footer class="footer">
      <p>
        © 2024 <span>林哥の次元</span> — Built with
        <i class="fa-solid fa-heart"></i> 和 二次元魂
        <i class="fa-solid fa-star"></i>
      </p>
    </footer>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import ParticleBackground from './components/ParticleBackground.vue'
</script>
