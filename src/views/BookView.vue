<script setup>
import axios from 'axios';
import {ref,onMounted, nextTick} from 'vue';
import Paginate from 'vuejs-paginate-next';
import Book from '@/services/Book';
import Author from '@/services/Author';
import Editorial from '@/services/Editorial';

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.token;

const books = ref([]);
const booksOld = ref([]);
const authorsList = ref([]);
const editorialsList = ref([]);
const pages = ref(0);
const pagesOld = ref(0);
const filter = ref({ name:'', editorial_id:'', author_id:''});
onMounted( ()=> { getBooks(1),getAuthors(),getEditorials(); });

const getAuthors = async () =>{
      await Author.list((data) =>{
        authorsList.value = data;
      }, (error) => { console.log(error.data.message); });
}
const getEditorials = async () =>{
      await Editorial.list((data) =>{
        editorialsList.value = data;
      }, (error) => { console.log(error.data.message); });

}
const getBooks = async (page) =>{
      await Book.get(page, (data) =>{
        books.value = data;
        booksOld.value = data;
        pages.value = data.meta.last_page;
        pagesOld.value = data.meta.last_page;
      }, (error) => { console.log(error.data.message); });
}
const deleteBook = async (id,index) =>{
    await Book.delete(id, (data) =>{ books.value.data.splice(index,1) }, (error) => { console.log(error.data.message); });
}
const searchFilter = async () =>{
    await Book.search(filter.value, (data) =>{
      books.value = data;
      pages.value = data.meta.last_page;
    }, (error) => { console.log(error.data.message); });
}
const cleanFilter = async () =>{
    books.value = booksOld.value;
    pages.value = pagesOld.value ;
}

</script>

<template>
  <div class="col-10">
      <div class="row">
        <div class="col-3">
          <button type="button" class="btn btn-dark" @click="cleanFilter()">Limpiar Filtros</button>
        </div>
        <div class="col-3">
          <input type="text" v-model="filter.name" class="form-control" placeholder="Nombre del Libro" @change="searchFilter()">
        </div>

        <div class="col-3">
          <div class="form-floating">
            <select class="form-select" v-model="filter.editorial_id" id="floatingSelect" @change="searchFilter()">
              <option :value="e.id" v-for="e in editorialsList.data">{{e.name}}</option>
            </select>
            <label for="floatingSelect">Seleccione un Editorial</label>
           </div>
        </div>

        <div class="col-3">
          <div class="form-floating">
            <select class="form-select" v-model="filter.author_id" id="floatingSelect2" @change="searchFilter()">
              <option :value="a.id" v-for="a in authorsList.data">{{a.name}}</option>
            </select>
            <label for="floatingSelect2">Seleccione un Author</label>
          </div>
        </div>
      </div>
  </div>
  <div class="col-2">
    <RouterLink to="/books/create" class="btn btn-primary btn-lg">Nuevo</RouterLink>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>No. Páginas</th>
        <th>Descripción</th>
        <th>Editorial</th>
        <th>Autor</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="b,i in books.data" :key="b.id">
        <td>{{ b.name }}</td>
        <td>{{ b.page_numbers }}</td>
        <td>{{ b.description }}</td>
        <td>{{ b.editorial.name }}</td>
        <td>{{ b.author.name }}</td>
        <td><RouterLink :to="{path:'/books/edit/'+b.id}" class="btn btn-warning">Editar</RouterLink></td>
        <td><button type="button" class="btn btn-danger" @click="deleteBook(b.id,i)">Borrar</button></td>
      </tr>
    </tbody>
  </table>
  <Paginate :page-count="pages"
           :click-handler="getBooks"
           :prev-text="'Anterior'" :next-text="'Siguiente'"
           :container-class="'pagination'"
           >
           </Paginate>

</template>

<style>

</style>
