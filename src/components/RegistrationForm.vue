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
  if (user.value.name && user.value.login && user.value.password) {
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
      type="password"
      placeholder="Password"
      v-model="(user.password)"
    >
    <button @click="usersStore.loginUser(user.login, user.password)">Login</button>
    <span class="text-btn" @click="isRegistered = false; user.login = ''; user.password = '';">Not registered yet?</span>
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
    <span class="text-btn" @click="isRegistered = true; user.login = ''; user.password = '';">Login</span>
  </div>
  </div>
</template>

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.log-reg-form input {
  border-radius: 1px;
  margin-bottom: 5px;
  padding: 5px 5px;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
  background-color: #f5f2f2;
  color: black;
  border: 1px solid #a4a0a0;
}
.log-reg-form input:focus {
  outline: none;
}
.log-reg-form button {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 15px;
  padding: 10px 15px;
  color: #dcd5d5;
  background-color: #7a7474;
  border-width: 0;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  font-weight: bold;
}
.log-reg-form button:hover {
  transition: 0.3s;
  color: #dcd5d5;
  background-color: #810505;
}
.text-btn {
  font-size: 14px;
  color: #a4a0a0;
  cursor: pointer;
}
.text-btn:hover {
  transition: color 0.3s;
  color: white;
}
</style>
