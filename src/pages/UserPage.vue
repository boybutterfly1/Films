<script setup lang="ts">
import WatchList from "@/components/User/WatchList.vue";
import Ratings from "@/components/User/Ratings.vue";
import Lists from "@/components/User/Lists.vue";
import Profile from "@/components/User/Profile.vue";
import {ref, reactive} from "vue";

const selectedComp = ref('watch-list')
</script>

<template>
  <div class="user-navbar">
    <div @click="selectedComp = 'profile'" :class="{ 'selected': selectedComp === 'profile' }">Profile</div>
    <div @click="selectedComp = 'watch-list'" :class="{ 'selected': selectedComp === 'watch-list' }">Watch List</div>
    <div @click="selectedComp = 'ratings'" :class="{ 'selected': selectedComp === 'ratings' }">Ratings</div>
    <div @click="selectedComp = 'lists'" :class="{ 'selected': selectedComp === 'lists' }">Lists</div>
  </div>
  <profile v-if="selectedComp === 'profile'"/>
  <watch-list v-if="selectedComp === 'watch-list'"/>
  <ratings v-if="selectedComp === 'ratings'"/>
  <lists v-if="selectedComp === 'lists'"/>
</template>

<style lang="scss" scoped>
.user-navbar {
  display: flex;
  justify-content: center;
  background-color: #000000;
  color: #a4a0a0;
  padding-top: 70px;
  padding-bottom: 30px;
  gap: 30px;
}
.user-navbar div {
  cursor: pointer;
  padding: 5px 5px;
  margin-right: 20px;
  border-radius: 0px;
}
.user-navbar div:hover {
  transition: color 0.2s;
  color: white;
}
.user-navbar div.selected {
  color: white;
  border-bottom: 2px solid #810505;
}
</style>
