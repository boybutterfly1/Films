<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFilmsStore } from '@/store/index'
import apiFilms from '@/api/films'

const filmsStore = useFilmsStore()

onMounted(() => {
})
</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.app {
  font-family: Lato;
}
</style>
