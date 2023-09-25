<script setup lang="ts">
import { useFilmsStore } from '@/store/index'
import FilmsItem from '@/components/FilmsItem.vue'
import PaginationNew from '@/components/PaginationNew.vue'
import { onMounted } from 'vue';

const filmsStore = useFilmsStore()

onMounted(() => {
  filmsStore.fetchFilms()
})
</script>

<template>
  <div v-if="filmsStore.loading==false">
    <div class="films">
    <films-item
      v-for="film in filmsStore.films"
      :film="film"
    />
    </div>
    <pagination-new
      @changePage="filmsStore.fetchFilms"
      :totalPages="filmsStore.totalPages"
    />
  </div>
  <div v-else>Loading...</div>
  
</template>

<style lang="scss">
.films {
  display: flex;
  flex-wrap: wrap;
}
</style>
