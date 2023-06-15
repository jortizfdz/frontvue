<script setup>
import axios from 'axios';
import {ref,onMounted, nextTick} from 'vue';
import Paginate from 'vuejs-paginate-next';
import Library from '@/services/Library';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.token;

onMounted( ()=> { getLibraries(1) });
const libraries = ref([]);
const pages = ref(0);

const getLibraries = async (page) =>{
      await Library.get(page, (data) =>{
        libraries.value = data;
        pages.value = data.meta.last_page;
      }, (error) => { console.log(error.data.message); });

}
const deleteLibrary = async (id,index) =>{
    await Library.delete(id, (data) =>{ libraries.value.data.splice(index,1) }, (error) => { console.log(error.data.message); });

}

</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Calle</th>
        <th>No. Exterior</th>
        <th>No. Interior</th>
        <th>Codigo Postal</th>
        <th>Referencia</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="l,i in libraries.data" :key="l.id">
        <td>{{ l.name }}</td>
        <td>{{ l.address.street_name }}</td>
        <td>{{ l.address.exterior_number }}</td>
        <td>{{ l.address.interior_number }}</td>
        <td>{{ l.address.zip }}</td>
        <td>{{ l.address.reference }}</td>
        <td><button type="button" class="btn btn-warning">Editar</button></td>
        <td><button type="button" class="btn btn-danger" @click="deleteLibrary(l.id,i)">Borrar</button></td>
      </tr>
    </tbody>
  </table>
  <Paginate :page-count="pages"
           :click-handler="getLibraries"
           :prev-text="'Anterior'" :next-text="'Siguiente'"
           :container-class="'pagination'"
           >
           </Paginate>

</template>

<style>

</style>
