<script setup lang="ts">
import { useFilmsStore } from "@/store/films";
import { useUsersStore } from "@/store/users";
import {computed, onMounted, ref, watch} from "vue";
import Navbar from "@/components/Navbar.vue";

const usersStore = useUsersStore()
const filmsStore = useFilmsStore()

onMounted(async () => {
  await filmsStore.getTotalPages()

  const filmsInLocalStorage = ref(localStorage.getItem('savedFilms'))
  if (JSON.parse(String(filmsInLocalStorage.value))) {
    filmsStore.savedFilms = (JSON.parse(String(filmsInLocalStorage.value)))
  }

  const loginLocalStorage = ref(localStorage.getItem('isLogged'))
  if (JSON.parse(String(loginLocalStorage.value)) === true) {
    usersStore.isLoggedIn = JSON.parse(String(loginLocalStorage.value))
  }
})

watch(() => {filmsStore.savedFilms.length}, () => {
  localStorage.setItem('savedFilms', JSON.stringify(filmsStore.savedFilms))
}, {deep:true})

watch(() => {usersStore.isLoggedIn}, () => {
  localStorage.setItem('isLogged', JSON.stringify(usersStore.isLoggedIn))
}, {deep: true})
</script>

<template>
  <div class="app">
    <Navbar class="navbar"></Navbar>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.app {
  width: 100vw;
  min-height: 100vh;
  font-family: 'Lato', sans-serif;
  background-color: #000000;
  color: #dad7d7;
}
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
}
</style>
