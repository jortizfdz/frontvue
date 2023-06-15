import { createRouter, createWebHistory, useRouter } from 'vue-router'
import authMiddleware from './middleware'

import Book from '@/views/BookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Book
    },
    {
     path: '/login',
     name: 'login',
     component: () => import('@/views/Login.vue')
   },
    {
      path: '/books',
      name: 'books',
      component: Book
    },
    {
      path: '/books/create',
      name: 'books.create',
      component: () => import('@/views/BookCreateView.vue')
    },
    {
      path: '/books/edit/:id',
      name: 'books.edit',
      component: () => import('@/views/BookEditView.vue')
    },
    {
      path: '/libraries',
      name: 'libraries',
      component: () => import('@/views/LibraryView.vue')
    },
    {
      path: '/authors',
      name: 'authors',
      component: () => import('@/views/AuthorView.vue')
    },
    {
      path: '/editorials',
      name: 'editorials',
      component: () => import('@/views/EditorialView.vue')
    },
    {
      path: '/addresses',
      name: 'addresses',
      component: () => import('@/views/AddressView.vue')
    },
  ]
})
router.beforeEach(authMiddleware)

export default router
