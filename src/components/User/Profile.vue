<script setup lang="ts">
import {useUsersStore} from "@/store/users";

const usersStore = useUsersStore()
</script>

<template>
  <div class="profile-picture">Profile Picture</div>
  <div>Name</div>
  <div>Registration date</div>
  <div>Total ratings count: </div>
  <div>Total films count: </div>
  <div>Watched recently </div>
</template>

<style lang="scss">

</style>
