<script setup lang="ts">
import { useUsersStore } from "@/store/users";
import { ref } from 'vue';
import MyDialog from "@/components/UI/MyDialog.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import router from "@/router";

const usersStore = useUsersStore()
</script>

<template>
  <div class="navbar">
    <div class="logo" @click="router.push('/page/1')">
      Berba Films
    </div>
    <div class="btns">
      <button v-if="usersStore.isLoggedIn" @click="">{{usersStore.currentUser.name}}</button>
      <button v-if="usersStore.isLoggedIn === false" @click="usersStore.isOpen = true">Login</button>
      <button v-else @click="usersStore.isLoggedIn = false">Logout</button>
    </div>
    <MyDialog :isOpen="usersStore.isOpen" @close="usersStore.isOpen = false">
      <RegistrationForm/>
    </MyDialog>
  </div>

</template>

<style lang="scss" scoped>
.navbar {
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 25px 15px;
}
.logo {
  font-weight: bold;
  font-size: 30px;
  cursor: pointer;
}
.btns button {
  padding: 10px 15px;
  background-color: black;
  border-width: 0;
  color: #a4a0a0;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  font-weight: bold;
}
.btns button:hover {
  color: white;
}
</style>
