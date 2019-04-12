import firebase from 'firebase'
import AnuncioSummary from './NegocioSummary';
import Auto from './Auto';

export default class Objeto {
    constructor () {
      this.datos ={};
    
    }
    
    // Método
    enlistar () {
        this.db=firebase.firestore()
  
        this.db.collection("anuncios").doc("categorias").collection("bienRaiz").get().then(querySnapshot=>{
            querySnapshot && querySnapshot.forEach(function(doc) {
              console.log(doc.data())
              const me = Object.create(doc);
              console.log(me)
             })  

            })
           
    }
 
}