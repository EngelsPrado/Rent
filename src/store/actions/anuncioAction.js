
import index from './../../config/Alg'

export const createAnuncio = (anuncio,id) => {

    return (dispatch, getState, {getFirestore},state) => {
      const firestore = getFirestore();
      const profile = getState().firebase.auth;
      const authorId = getState().firebase.auth.uid;
      console.log(id)
      index
      .saveObject({...anuncio,id,objectID:id,authorId, user:profile.displayName,estado:false,
        createdAt: Math.round((new Date()).getTime() / 1000)})
      .then(() => {
        console.log('Contacts imported into Algolia');
      })
      .catch(error => {
        console.error('Error when importing contact into Algolia', error);
  
      }); 
      
      firestore.collection('anuncios').doc(id).set({
        user:profile.displayName,
        id,
        email:profile.email,
        authorId,
        titulo:anuncio.titulo,
        telefono:anuncio.telefono,
        direccion:anuncio.direccion,
        descripcion:anuncio.descripcion,
        tipoAnuncio:anuncio.clasificacion,
        departamento:anuncio.departamento,
        estado:false,
        createdAt: Math.round((new Date()).getTime() / 1000)
       // f1,
      //  f2,
       // f3
        //urlPhoto:JSON.stringify(urlFotos) //url.toString()
      }).then(() => {
        dispatch({ type: 'CREATE_ANUNCIO_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_ANUNCIO_ERROR' }, err);
      });
    }
  };