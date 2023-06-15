class Address {

    static get(page, then, error) {
         axios.get('/addresses?page='+page)
         .then(({data}) => then(data))
         .catch(({response}) => error(response));
     }

     static store(data, then, error) {
          axios.post('/addresses', data)
              .then(({data}) => then(data))
              .catch(({response}) => error(response));
      }

      static edit(element, then) {
           axios.get('/addresses/'+ element+'/edit')
               .then(({data}) => then(data))
       }

      static update(element, data, then, error) {
           axios.post('/addresses/'+element, data)
               .then(({data}) => then(data))
               .catch(({response}) => error(response));
       }

    static delete(element, then, error) {
       axios.delete('/addresses/' + element)
           .then(({data}) => then(data))
           .catch(({response}) => error(response));
   }

}

export default Address;
