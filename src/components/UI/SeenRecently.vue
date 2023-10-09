<script lang="ts" setup>
import {useUsersStore} from "@/store/users";
import router from "@/router";
const usersStore = useUsersStore()
</script>

<template>
  <div v-if="usersStore.seenRecently.length > 0" class="seen-container">
    <span>Seen recently</span>
    <div class="seen-films">
      <img
          class="seen-films__img"
          v-for="film in usersStore.seenRecently"
          :src="film.medium_cover_image"
          alt="cover"
          @click="router.push(`/film/${film.id}`)"
      >
    </div>
  </div>
</template>

<style lang="sass" scoped>
.seen-container
  display: flex
  flex-direction: column
  padding: 30px 100px 70px
  align-items: center

.seen-films
  border-radius: 6px
  width: 1000px
  margin-top: 20px
  display: flex
  height: 250px
  align-items: center
  background-color: #111111
  justify-content: center
  &__img
    width: auto
    height: 200px
    margin: 0 10px
    position: relative
    cursor: pointer
    &:hover
      transition: transform 0.3s ease
      transform: scale(1.1)
</style>