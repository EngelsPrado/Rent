const uuidv4 = require('uuid/v4');

export const createAnuncio = (anuncio,url) => {

    return (dispatch, getState, {getFirestore},state) => {
      const firestore = getFirestore();
      const profile = getState().firebase.auth;
      const authorId = getState().firebase.auth.uid;
      const id=uuidv4();
      console.log(anuncio)

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
        createdAt: new Date(),
        urlPhoto:url //url.toString()
      }).then(() => {
        dispatch({ type: 'CREATE_ANUNCIO_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_ANUNCIO_ERROR' }, err);
      });
    }
  };