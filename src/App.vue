<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFilmsStore } from '@/store/index'

const filmsStore = useFilmsStore()

onMounted(() => {
  filmsStore.fetchFilms()
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
