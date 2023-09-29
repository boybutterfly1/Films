<script setup lang="ts">
import { useFilmsStore } from "@/store/films";
import {computed, onMounted, ref, watch} from "vue";
import Header from "@/components/Header.vue";

const filmsStore = useFilmsStore()
const length = computed(() => filmsStore.savedFilms.length)

onMounted(async () => {
  await filmsStore.getTotalPages()

  const filmsInLocalStorage = ref(localStorage.getItem('savedFilms'))
  if (JSON.parse(String(filmsInLocalStorage.value))) {
    filmsStore.savedFilms = (JSON.parse(String(filmsInLocalStorage.value)))
  }
})

watch(length, () => {
  localStorage.setItem('savedFilms', JSON.stringify(filmsStore.savedFilms))
  console.log('changed')
})
</script>

<template>
  <div class="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.app {
  width: 100vw;
  min-height: 100vh;
  font-family: 'Lato', sans-serif;
  background-color: #f3f2f0;
}
</style>
