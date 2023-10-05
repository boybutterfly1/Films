<script setup lang="ts">
import { useUsersStore } from "@/store/users";
import { ref } from 'vue';
import MyDialog from "@/components/UI/MyDialog.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import router from "@/router";
import {useRoute} from "vue-router";

const route = useRoute()
const usersStore = useUsersStore()
</script>

<template>
  <div class="navbar">
    <div class="logo" @click="router.push('/')">
      Bebra Films
    </div>
    <div class="btns">
<!--      <router-link :to="`/catalog/page/${1}`" exact class="tab" active-class="active" @click="console.log(route)">Catalog</router-link>-->
      <router-link
        :to="`/catalog/page/${1}`"
        exact class="tab"
        :class="{'active': route.path.includes('catalog')}"
      >
        Catalog
      </router-link>
<!--      <button @click="$router.replace('/catalog')">Catalog</button>-->
      <router-link
        v-if="usersStore.isLoggedIn"
        :to="`/user/${usersStore.currentUser.id}`"
        exact
        class="tab"
        active-class="active"
      >
        {{usersStore.currentUser.name}}
      </router-link>
<!--      <button v-if="usersStore.isLoggedIn" @click="">{{usersStore.currentUser.name}}</button>-->
      <button
        v-if="!usersStore.isLoggedIn"
        @click="usersStore.logRegWindowIsOpen = true"
      >
        Login
      </button>
      <button
        v-else
        @click="usersStore.isLoggedIn = false; $router.replace('/catalog/page/1')"
      >
        Logout
      </button>
    </div>
    <MyDialog :isOpen="usersStore.logRegWindowIsOpen" @close="usersStore.logRegWindowIsOpen = false">
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
  gap: 30px;
}
.tab {
  padding: 5px 5px;
  margin-right: 20px;
  background-color: black;
  border-width: 0;
  color: #a4a0a0;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
}
.tab:hover {
  transition: color 0.2s;
  color: white;
}
.tab.active {
  transition: color 0.2s;
  color: white;
  border-bottom: 2px solid #810505;
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
  transition: color 0.2s;
  color: white;
}
</style>
