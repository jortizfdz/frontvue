class Author {

    static get(page, then, error) {
         axios.get('/authors?page='+page)
         .then(({data}) => then(data))
         .catch(({response}) => error(response));
     }

     static list(then, error) {
          axios.get('/authors/list/all')
          .then(({data}) => then(data))
          .catch(({response}) => error(response));
      }

     static store(data, then, error) {
          axios.post('/authors', data)
              .then(({data}) => then(data))
              .catch(({response}) => error(response));
      }

      static edit(element, then) {
           axios.get('/authors/'+ element+'/edit')
               .then(({data}) => then(data))
       }

      static update(element, data, then, error) {
           axios.post('/authors/'+element, data)
               .then(({data}) => then(data))
               .catch(({response}) => error(response));
       }

    static delete(element, then, error) {
       axios.delete('/authors/' + element)
           .then(({data}) => then(data))
           .catch(({response}) => error(response));
   }

}

export default Author;
