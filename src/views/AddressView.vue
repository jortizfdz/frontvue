<script setup>
import axios from 'axios';
import {ref,onMounted, nextTick} from 'vue';
import Paginate from 'vuejs-paginate-next';
import Address from '@/services/Address';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.token;

onMounted( ()=> { getAddresses(1) });
const addresses = ref([]);
const pages = ref(0);

const getAddresses = async (page) =>{
      await Address.get(page, (data) =>{
        addresses.value = data;
        pages.value = data.meta.last_page;
      }, (error) => { console.log(error.data.message); });

}
const deleteAddress = async (id,index) =>{
    await Address.delete(id, (data) =>{ addresses.value.data.splice(index,1) }, (error) => { console.log(error.data.message); });

}

</script>

<template>
  <table class="table">
    <thead>
      <tr>
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
      <tr v-for="ad,i in addresses.data" :key="ad.id">
        <td>{{ ad.street_name }}</td>
        <td>{{ ad.exterior_number }}</td>
        <td>{{ ad.interior_number }}</td>
        <td>{{ ad.zip }}</td>
        <td>{{ ad.reference }}</td>
        <td><button type="button" class="btn btn-warning">Editar</button></td>
        <td><button type="button" class="btn btn-danger" @click="deleteAddress(ad.id,i)">Borrar</button></td>
      </tr>
    </tbody>
  </table>
  <Paginate :page-count="pages"
           :click-handler="getAddresses"
           :prev-text="'Anterior'" :next-text="'Siguiente'"
           :container-class="'pagination'"
           >
           </Paginate>

</template>

<style>

</style>
