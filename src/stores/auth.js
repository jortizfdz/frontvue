import router from '@/router'
import {defineStore} from 'pinia';
import User from '@/services/User';

export const useAuthStore = defineStore('auth',{
    state: () => ({ apiToken: null, isLoggedUser:false }),
    getters:{
        token:(state) => state.apiToken,
        isLogged:(state) => state.isLoggedUser
    },
    actions:{
      async getCsrf(){
          await User.getcsrf({},(error) => { console.log(error); });
      },
        async login({email, password}){
          await User.login({email,password,device_name:'web'}, (data) =>{
            this.apiToken = data;
            this.isLoggedUser = true;
            router.push({ name: 'books' })
          }, (error) => { console.log(error.response.data.message); });
        },
    },
    persist:true
});
