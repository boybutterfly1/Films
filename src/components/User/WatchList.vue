<script setup lang="ts">
import Loading from "@/components/UI/Loading.vue";
import FilmsItem from "@/components/FilmsItem.vue";
import {useFilmsStore} from "@/store/films";
import SeenRecently from "@/components/UI/SeenRecently.vue";

const filmsStore = useFilmsStore()
</script>

<template>
  <div class="delete-btn">
    <button
        class="delete"
        v-if="filmsStore.savedFilms.length > 0"
        @click="filmsStore.savedFilms = []"
    >
      Clear Watch List
    </button>
  </div>
  <div v-if="filmsStore.loading===false">
    <div class="container">
      <films-item
          v-for="film in filmsStore.savedFilms"
          :film="film"
          :key="film.id"
      />
    </div>
  </div>
  <loading v-else/>
  <seen-recently/>
</template>

<style lang="sass" scoped>
.container
  position: relative
  display: flex
  flex-wrap: wrap
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
  grid-gap: 30px
  justify-content: center
  padding: 50px 100px 70px
.delete-btn
  padding: 50px 100px 0
.delete
  padding: 10px 15px
  background-color: #111111
  display: flex
  justify-content: center
  border-radius: 6px
  border: 1px solid #111111
  transition: transform 0.3s
  color: #dad7d7
  font-family: 'Lato', sans-serif
  font-size: 15px
  cursor: pointer
  &:hover
    background-color: #810505
</style>
