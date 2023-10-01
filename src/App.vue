<script setup lang="ts">
import { useFilmsStore } from "@/store/films";
import { useUsersStore } from "@/store/users";
import {computed, onMounted, ref, watch} from "vue";
import Header from "@/components/Header.vue";

const usersStore = useUsersStore()
const filmsStore = useFilmsStore()
const length = computed(() => filmsStore.savedFilms.length)
const login = computed(() => usersStore.isLoggedIn)

onMounted(async () => {
  await filmsStore.getTotalPages()

  const filmsInLocalStorage = ref(localStorage.getItem('savedFilms'))
  if (JSON.parse(String(filmsInLocalStorage.value))) {
    filmsStore.savedFilms = (JSON.parse(String(filmsInLocalStorage.value)))
  }

  const loginLocalStorage = ref(localStorage.getItem('isLogged'))
  if (JSON.parse(String(loginLocalStorage.value))) {
    usersStore.isLoggedIn = JSON.parse(String(loginLocalStorage.value))
  }
})

watch(length, () => {
  localStorage.setItem('savedFilms', JSON.stringify(filmsStore.savedFilms))
})

watch(login, () => {
  localStorage.setItem('isLogged', JSON.stringify(usersStore.isLoggedIn))
}, {immediate: true})
</script>

<template>
  <div class="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.app {
  width: 100vw;
  min-height: 100vh;
  font-family: 'Lato', sans-serif;
  background-color: #000000;
  color: white;
  justify-content: center
}
</style>
