class Editorial {

  static get(page, then, error) {
       axios.get('/editorials?page='+page)
       .then(({data}) => then(data))
       .catch(({response}) => error(response));
   }

   static list(then, error) {
        axios.get('/editorials/list/all')
        .then(({data}) => then(data))
        .catch(({response}) => error(response));
    }

     static store(data, then, error) {
          axios.post('/editorials', data)
              .then(({data}) => then(data))
              .catch(({response}) => error(response));
      }

      static edit(element, then) {
           axios.get('/editorials/'+ element+'/edit')
               .then(({data}) => then(data))
       }

      static update(element, data, then, error) {
           axios.post('/editorials/'+element, data)
               .then(({data}) => then(data))
               .catch(({response}) => error(response));
       }

    static delete(element, then, error) {
       axios.delete('/editorials/' + element)
           .then(({data}) => then(data))
           .catch(({response}) => error(response));
   }

}

export default Editorial;
