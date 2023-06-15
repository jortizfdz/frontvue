<script setup>
import axios from 'axios';
import {ref,onMounted, nextTick} from 'vue';
import Paginate from 'vuejs-paginate-next';
import Author from '@/services/Author';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.token;

onMounted( ()=> { getAuthors(1) });
const authors = ref([]);
const pages = ref(0);

const getAuthors = async (page) =>{
      await Author.get(page, (data) =>{
        authors.value = data;
        pages.value = data.meta.last_page;
      }, (error) => { console.log(error.data.message); });

}
const deleteAuthor = async (id,index) =>{
    await Author.delete(id, (data) =>{ authors.value.data.splice(index,1) }, (error) => { console.log(error.data.message); });

}

</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Email</th>
        <th>Teléfono</th>
        <th>Editorial</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="a,i in authors.data" :key="a.id">
        <td>{{ a.name }}</td>
        <td>{{ a.last_name }}</td>
        <td>{{ a.email }}</td>
        <td>{{ a.phone }}</td>
        <td>{{ a.editorial.name }}</td>
        <td><button type="button" class="btn btn-warning">Editar</button></td>
        <td><button type="button" class="btn btn-danger" @click="deleteAuthor(a.id,i)">Borrar</button></td>
      </tr>
    </tbody>
  </table>
  <Paginate :page-count="pages"
           :click-handler="getAuthors"
           :prev-text="'Anterior'" :next-text="'Siguiente'"
           :container-class="'pagination'"
           >
           </Paginate>

</template>

<style>

</style>
