<script setup lang="ts">
import RatingStars from "@/components/UI/RatingStars.vue";
import {useFilmsStore} from "@/store/films";
import {computed, onMounted, ref, watch} from "vue";
import router from "@/router";
import {Film} from "@/types/types";
import SeenRecently from "@/components/UI/SeenRecently.vue";

const trashImg = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADwElEQVR4nM1ZTahVVRTehYVCkQMNtKhBkaBFodmgcpBB0c8kdaCBJUUKOtBAi6LSBlmRQYGFgxRKKRStSUEW9TSLIp89k7O/76x97+PSA3+iH3LkwPTGPqxb9/Y6vd49a5/eB2ey9rnr+9bPXmezr3NGyLLsYiFfDuSJQLb/9QGOC/li/I2baBDypTEDGP1sdhMNATgexTXIW8d6N8/z2zqVcRMNQbOc6v3aMGEDabfbFwTgaB99n+YBDvUbyIVCfve/B8A/ny8qV0eAZuEshGtcTWhk2bWRU8iGmVMBvvqvE8kK+V+T7Uszp4H8oMgO8ICrCQIs0pZ638xpALZpmVeVvkMeDMDhqvYOIpdWZJuzgpDPq9PnxjtOx2vvIAAbNXmbnBVyYI06faOuQAR4U5O3uqL8HtIlukf21lYRcp++s9hZQbxfMNYsT9Bah+J6nue3OyuQnKXEUltrkSGuA7jOWaE1NDRVW+u3GvfI6bg+PDx8WUX5oxyfiY5brdbk1IG0Wq3JmrgzzhpCjhQZyrKrUgfivb9ap+QPRvK7iIHDuvnmpw5ERG7R0futkfwe4o+03PelDiQA9+v6h84aAuxQ548kD8T7RzVp25014q2HOn8qeWuRTye7nAjA4xrIazW01uu6R9YZye8hflDJ300eCPmeJm2Zs0bu/Z2apc+StxbwuU7Ihc4aJG/Q2Z7VsEd8XGsC1ztrNJvNy7UiP9XQWj8X6yFMd9aItyqBPCvA+cHBwYuqCi6zDwwMTBLgnAC/R06XAkKe0hPpjKqCy+wkZ2oLnzSW30UOHCtIRG6sKrjMLll2k7bw98bye8g/VZK7qgouszfIu7Uin7hUEGBXJGl4vzxZRYCH9Buy01h+D/mrmq31yQIhN2jVtxjL7yIHnlSSV6oKLrUDW4o1759wqSDkChXwdsKKvKOt9bCx/C4S7+9Vko8TBrJfjyf3uFRokvNUwFDC1jpaDBRgrrH8LpIQrlQBJxJW5KR+q65wqVD8BQ2cj0eVvx8fLAJpdx2Dkv91LeSv2sPT+hVcZg8hTFf7L4nkd5EBeUGWZbP7FVxmb3g/R8c7E8nvEXCw2IzkHf0KLrPneb5QP7gHXGoIsEdH8NJ+BZfZBVimvncnkt8jYKuKWPsPt+ejbuvHYw/kWvW9NZH8HgHPah+/YO6b3Kyt9YxLDSFXKtlb5r6B7dpaj1n7Lj+mkIMjIyNTrPxGX0IeSX486YDkpQL82Nms1o+Qp7IsuyR5IBHxRj6Q38SvsGEQZ4X8muTN/Yj6A5bIQs3Yq3kvAAAAAElFTkSuQmCC')
const filmsStore = useFilmsStore()

const deleteFromRated = (id: number) => {
  filmsStore.ratedFilms = filmsStore.ratedFilms.filter(f => f.id !== id)
  sortFilms()
}
const selectedOption = ref<string>('title')

const sortedFilms = ref<Film[]>([]);
const sortFilms = () => {
  if (selectedOption.value === 'title') {
    sortedFilms.value = filmsStore.ratedFilms.sort((f1: Film, f2: Film) => f1.title?.localeCompare(f2.title))
    filmsStore.ratedFilmsOrderChanged = !filmsStore.ratedFilmsOrderChanged
  } else {
    sortedFilms.value = filmsStore.ratedFilms.sort((f1: Film, f2: Film) => f2.userRating && f1.userRating ? f2.userRating - f1.userRating : 0)
    filmsStore.ratedFilmsOrderChanged = !filmsStore.ratedFilmsOrderChanged
  }
}
onMounted(() => {
  sortFilms()
})
watch(selectedOption, () => {
  sortFilms()
});
watch(() => filmsStore.ratedFilms, () => {
  sortFilms()
}, {deep: true});
</script>

<template>
  <div class="container">
    <div class="sort">
      <span>Sort by</span>
      <select v-model="selectedOption">
        <option value="title">Title</option>
        <option value="userRating">Rating</option>
      </select>
    </div>
    <div class="film-container">
      <div v-for="film in sortedFilms" :key="film.id">
        <div class="ratedFilm">
          <div class="film" @click="router.push(`/film/${film.id}`)">
            <img :src=film.small_cover_image>
            <span>{{film.title}}</span>
          </div>
          <rating-stars :film="film"/>
          <img
              @click="deleteFromRated(film.id)"
              :src="trashImg"
              alt="trash image"
              class="trash"
          >
        </div>
      </div>
    </div>
  </div>
  <seen-recently></seen-recently>
</template>

<style lang="scss" scoped>
.container {
  min-height: 300px;

}
.sort {
  height: 70px;
  padding: 50px 100px 0;
}
.sort span {
  margin-right: 10px;
}
.film-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-gap: 20px;
  padding: 50px 100px 70px;
}
.ratedFilm {
  display: flex;
  align-items: center;
  gap: 30px;
  background-color: #111111;
  padding-right: 20px;
}
.film {
  display: flex;
  align-items: center;
  width: 300px;
  gap: 15px;
}
.film img {
  cursor: pointer;
}
.film span {
  cursor: pointer;
}
.trash {
  width: 20px;
  cursor: pointer;
}
.trash:hover {
  transform: scale(1.1);
}
</style>
