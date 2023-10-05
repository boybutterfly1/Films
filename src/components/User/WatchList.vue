<script setup lang="ts">
import Loading from "@/components/UI/Loading.vue";
import FilmsItem from "@/components/FilmsItem.vue";
import {useFilmsStore} from "@/store/films";
import SeenRecently from "@/components/UI/SeenRecently.vue";

const filmsStore = useFilmsStore()
</script>

<template>
  <button
      class="delete"
      v-if="filmsStore.savedFilms.length > 0"
      @click="filmsStore.savedFilms = []"
  >
    Clear Watch List
  </button>
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
  <seen-recently></seen-recently>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 30px;
  justify-content: center;
  padding: 50px 100px 70px;
}
</style>
