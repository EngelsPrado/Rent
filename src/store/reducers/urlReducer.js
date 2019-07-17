const initState = {}

const urlReducer = (state = initState, action) => {
 
  switch (action.type) {
    case 'CREATE_URL_SUCCESS':
      console.log('create url success');
      return state;
    case 'CREATE_URL_ERROR':
      console.log('create negocio error');
      return state;
    default:
      return state;
  }
};

export default urlReducer;