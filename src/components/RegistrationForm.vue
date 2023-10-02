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
  <div class="log-reg-form">
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
.log-reg-form input {
  margin-bottom: 5px;
  padding: 5px 5px;
  font-family: 'Lato', sans-serif;
  background-color: #f5f2f2;
  color: black;
  border: 1px solid #a4a0a0;
}
.log-reg-form button {
  margin-top: 5px;
  margin-bottom: 10px;
  padding: 10px 15px;
  background-color: white;
  border-width: 0;
  border-radius: 4px;
  color: #a4a0a0;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  font-weight: bold;
}
</style>
