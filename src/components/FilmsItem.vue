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
const saveImg = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABkUlEQVR4nO2aMUvDUBSFq7tdHHRx00U3nfQndHd1dBX8F7o5ujq6OgqCqJNObd45vTcVwUEXBzsW1EhqUkpp9T2aBIr3gwchvHcuN+9LMiS1mjHjCHClZFLqAG5Kb6T0JvgzKmtkVvMHWCOeqO1IIKaWJ2pqBWJqeaKmViCmlidqagVianmiplYgppYnamoFYmp5oqZWIKaWJ2pqBWJqeaKmViCmlidqagVianmiplYg/1Itca4hpOsP5xpF50+FT6GOc2tCXoz5yHkZO7cxbX4h/FZIVesKHCvZS+cI8N4GDtORHmdre/05qvXQ/EIZVyhJkjkB9oR8zRr4EvLssdlcyucAWFTgRICPLONNyYMkSeb/yi+F0UIdckuAu6GP/fcxsD1pfQxsKnCbzxfyISZ3JuWXRl7oKYqWlTwV4DM79yLk/ugVHke6g3G7vSvk82AHgfO41VqpvBEBurnzQh6RXAjNSteka4fuqW7ljeRPIY2i9Wkz4yhaTXdEK/6F4zrkvRCCZO+dtEbR2UatYr4BNPUnHFTG6XcAAAAASUVORK5CYII=')
const unsaveImg = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABD0lEQVR4nO2asW0CQRREzw4dOHHgBkicOqMDGqAFF+AKaIEWCGnBAQlEEAGa2b8rAgKIyZCQxVorRIgwMh9z0jzpS5v8Wc3dy+6qStQcA0aRzK4DDN2LuJfgYVTkt+iNUGr5ILUotXyQWpRaPkgtSi0fpBallg9Si1LLB6lFqeWD1KLU8kFqUWr5ILUotXyQWpRaPkgtSi0fLnmyBmwC8FmmnGv3VdeAvZG9xXT6etwD8BKBrgHf9SgCjBPQPLWfgPfyQ8A9F1kb+ZFzfjyXkXN+SCG0jVzeU5FdUSbG+Hxp1moyeTKyY8D2v4t8mdnbXzPTfN4woH/TIgYMjJylEFrXzk4htEp2uePa2aK6MT9ZEolJX+vodgAAAABJRU5ErkJggg==')

</script>

<template>
  <div
    v-if="filmsStore.loading === false"
    class="film_card"
    @click="router.push(`/film/${film.id}`)"
  >
    <div class="cover">
      <img class="cover" :src="props.film.medium_cover_image" alt="film cover image"/>
    </div>
    <div class="film_info">
      <h3>{{ film.title }}</h3>
      <span v-if="film.genres">Genres: {{ film.genres.join(', ') }}</span>
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
  width: 130px;
  height: 200px;
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
