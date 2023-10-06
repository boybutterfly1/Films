<script lang="ts" setup>
import {useUsersStore} from "@/store/users";
import router from "@/router";
const usersStore = useUsersStore()
</script>

<template>
  <div v-if="usersStore.seenRecently.length > 0" class="watched">
    <span>Seen recently</span>
    <div class="seen-container">
      <img
          v-for="film in usersStore.seenRecently"
          :src="film.medium_cover_image"
          alt="cover"
          @click="router.push(`/film/${film.id}`)"
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.watched {
  display: flex;
  flex-direction: column;
  padding: 30px 100px 70px;
  align-items: center;

}
.seen-container {
  border-radius: 6px;
  width: 800px;
  margin-top: 20px;
  display: flex;
  height: 250px;
  align-items: center;
  background-color: #111111;
  justify-content: center;
}
.seen-container img {
  width: auto;
  height: 200px;
  margin: 0 10px;
  position: relative;
  cursor: pointer;
}
.seen-container img:hover {
  transition: transform 0.3s ease;
  transform: scale(1.1);
}
</style>