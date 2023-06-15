<script setup>
import axios from 'axios';
import {ref,onMounted, nextTick} from 'vue';
import Paginate from 'vuejs-paginate-next';
import Editorial from '@/services/Editorial';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.token;

onMounted( ()=> { getEditorial(1) });
const editorials = ref([]);
const pages = ref(0);

const getEditorial = async (page) =>{
      await Editorial.get(page, (data) =>{
        editorials.value = data;
        pages.value = data.meta.last_page;
      }, (error) => { console.log(error.data.message); });

}
const deleteEditorial = async (id,index) =>{
    await Editorial.delete(id, (data) =>{ editorials.value.data.splice(index,1) }, (error) => { console.log(error.data.message); });

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
      <tr v-for="e,i in editorials.data" :key="e.id">
        <td>{{ e.name }}</td>
        <td>{{ e.address.street_name }}</td>
        <td>{{ e.address.exterior_number }}</td>
        <td>{{ e.address.interior_number }}</td>
        <td>{{ e.address.zip }}</td>
        <td>{{ e.address.reference }}</td>
        <td><button type="button" class="btn btn-warning">Editar</button></td>
        <td><button type="button" class="btn btn-danger" @click="deleteEditorial(e.id,i)">Borrar</button></td>
      </tr>
    </tbody>
  </table>
  <Paginate :page-count="pages"
           :click-handler="getEditorial"
           :prev-text="'Anterior'" :next-text="'Siguiente'"
           :container-class="'pagination'"
           >
           </Paginate>

</template>

<style>

</style>
