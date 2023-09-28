<script setup lang="ts">
import { useFilmsStore } from '@/store'
import FilmsItem from '@/components/FilmsItem.vue'
import Pagination from '@/components/Pagination.vue'
import {computed, onMounted, ref, watch} from 'vue';

const filmsStore = useFilmsStore()
const showSaved = ref(false)
const length = computed(() => filmsStore.savedFilms.length)

const catalog = computed(() => {
  if (showSaved.value) {
    return filmsStore.savedFilms
  } else {
    return filmsStore.films
  }
})
onMounted(() => {
  filmsStore.getTotalPages()

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
  <div
    @click="showSaved = false"
    :class="{ active: !showSaved }"
  >
    All
  </div>
  <div
    @click="showSaved = true"
    :class="{ active: showSaved }"
  >
    Saved
  </div>
  <div v-if="showSaved && filmsStore.savedFilms.length > 0">
    <button @click="filmsStore.savedFilms = []">Delete all</button>
  </div>
  <div v-if="filmsStore.loading==false">
    <div class="container">
    <films-item
      v-for="film in catalog"
      :film="film"
    />
    </div>
    <pagination
      v-if="!showSaved"
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
div.active {
  text-decoration: underline;
}
</style>
