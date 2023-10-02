<script setup lang="ts">
import { useRoute} from "vue-router";
import { onMounted, ref} from "vue";
import {useFilmsStore} from "@/store/films";
import {useUsersStore} from "@/store/users";
import {Film} from "@/types/Film";
import Loading from "@/components/UI/Loading.vue";

const filmsStore = useFilmsStore()
const usersStore = useUsersStore()
const route = useRoute()
const filmId = ref(+(route.params.id))
const film = ref<Film>()

onMounted(async() => {
  film.value = await filmsStore.fetchFilmByID(filmId.value)
  console.log(film.value)
})

const saveImg = ref('https://img.icons8.com/?size=512&id=25157&format=png')
const unsaveImg = ref('https://img.icons8.com/?size=512&id=26083&format=png')
</script>

<template>
  <div
      v-if="film"
      class="container"
  >
    <img class="bg-img" :src="film.background_image" alt="film bg image">
    <div class="film">
      <img class="film-cover"  :src="film.large_cover_image" alt="film cover image"/>
      <div class="film-info">
        <h3>{{ film.title }}</h3>
        <span>Genres: {{ film.genres.join(', ') }}</span>
        <span>Year: {{ film.year }}</span>
        <span>Rating: {{ film.rating }}</span>
        <span>{{film.description_full}}</span>
      </div>
      <div v-if="usersStore.isLoggedIn">
        <img v-if="filmsStore.savedFilms.filter(f => f.id === film.id).length !== 0" class="star" :src="unsaveImg" alt="unsave" @click="filmsStore.deleteFromSaved(film.id)"/>
        <img v-if="filmsStore.savedFilms.filter(f => f.id === film.id).length === 0" class="star" :src="saveImg" alt="save" @click="filmsStore.makeSaved(film.id)"/>
      </div>
    </div>
  </div>
  <loading
      v-else
  />
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  max-width: 1000px;
  margin: 70px auto auto;
}
.bg-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 6px;
  object-fit: cover;
  filter: brightness(50%);
}
.film {
  display: flex;
  top: 0;
  left: 0;
  z-index: 1;
}
.film-cover {
  position: absolute;
  width: 300px;
  top: 50px;
  left: -50px;
  border-radius: 6px;
}
.film-info {
  width: 650px;
  flex-direction: column;
  position: absolute;
  top: 50px;
  left: 270px;
  color: white;
  display: flex;
  align-items: flex-start;
  padding: 10px;
}
.film-info h3 {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 30px;
}
.film-info span {
  font-size: 16px;
  margin-bottom: 25px;
  font-weight: normal;
}
.star {
  position: absolute;
  top: 50px;
  left: 920px;
  width: 50px;
}
</style>