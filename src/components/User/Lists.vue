<script setup lang="ts">
import {useFilmsStore} from "@/store/films";
import router from "@/router";
import {onUnmounted, ref} from "vue";
import {List} from "@/types/types";
import MyDialog from "@/components/UI/MyDialog.vue";
import Films from "@/api/films";
import SeenRecently from "@/components/UI/SeenRecently.vue";

const filmsStore = useFilmsStore()
const plusSrc = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA60lEQVR4nO3UMQ7DMAwEQf//Ewb2o0mbMp3OyQzAXuCCui4AAAAAAACAx+q+X59z+j1/L0G2JMiWBNmSIFsSZEuCbEmQLQmyJUG2JMiWBNmSIFsSZEuCbEmQLQmyJUG2JMiWBNmSIFsSZEuCbEmQLQmyJUG2JMiWBNmSIFsS5LvF/Ntca04vJEEEyYXcxy/hMV/WKVnMlgTZkiBbEmRLgmxJkC0JsiVBtiTIlgTZkiBbEmRLgmxJkC0JsiVBtiTIlgTZkiBbEmRLgmxJkC0JsiVBtiTIlgTZkiBbEmRLgmxJEAAAAAAAAOD6FW8cFpBcqiRfBwAAAABJRU5ErkJggg==')

const newList = ref<List>({
  id: Date.now(),
  name: '',
  films: []
})
const createList = () => {
  if (newList.value.name) {
    filmsStore.filmsLists.unshift({...newList.value})
    filmsStore.newListWindowIsOpen = false
  }
  newList.value.name = ''
}
onUnmounted(() => {
  filmsStore.newListWindowIsOpen = false
})
</script>

<template>
  <div class="container">
    <div class="create-list">
    <div
        class="create-button"
        @click="filmsStore.newListWindowIsOpen = true"
    >
      <img :src="plusSrc" alt="plus-math"/>
    </div>
      <span>New List</span>
    <MyDialog :is-open="filmsStore.newListWindowIsOpen" @close="filmsStore.newListWindowIsOpen = false">
      <div class="new-list">
        <input
            type="text"
            placeholder="List Name"
            v-model="newList.name"
        >
        <button @click="createList">Create</button>
      </div>
    </MyDialog>
  </div>
   <div v-for="list in filmsStore.filmsLists" :key="list.id">
     <p>{{list.name}}</p>
     <div v-if="list.films.length > 0" class="list-container">
       <div v-for="film in list.films">
         <img
             :src="film.medium_cover_image"
             alt="cover"
             @click="router.push(`/film/${film.id}`)"
         >
       </div>
     </div>
     <div v-else class="empty-list-container">
       <div class="empty-list">
         Empty List
       </div>
     </div>
   </div>
  </div>
  <seen-recently></seen-recently>
</template>

<style lang="scss" scoped>
.container {
  padding: 50px 100px 70px;
  min-height: 300px;
}
.list-container {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 30px;
  height: 250px;
  align-items: center;
}
.list-container img {
  width: auto;
  height: 200px;
  margin-right: 10px;
  position: relative;
  cursor: pointer;
}
.list-container img:hover {
  transition: transform 0.3s ease;
  transform: scale(1.1);
}
.empty-list-container {
  display: flex;
  margin-bottom: 30px;
  height: 250px;
  align-items: center;
}
.empty-list{
  display: flex;
  justify-content: center;
  height: 200px;
  width: 130px;
  border-radius: 6px;
  background-color: #111111;
  align-items: center;
}
.create-list {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 20px;
  margin-bottom: 30px;
}
.create-button {
  height: 70px;
  width: 70px;
  background-color: #111111;
  display: flex;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid #111111;
  transition: transform 0.3s;
}
.create-button:hover {
  transform: scale(1.05);
}
.create-button img {
  align-self: center;
  width: 50px;
}
.new-list {
  display: flex;
  flex-direction: column;
}
.new-list input {
  border-radius: 1px;
  margin-bottom: 5px;
  padding: 5px 5px;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
  background-color: #f5f2f2;
  color: black;
  border: 1px solid #a4a0a0;
}
.new-list input:focus {
  outline: none;
}
.new-list button {
  margin-top: 15px;
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
.new-list button:hover {
  transition: 0.3s;
  color: #dcd5d5;
  background-color: #810505;
}
</style>
