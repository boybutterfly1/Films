<script setup lang="ts">
import { useFilmsStore } from '@/store/index'
import FilmsItem from '@/components/FilmsItem.vue'
import Pagination from '@/components/Pagination.vue'
import {computed, onMounted, ref} from 'vue';

const filmsStore = useFilmsStore()
const showSaved = ref(false)
const catalog = computed(() => {
  if (showSaved.value) {
    return filmsStore.films.filter((f) => f.saved === true)
  } else {
    return filmsStore.films
  }
})

    onMounted(() => {
  filmsStore.fetchFilms()
})
</script>

<template>
  <div
    @click="showSaved = !showSaved"
  >
    All
  </div>
  <div
    @click="showSaved = !showSaved"
  >
    Saved
  </div>
  <div v-if="filmsStore.loading==false">
    <div class="container">
    <films-item
      v-for="film in catalog"
      :film="film"
    />
    </div>
    <pagination
      @changePage="filmsStore.fetchFilms"
      :totalPages="filmsStore.totalPages"
    />
  </div>
  <div v-else>Loading...</div>
  
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  padding: 30px;
}
</style>
