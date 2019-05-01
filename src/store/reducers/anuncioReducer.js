const initState = {}

const anuncioReducer = (state = initState, action) => {
 
  switch (action.type) {
    case 'CREATE_ANUNCIO_SUCCESS':
      console.log('create negocio success');
      return state;
    case 'CREATE_ANUNCIO_ERROR':
      console.log('create negocio error');
      return state;
    default:
      return state;
  }
};

export default anuncioReducer;