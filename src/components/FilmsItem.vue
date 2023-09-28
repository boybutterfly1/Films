<script setup lang="ts">
import { Film } from '@/types/Film'
import { ref } from 'vue'
import { useFilmsStore } from '@/store'
import films from "../api/films";

const props = defineProps<{ 
  film: Film,
}>()
const filmsStore = useFilmsStore()
const defaultImg = ref('https://imageup.ru/img45/4543435/sticker.jpg')
const saveImg = ref('https://img.icons8.com/?size=512&id=25157&format=png')
const unsaveImg = ref('https://img.icons8.com/?size=512&id=26083&format=png')


</script>

<template>
  <div class="film_card">
    <img class="cover" v-if="filmsStore.images == true" :src="props.film.medium_cover_image" alt="film cover image" />
    <img class="cover" v-else :src="defaultImg" alt="film cover image"/>
    <div class="film_info">
      <h3>{{ film.title }}</h3>
      <span>Genres: {{ film.genres.join(', ') }}</span>
      <span>Year: {{ film.year }}</span>
      <span>Rating: {{ film.rating }}</span>
    </div>
    <img v-if="film.saved" class="star" :src="unsaveImg" alt="unsave" @click="filmsStore.deleteFromSaved(film.id)"/>
    <img v-if="!film.saved" class="star" :src="saveImg" alt="save" @click="filmsStore.makeSaved(film.id)"/>
  </div>
</template>

<style lang="scss">
.film_card {
  display: flex;
  flex-direction: row;
  width: 300px;
  box-sizing: border-box;
  position: relative;
  background-color: #f6f3ed;
}
.cover {
  width: 150px;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}
.film_info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
}
.film_card h3 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.film_card span {
  font-size: 14px;
  margin-bottom: 5px;
}
.star {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 25px;
  height: auto;
}
</style>
