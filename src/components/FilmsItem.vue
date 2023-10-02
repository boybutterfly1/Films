<script setup lang="ts">
import { Film } from '@/types/Film'
import { ref } from 'vue'
import { useFilmsStore } from '@/store/films'
import { useUsersStore } from "@/store/users";
import router from "@/router";

const props = defineProps<{
  film: Film,
}>()

const filmsStore = useFilmsStore()
const usersStore = useUsersStore()
const defaultImg = ref('https://imageup.ru/img45/4543435/sticker.jpg')
const saveImg = ref('https://img.icons8.com/?size=512&id=25157&format=png')
const unsaveImg = ref('https://img.icons8.com/?size=512&id=26083&format=png')

</script>

<template>
  <div
    v-if="filmsStore.loading === false"
    class="film_card"
    @click="router.push(`film/${film.id}`)"
  >
    <div class="cover">
      <img class="cover" :src="props.film.medium_cover_image" alt="film cover image"/>
    </div>
    <div class="film_info">
      <h3>{{ film.title }}</h3>
      <span>Genres: {{ film.genres.join(', ') }}</span>
      <span>Year: {{ film.year }}</span>
      <span>Rating: {{ film.rating }}</span>
    </div>
    <div v-if="usersStore.isLoggedIn">
      <img v-if="filmsStore.savedFilms.filter(f => f.id === film.id).length !== 0" class="star" :src="unsaveImg" alt="unsave" @click="filmsStore.deleteFromSaved(film.id)" @click.stop/>
      <img v-if="filmsStore.savedFilms.filter(f => f.id === film.id).length === 0" class="star" :src="saveImg" alt="save" @click="filmsStore.makeSaved(film.id)" @click.stop/>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style lang="scss" scoped>
.film_card {
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 200px;
  box-sizing: border-box;
  position: relative;
  background-color: #111111;
  transition: transform 0.3s ease;
  cursor: pointer;
}
.film_card:hover {
  transform: scale(1.03);
}
.cover {
  width: auto;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
.film_info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
}
.film_info h3 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.film_info span {
  font-size: 14px;
  margin-bottom: 10px;
}
.star {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 25px;
  height: auto;
}
</style>
