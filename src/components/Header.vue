<script setup lang="ts">
import { useUsersStore } from "@/store/users";
import { ref } from 'vue';
import MyDialog from "@/components/UI/MyDialog.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";

const usersStore = useUsersStore()
</script>

<template>
  <div class="header">
    <button v-if="usersStore.isLoggedIn === false" @click="usersStore.isOpen = true">Login</button>
    <button v-else @click="usersStore.isLoggedIn = false">Logout</button>
    <MyDialog :isOpen="usersStore.isOpen" @close="usersStore.isOpen = false">
      <RegistrationForm/>
    </MyDialog>
  </div>

</template>

<style lang="scss" scoped>
.header {
  margin: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
