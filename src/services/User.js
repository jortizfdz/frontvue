class User {

    static getcsrf(then,error) {
         axios.get('/sanctum/csrf-cookie')
         .then()
         .catch(({response}) => error(response));
     }

     static login(data, then, error) {
          axios.post('/login', data)
              .then(({data}) => then(data))
              .catch((err) => {console.log(err)});
      }
}

export default User;
