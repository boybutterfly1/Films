<script lang="ts" setup>
import {useDialogWindows} from "@/store/dialogWindows";
import { useFilmsStore } from "@/store/films";
import {computed, onMounted, onUnmounted, ref} from "vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import {Film, List} from "@/types/types";

const moreSrc = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACeElEQVR4nO3ZTW4TMRjG8QiWIFYgPi/QcgdgCYhrUFFQP47Blg2iLLkCLVwjKZPntd8KcYR+IVHUVkEuASVO0sTT6Sr/nzRSpNR+Rnlrj8dutQAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0wN0fBOlNlL66ZG728+xKn6UvLr1Of9NE1jjznj94I7dceudmx27WO++K0mk0+yTpLvmXwKUXUdqfVogxhdmP3e5z8huUhmCUTkqLMVCUEw9hmfzmRsbpyA8ttaPZSoxxod1uX0uXV9ViNFt1qTOuKHVGis95/hAzu5dPU1H6FaWXvV7vyqR26btothSlo6zt3o+qukN+TW72caQY3e6jmdtLj/OiuPSB/BrSsi1fTaWRUdxPCMvZ8D2OMd4nv1BaZ+dz5nnT1CSpjUvbQ33N8IAPc54/4uwFZ3B0mK0Ud/KvL7O1bJRskl/IzeJQQWJcKO3jf19VtZj9txn5hdzscPBHrKrqequm1DYbIYfkF3LpoKmCuPuN/O2d/EIuhaamrJ1u92HxlKX5zh+9IbOt7KG+WveGXFrP+vpMfqExy75OzWXf1Wj2rYFlZ2ee8md7MTRbKu4nnQ1kL4ZpS4b8GtxsI3sYH6XtkFnb75g9GbOf9Z78mtLhUtoQHClKCMvTNhf7W/bDxTDb/b69fZv8C0hbxmPPQv5uB6ylFUTaek7L4rPVhLQ+Mmf2t59DCM/Ib0AaERc+oDJ7RX6D+iNlr7gYZrs7ITwl/xKEEG5Gs7du9nuGYqQV2kbJgdQ0854/UTrP6J9zbLmk/r7XYf/zZpqeZlnakg8AAAAAAAAAAAAAAAAAAAAAAAAAAACgNdUfeuRtq/PbCC4AAAAASUVORK5CYII=')
const props = defineProps<{
  filmId: number
}>()

const dialogsStore = useDialogWindows()
const filmsStore = useFilmsStore()
const film = ref<Film | null>(null)

const isFilmInList = (list: List) => {
  return list.films.some((film: Film) => film.id === props.filmId);
};
const addToList = (list: List) => {
  if (film.value) list.films.push(film.value)
}
const removeFromList = (list: List) => {
  if (list.films.some(film => film.id === props.filmId)) {
    list.films = list.films.filter(film => film.id !== props.filmId)
  }
}
const handleCheckbox = (list: List) => {
  isFilmInList(list) ? removeFromList(list) : addToList(list)
}
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

onMounted(async() => {
  film.value = await filmsStore.fetchFilmByID(props.filmId)
  console.log(film.value)
})
onUnmounted(() => {
  dialogsStore.addToListIsOpen = false
  filmsStore.newListWindowIsOpen = false
})
</script>

<template>
  <div>
    <img class="more-img" :src="moreSrc" alt="more" @click="dialogsStore.addToListIsOpen = true">
    <MyDialog :isOpen="dialogsStore.addToListIsOpen" @close="dialogsStore.addToListIsOpen = false">
      <div class="checkbox-container">
        <span>Add to list</span>
        <div v-for="list in filmsStore.filmsLists" :key="list.id">
          <input
              type="checkbox"
              :checked="isFilmInList(list)"
              @click="handleCheckbox(list)"
              :id="'checkbox-' + list.id"
          >
          <label :for="'checkbox-' + list.id">{{list.name}}</label>
        </div>
        <button
            @click="filmsStore.newListWindowIsOpen = true"
        >
          New list
        </button>
        <MyDialog :is-open="filmsStore.newListWindowIsOpen" @close="filmsStore.newListWindowIsOpen = false; dialogsStore.addToListIsOpen = false">
          <div class="new-list">
            <input
                type="text"
                autofocus placeholder="List Name"
                v-model="newList.name"
            >
            <button @click="createList">Create</button>
          </div>
        </MyDialog>
      </div>
    </MyDialog>
  </div>
</template>

<style lang="scss" scoped>
.more-img {
  width: 30px;
  rotate: 90deg;
  cursor: pointer;
}
.checkbox-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.checkbox-container span {
  margin-bottom: 10px;
  align-self: center;
}
.checkbox-container input {
  margin-bottom: 7px;
  cursor: pointer;
}
.checkbox-container label {
  cursor: pointer;
}
.checkbox-container button {
  width: 100%;
  margin-top: 15px;
  padding: 8px 15px;
  color: #dcd5d5;
  background-color: #7a7474;
  border-width: 0;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  font-weight: bold;
}
.checkbox-container button:hover {
  transition: 0.3s;
  color: #dcd5d5;
  background-color: #810505;
}
.new-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.new-list input {
  align-self: center;
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
  padding: 8px 15px;
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