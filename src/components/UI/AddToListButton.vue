<script lang="ts" setup>
import {useDialogWindows} from "@/store/dialogWindows";
import { useFilmsStore } from "@/store/films";
import {computed, onMounted, onUnmounted, ref} from "vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import {Film, List} from "@/types/types";

const moreSrc = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABL0lEQVR4nO3VO07DQBAG4G2AikcLHCqBY5DAXVxasubfh0The4QQKSAaCFwD6EFjTVY8bKXMgv5P2sbefySP12PniIiIiIiIiP6/qqr2AnAZgNsg8m5rHkWmbdvulp7veO9PA/AQgY/eJXJ/3TQnrtD81050RQLwGERGTdPs64rAOIqs7N5dX2e2nc8icGVP/dTW9aH7Qa+ti0VgUlo+iyKL7olFRm6A9/7M9sxLy2cBeNNN+irdgJTSgXXktbR8pjc3Fepe70ChbeczHXe2aewGBJFzO8c3peUzndO2adX3sQE4iiIvdkYvSstnOtJ0TtuIe9YPS8+krq4TViSKLOu63ikt/43+bNbFBn5Iy5TScan5350BJnoOdZLYmunr3NiJAvJERERERERE7u/7BI566zHtkb6xAAAAAElFTkSuQmCC')
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

onMounted(async() => {
  film.value = await filmsStore.fetchFilmByID(props.filmId)
  console.log(film.value)
})
onUnmounted(() => {
  dialogsStore.addToListIsOpen = false
})
</script>

<template>
  <img :src="moreSrc" alt="more" @click="dialogsStore.addToListIsOpen = true">
  <MyDialog :isOpen="dialogsStore.addToListIsOpen" @close="dialogsStore.addToListIsOpen = false">
    <div class="checkbox-container">
      <span>Add to list</span>
      <div v-for="list in filmsStore.filmsLists" :key="list.id">
        <input
            type="checkbox"
            :checked="isFilmInList(list)"
            @click="handleCheckbox(list)"
        >
        <label>{{list.name}}</label>
      </div>
    </div>
  </MyDialog>
</template>

<style lang="scss" scoped>
.checkbox-container {
  display: flex;
  flex-direction: column;
}
</style>