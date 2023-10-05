<script setup lang="ts">
import {useUsersStore} from "@/store/users";
import SeenRecently from "@/components/UI/SeenRecently.vue";

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
  <seen-recently></seen-recently>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 50px 100px 70px;
}
.profile-picture{
  width: 200px;
  height: auto;
}
.profile-info span {
  display: block;
  margin-bottom: 10px;
}
</style>
