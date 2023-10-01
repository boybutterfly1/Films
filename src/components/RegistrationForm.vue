<script setup lang="ts">
import { ref } from "vue";
import { useUsersStore } from '@/store/users'

const usersStore = useUsersStore()
const user = ref({
  name: '',
  login: '',
  password: '',
  regDate: ''
})
const isRegistered = ref(true)
const register = () => {
  usersStore.registerUser(
      {
        id: Date.now(),
        name: user.value.name,
        login: user.value.login,
        password: user.value.password,
        regDate: new Date().toLocaleString()
      }
  );
  user.value.name = '';
  user.value.login = '';
  user.value.password = '';

}

const login = () => {

}
</script>

<template>
  <div v-if="isRegistered === true" class="login-form">
    <input
      type="text"
      placeholder="Login"
      v-model="(user.login)"
    >
    <input
      type="text"
      placeholder="Password"
      v-model="(user.password)"
    >
    <button @click="usersStore.loginUser(user.login, user.password)">Login</button>
    <span @click="isRegistered = false; user.login = ''; user.password = '';">Not registered yet?</span>
  </div>
  <div v-else class="register-form">
    <input
        type="text"
        placeholder="Name"
        v-model="(user.name)"
    >
    <input
        type="text"
        placeholder="Login"
        v-model="(user.login)"
    >
    <input
        type="password"
        placeholder="Password"
        v-model="(user.password)"
    >
    <button @click="register">Register</button>
  </div>

</template>

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
}
.register-form {
  display: flex;
  flex-direction: column;
}
</style>
