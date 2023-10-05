<script lang="ts" setup>
import { useFilmsStore } from "@/store/films";
import {ref} from "vue";

const moreSrc = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABL0lEQVR4nO3VO07DQBAG4G2AikcLHCqBY5DAXVxasubfh0The4QQKSAaCFwD6EFjTVY8bKXMgv5P2sbefySP12PniIiIiIiIiP6/qqr2AnAZgNsg8m5rHkWmbdvulp7veO9PA/AQgY/eJXJ/3TQnrtD81050RQLwGERGTdPs64rAOIqs7N5dX2e2nc8icGVP/dTW9aH7Qa+ti0VgUlo+iyKL7olFRm6A9/7M9sxLy2cBeNNN+irdgJTSgXXktbR8pjc3Fepe70ChbeczHXe2aewGBJFzO8c3peUzndO2adX3sQE4iiIvdkYvSstnOtJ0TtuIe9YPS8+krq4TViSKLOu63ikt/43+bNbFBn5Iy5TScan5350BJnoOdZLYmunr3NiJAvJERERERERE7u/7BI566zHtkb6xAAAAAElFTkSuQmCC')

const filmsStore = useFilmsStore()

</script>

<template>
  <img :src="moreSrc" alt="more" @click="">
</template>

<style lang="scss" scoped>

</style>