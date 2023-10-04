<script setup lang="ts">
import { useRoute} from "vue-router";
import { onMounted, ref} from "vue";
import {useFilmsStore} from "@/store/films";
import {useUsersStore} from "@/store/users";
import {Film} from "@/types/Film";
import Loading from "@/components/UI/Loading.vue";
import RatingStars from "@/components/UI/RatingStars.vue";
import router from "@/router";

const filmsStore = useFilmsStore()
const usersStore = useUsersStore()
const route = useRoute()
const filmId = ref(+(route.params.id))
const film = ref<Film>()

onMounted(async() => {
  film.value = await filmsStore.fetchFilmByID(filmId.value)
})

const saveImg = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABkUlEQVR4nO2aMUvDUBSFq7tdHHRx00U3nfQndHd1dBX8F7o5ujq6OgqCqJNObd45vTcVwUEXBzsW1EhqUkpp9T2aBIr3gwchvHcuN+9LMiS1mjHjCHClZFLqAG5Kb6T0JvgzKmtkVvMHWCOeqO1IIKaWJ2pqBWJqeaKmViCmlidqagVianmiplYgppYnamoFYmp5oqZWIKaWJ2pqBWJqeaKmViCmlidqagVianmiplYg/1Itca4hpOsP5xpF50+FT6GOc2tCXoz5yHkZO7cxbX4h/FZIVesKHCvZS+cI8N4GDtORHmdre/05qvXQ/EIZVyhJkjkB9oR8zRr4EvLssdlcyucAWFTgRICPLONNyYMkSeb/yi+F0UIdckuAu6GP/fcxsD1pfQxsKnCbzxfyISZ3JuWXRl7oKYqWlTwV4DM79yLk/ugVHke6g3G7vSvk82AHgfO41VqpvBEBurnzQh6RXAjNSteka4fuqW7ljeRPIY2i9Wkz4yhaTXdEK/6F4zrkvRCCZO+dtEbR2UatYr4BNPUnHFTG6XcAAAAASUVORK5CYII=')
const unsaveImg = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABD0lEQVR4nO2asW0CQRREzw4dOHHgBkicOqMDGqAFF+AKaIEWCGnBAQlEEAGa2b8rAgKIyZCQxVorRIgwMh9z0jzpS5v8Wc3dy+6qStQcA0aRzK4DDN2LuJfgYVTkt+iNUGr5ILUotXyQWpRaPkgtSi0fpBallg9Si1LLB6lFqeWD1KLU8kFqUWr5ILUotXyQWpRaPkgtSi0fLnmyBmwC8FmmnGv3VdeAvZG9xXT6etwD8BKBrgHf9SgCjBPQPLWfgPfyQ8A9F1kb+ZFzfjyXkXN+SCG0jVzeU5FdUSbG+Hxp1moyeTKyY8D2v4t8mdnbXzPTfN4woH/TIgYMjJylEFrXzk4htEp2uePa2aK6MT9ZEolJX+vodgAAAABJRU5ErkJggg==')
const arrowLeftImg = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVR4nO3ZwQkCMRSE4deEov1X4klW1osub8gQsBQlsBdtwHlhvgoy/HtI2Agzk9d7PzbgTuASxUc8CbyZuURFJA/MfOwj8Nq2U1TjESpcQoVLqHAJFS6hwiVU0BdAEXQJEZyhxNCAdYwYz9TxXI2q2ixD+PNpZeY5qqLHiKLLiKLLiKLLiHIZVS6jymVUuYyqqcr079/Tt6hsH7M24Prvs5jN6gOVTHOSyaXc0AAAAABJRU5ErkJggg==')
const arrowRightImg = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAApElEQVR4nO3aQQrCMBSE4XcJS73/TdwI1ZWWN2R44FEqAVfuhUmc7wbD30VDEmFmP0Hg0oB7VS0xMmZuBI4GPIceQ/LEzEcfw0xk5jlGRY8RRZcRRZcRRZcR5TKqXEaVy6hyGVVTlamqpR+XP2NuMaophvDr03rt+xqj8QgVLqHCJVS4hAqXUOESKugfQBF0CRGcoUTXj6VTXE834DrFgwGzP/EGj6BzkAKYaD4AAAAASUVORK5CYII=')
</script>

<template>
  <div v-if="film" class="container">
<!--    <div class="arrows">-->
<!--      <img :src="arrowLeftImg" @click="router.push(`/film/${filmId- 1}`)">-->
<!--      <img :src="arrowRightImg" @click="router.push(`/film/${filmId + 1}`)">-->
<!--    </div>-->
    <div class="film">
      <img class="bg-img" :src="film.background_image" alt="film bg image">
      <img class="film-cover" :src="film.large_cover_image" alt="film cover image"/>
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
    <div class="review">
      <rating-stars
        v-if="usersStore.isLoggedIn"
        :film = film
      />
    </div>
  </div>
  <loading v-else/>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 70px auto 0;
  grid-gap: 30px;
  padding-bottom: 100px;
}
.film {
}
.bg-img {
  width: 100%;
  height: 600px;
  border-radius: 6px;
  object-fit: cover;
  filter: brightness(40%);
}
.film-cover {
  position: absolute;
  height: 450px;
  top: 50px;
  left: -50px;
  border-radius: 6px;
}
.film-info {
  width: 600px;
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
}
.star {
  position: absolute;
  top: 50px;
  right: 40px;
  width: 30px;
}
.review {
  width: 1000px;
  height: 600px;
  background-color: #111111;
}
</style>