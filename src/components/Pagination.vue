<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useFilmsStore } from '@/store/index'

const filmsStore = useFilmsStore()
const visPages = ref<number[]>();

async function visPagesGen(){
  await filmsStore.fetchFilms(1)
  if (filmsStore.totalPages > 10) {
    visPages.value = Array.from({ length: 10}, (_, i) => i + 1)
  } else {
    visPages.value = Array.from({ length: filmsStore.totalPages}, (_, i) => i + 1)
  }
}

const changePage = (page: number) => {
  if (filmsStore.totalPages > 10) {
    if (page > 5 && visPages.value) {
      const newVisPages = []
      for (let i = page - 4; i <= page + 5; i++) {
        newVisPages.push(i)
      }
      visPages.value = newVisPages
    } else {
      visPages.value = Array.from({ length: 10}, (_, i) => i + 1)
    }
  }
  filmsStore.fetchFilms(page)
}

onMounted(() => {
  visPagesGen()
})
</script>

<template>
  <div>
    <button @click="changePage(1)">&lt;&lt;</button>
    <button
      v-for="page in visPages"
      :key="page"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
    <button @click="changePage(filmsStore.totalPages)">>></button>
  </div>
</template>

<style lang="scss">

</style>
