<script setup lang="ts">
import Loading from "@/components/UI/Loading.vue";
import FilmsItem from "@/components/FilmsItem.vue";
import {useFilmsStore} from "@/store/films";

const filmsStore = useFilmsStore()
</script>

<template>
  <div v-if="filmsStore.loading===false">
    <div class="container">
      <films-item
          v-for="film in filmsStore.savedFilms"
          :film="film"
          :key="film.id"
      />
    </div>
  </div>
  <loading
      v-else
  />
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 30px;
  justify-content: center
}
</style>
