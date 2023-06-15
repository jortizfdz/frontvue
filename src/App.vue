<script setup>
  import { RouterView } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  const authStore = useAuthStore();

</script>

<template>

  <nav class="navbar navbar-expand-lg bg-body-tertiary">
   <div class="container-fluid">
     <RouterLink to="/" class="navbar-brand">Libreria App</RouterLink>
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse"  id="navbarSupportedContent">
       <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="authStore.isLogged">
         <li class="nav-item px-lg-5">
           <RouterLink to="/" class="nav-link">Libros</RouterLink>
         </li>
         <li class="nav-item px-lg-5">
           <RouterLink to="/libraries" class="nav-link">Librerias</RouterLink>
         </li>
         <li class="nav-item px-lg-5">
           <RouterLink to="/authors" class="nav-link">Autores</RouterLink>
         </li>
         <li class="nav-item px-lg-5">
           <RouterLink to="/editorials" class="nav-link">Editoriales</RouterLink>
         </li>
         <li class="nav-item px-lg-5">
           <RouterLink to="/addresses" class="nav-link">Direcciones</RouterLink>
         </li>
       </ul>
     </div>
   </div>
 </nav>


  <div class="container">
    <div class="row">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

</style>
