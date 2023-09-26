<script setup lang="ts">
import { Film } from '@/types/Film'
import { ref } from 'vue'
import { useFilmsStore } from '@/store/index'

const props = defineProps<{ 
  film: Film,
}>()
const filmsStore = useFilmsStore()
const loadingImg = ref('https://imageup.ru/img45/4543435/sticker.jpg')
</script>

<template>
  <div class="film_card">
    <img v-if="filmsStore.images == true" :src="props.film.medium_cover_image" alt="film cover image" />
    <img v-else :src="loadingImg" alt="film cover image"/>
    <div class="film_info">
      <h3>{{ film.title }}</h3>
      <span>Genres: {{ film.genres.join(', ') }}</span>
      <span>Year: {{ film.year }}</span>
      <span>Rating: {{ film.rating }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.film_card {
  display: flex;
  flex-direction: row;
}
.film_card img {
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
</style>
