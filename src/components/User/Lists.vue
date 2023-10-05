<script setup lang="ts">
import {useFilmsStore} from "@/store/films";
import router from "@/router";

const filmsStore = useFilmsStore()
</script>

<template>
 <div class="lists">
   <div v-for="list in filmsStore.filmsLists">
     {{list.name}}
     <div class="films-container">
       <div v-for="film in list.films">
         <img
             :src="film.img"
             alt="cover"
             @click="router.push(`/film/${film.id}`)"
         >
       </div>
     </div>
   </div>
 </div>
</template>

<style lang="scss" scoped>
.lists {
  display: flex;
  flex-direction: column;
}
.films-container {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 30px;
  height: 300px;
  align-items: center;
}
.films-container img {
  width: auto;
  height: 250px;
  margin-right: 10px;
  position: relative;
}
.films-container img:hover {
  transition: transform 0.3s ease;
  transform: scale(1.1);
}
</style>
