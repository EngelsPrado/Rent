

export const createAnuncio = (anuncio,id) => {

    return (dispatch, getState, {getFirestore},state) => {
      const firestore = getFirestore();
      const profile = getState().firebase.auth;
      const authorId = getState().firebase.auth.uid;
      console.log(id)

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