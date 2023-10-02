<script setup lang="ts">
import {useUsersStore} from "@/store/users";

const usersStore = useUsersStore()
</script>

<template>
  <div class="profile">
      <img class="profile-picture" src="https://imageup.ru/img45/4543435/sticker.jpg" alt="avatar">
    <div class="profile-info">
      <span>Name: {{usersStore.currentUser.name}}</span>
      <span>Registration date: {{usersStore.currentUser.regDate}}</span>
      <span>Total ratings count: </span>
      <span>Total films count: </span>
    </div>
  </div>
  <div class="watched">
    <span>Watched recently </span>
  </div>
</template>

<style lang="scss">
.profile {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.profile-picture{
  width: 200px;
  height: auto;
}
.profile-info span {
  display: block;
  margin-bottom: 10px;
}
.watched {
  display: flex;
  justify-content: center;
}
</style>
