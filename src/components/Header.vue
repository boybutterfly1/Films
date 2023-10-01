<script setup lang="ts">
import { useUsersStore } from "@/store/users";
import { ref } from 'vue';
import MyDialog from "@/components/UI/MyDialog.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import router from "@/router";

const usersStore = useUsersStore()
</script>

<template>
  <div class="header">
    <div
      class="logo"
      @click="router.push('/page/1')"
    >
      Berba Films
    </div>
    <button v-if="usersStore.isLoggedIn === false" @click="usersStore.isOpen = true">Login</button>
    <button v-else @click="usersStore.isLoggedIn = false">Logout</button>
    <MyDialog :isOpen="usersStore.isOpen" @close="usersStore.isOpen = false">
      <RegistrationForm/>
    </MyDialog>
  </div>

</template>

<style lang="scss" scoped>
.header {
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
  color: white;
}
</style>
