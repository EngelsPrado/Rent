import React, {useState,useContext } from 'react';

import CreateBus from './../Formulario'
import IniciaSesion from '../IniciaSesion';
import './../style.css'
import { storage, firestore } from '../../firebase';
import {UserContext} from './../../Providers/UserProvider'
import index from './../../config/Alg'
import Login from '../InicioSesion/Login';
const uuidv4 = require('uuid/v4');

//Guardar varias fotos

const Publicar =()=> {

  const user = useContext(UserContext);
   const [array,setArray]=useState([])

   const handleSubmit=(value)=>{
        
         console.log(value)
    ;
         const storageRef =  storage.ref();
         const authorId=user.uid
         setArray(value.photo)
         var uploadTask=[];
        
         const id=uuidv4();
         console.log(id)
         for (var i = 0; i < array.length; i++) {
         
          const mountainsRef = storageRef.child(`Anuncios/${user.uid}/${array[i].name}-${uuidv4()}`);
           uploadTask= [...uploadTask,mountainsRef.put(array[i])]
         
         }


         
         //  this.props.createUrl(uploadTask,id)     
           
           var a=[];

           uploadTask.forEach( (element) => {
             element.on('state_changed', function(snapshot){
                    }, function(error) {
                      // Handle unsuccessful uploads
                     }, function() {
                          console.log(id)
                         element.snapshot.ref.getDownloadURL().then(downloadURL=> {
                              a=[...a,downloadURL]
                              firestore.collection("urlFotos").doc(id).set({
                                urlPhoto:a
                              })
                              index.partialUpdateObject({photo:a,objectID:id}, (err, content) => {
                               if (err) throw err;
                               
                               console.log(content);
                             }); 
                         });
                      })
          });  
            
           
        //  this.props.createAnuncio(value,id)   
          index
          .saveObject({...value,id,objectID:id,authorId, user:user.displayName,estado:false,
            createdAt: Math.round((new Date()).getTime() / 1000)})
          .then(() => {
            console.log('Contacts imported into Algolia');
          })
          .catch(error => {
            console.error('Error when importing contact into Algolia', error);
      
          }); 
          
          
            firestore.collection('anuncios').doc(id).set({
            user:user.displayName,
            id,
            email:user.email,
            authorId,
            titulo:value.titulo,
            telefono:value.telefono,
            direccion:value.direccion,
            descripcion:value.descripcion,
            tipoAnuncio:value.clasificacion,
            departamento:value.departamento,
            estado:false,
            createdAt: Math.round((new Date()).getTime() / 1000)
           // f1,
          //  f2,
           // f3
            //urlPhoto:JSON.stringify(urlFotos) //url.toString()
          })
          
           
    }


      
        const aviso=user&& user.uid ? <CreateBus 
       // onSubmitSuccess={this.handleOnSubmitSuccess}
        onSubmit={handleSubmit}
       ></CreateBus> : <Login></Login>
        
         
        return (
            <div className="container publica  d-flex justify-content-center">
                  {aviso}
                    
            </div>
        );
    
}


export default  Publicar