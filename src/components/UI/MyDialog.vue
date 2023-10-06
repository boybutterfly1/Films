<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()
</script>

<template>
  <div
      class="dialog"
      v-if="isOpen"
      @click="$emit('close')"
  >
    <div
        class="dialog-content"
        @click.stop
    >
      <slot/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.dialog-content {
  background-color: #39393d;
  padding: 20px;
  border-radius: 5px;
}
</style>
