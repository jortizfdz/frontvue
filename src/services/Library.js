class Library {

    static get(page, then, error) {
         axios.get('/libraries?page='+page)
         .then(({data}) => then(data))
         .catch(({response}) => error(response));
     }

     static list(then, error) {
          axios.get('/libraries/list/all')
          .then(({data}) => then(data))
          .catch(({response}) => error(response));
      }

     static store(data, then, error) {
          axios.post('/libraries', data)
              .then(({data}) => then(data))
              .catch(({response}) => error(response));
      }

      static edit(element, then) {
           axios.get('/libraries/'+ element+'/edit')
               .then(({data}) => then(data))
       }

      static update(element, data, then, error) {
           axios.post('/libraries/'+element, data)
               .then(({data}) => then(data))
               .catch(({response}) => error(response));
       }

    static delete(element, then, error) {
       axios.delete('/libraries/' + element)
           .then(({data}) => then(data))
           .catch(({response}) => error(response));
   }

}

export default Library;
