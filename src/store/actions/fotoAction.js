import firebase from 'firebase'
import index from './../../config/Alg'

export const createUrl = (uploadTask,id) => {
    const db=firebase.firestore()

    return (dispatch, getState, {getFirestore},state) => {
      var a=[];

      uploadTask.forEach( (element) => {
        element.on('state_changed', function(snapshot){
               }, function(error) {
                 // Handle unsuccessful uploads
                }, function() {
                     console.log(id)
                    element.snapshot.ref.getDownloadURL().then(downloadURL=> {
                         a=[...a,downloadURL]
                         db.collection("urlFotos").doc(id).set({
                           urlPhoto:a
                         })
                         index.partialUpdateObject({photo:a,objectID:id}, (err, content) => {
                          if (err) throw err;
                          
                          console.log(content);
                        }); 
                    });
                 })
     });  
       
     dispatch({ type: 'CREATE_URL_SUCCESS' });
    }
  };