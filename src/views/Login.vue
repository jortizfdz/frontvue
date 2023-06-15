<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.js'
const authStore = useAuthStore()
const user = ref({ email:'', password:''});
</script>

<template>
  <div class="row mt-5">
          <div class="col-md-4 offset-md-4">
    <form @submit.prevent="authStore.login(user)">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email</label>
      <input class="form-control" type="email" v-model="user.email">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" v-model="user.password" class="form-control">
    </div>
    <button type="submit" class="btn btn-primary">Ingresar</button>
  </form>
  </div>
  </div>
</template>

<style>

</style>
