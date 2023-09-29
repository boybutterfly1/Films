<script setup lang="ts">

</script>

<template>
  <button>
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #fa6b30;
</style>
