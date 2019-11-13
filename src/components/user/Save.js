import React, { Component,useState,useEffect,useContext } from 'react';
import Auto from '../activos/Auto';
import { firestore } from '../../firebase';
import {UserContext} from './../../Providers/UserProvider'



const Save =()=> {
   
      const [a,setA]=useState([])
      const user = useContext(UserContext);
    

      useEffect(()=>{

        const renderA=()=>
        {
          
           if(user){
            firestore.collection("user").doc(user.uid).collection("guardados").where("estado","==",true).get().then(querySnapshot=>{
              const query=querySnapshot.docs
             console.log(query)
              query && query.map(snap=>{
    
                firestore.collection("anuncios").where("id","==",snap.data().ID).get().then(Snap=>{
                  //console.log(Snap.docs[0].data())
                  const datos=Snap.docs[0].data() 
                  console.log(datos)
                 setA([...a,datos])
                }).catch(err=>{console.log("No hay anuncios guardados")})  
    
    
              })
    
              
          
              }).catch(err=>{console.log("No hay anuncios guardados")})
           }
         
        }

        renderA()

      },[user])
       
   

         console.log(a)
     
        
        return (
            <div className="row">
             {
               a && a.map(datos=>{
                 return <Auto auto={datos} auth={user}></Auto>
               })
             }
            </div>
        );
  
}

export default  Save