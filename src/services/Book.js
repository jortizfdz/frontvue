class Book {

  static get(page, then, error) {
       axios.get('/books?page='+page)
       .then(({data}) => then(data))
       .catch(({response}) => error(response));
   }

   static list(then, error) {
        axios.get('/books/list/all')
        .then(({data}) => then(data))
        .catch(({response}) => error(response));
    }
    static search(data, then, error) {
         axios.post('/books/searchBy/all', data)
             .then(({data}) => then(data))
             .catch(({response}) => error(response));
     }

     static store(data, then, error) {
          axios.post('/books', data)
              .then(({data}) => then(data))
              .catch(({response}) => error(response));
      }

      static edit(element, then) {
           axios.get('/books/'+ element)
               .then(({data}) => then(data))
       }

      static update(element, data, then, error) {
           axios.put('/books/'+element, data)
               .then(({data}) => then(data))
               .catch(({response}) => error(response));
       }

    static delete(element, then, error) {
       axios.delete('/books/' + element)
           .then(({data}) => then(data))
           .catch(({response}) => error(response));
   }

}

export default Book;
