<script setup>
import router from '@/router'
import { useRoute } from 'vue-router';
import axios from 'axios';
import {ref,onMounted, nextTick} from 'vue';
import Book from '@/services/Book';
import Editorial from '@/services/Editorial';
import Author from '@/services/Author';

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const route = useRoute();

axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.token;

onMounted( ()=> { getAuthors(),getEditorials(),getBook()});
const id = ref(route.params.id);
const books = ref([]);
const btn = ref(false);
const authorsList = ref([]);
const editorialsList = ref([]);
const book = ref({ name:'', description:'', page_numbers:0, editorial_id:'', author_id:''});

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
const getBook = async () =>{
      await Book.edit(id.value,(data) =>{
        book.value.name=data.data.name;
        book.value.description=data.data.description;
        book.value.page_numbers=data.data.page_numbers;
        book.value.editorial_id=data.data.editorial.id;
        book.value.author_id=data.data.author.id;
      }, (error) => { console.log(error.data.message); });

}
const save = async () =>{
      btn.value=true;
      await Book.update(id.value,book.value,(data) =>{
        router.push({ path: '/books' })
      }, (error) => { btn.value=false; console.log(error);});

}
</script>

<template>
  <form @submit.prevent="save()">
    <div class="mb-3">
      <label class="form-label">Nombre</label>
      <input type="text" v-model="book.name" class="form-control" required>
    </div>
    <div class="mb-3">
      <label class="form-label">Descripción</label>
      <input type="text" v-model="book.description" class="form-control" required>
    </div>
    <div class="mb-3">
      <label class="form-label">No. Paginas</label>
      <input type="text" v-model="book.page_numbers" class="form-control" required>
    </div>

    <div class="mb-3">
      <label class="form-label">Editorial</label>
      <select class="form-select" v-model="book.editorial_id" required>
        <option :value="e.id" v-for="e in editorialsList.data">{{e.name}}</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Autor</label>
      <select class="form-select" v-model="book.author_id" required>
        <option :value="a.id" v-for="a in authorsList.data">{{a.name}}</option>
      </select>
    </div>

    <button type="submit" :disabled="btn" class="btn btn-primary">Guardar</button>
  </form>

</template>

<style>

</style>
