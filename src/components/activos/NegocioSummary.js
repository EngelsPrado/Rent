import React, { Component } from 'react';
import anuncios from './anuncios';
import Auto from './Auto';

class AnuncioSummary extends Component {

   renderBody=(anuncio,tipo)=>{

    if(tipo==="bienRaiz")
    {  
       return anuncio.bienRaiz.map(anuncio=>{
            return <Auto auto={anuncio} key={anuncio.id}></Auto>
          })  
    }else  
        { 
          if(tipo==="auto")
          {
            return anuncio.auto.map(anuncio=>{
              return <Auto auto={anuncio} key={anuncio.id}></Auto>
            }) 
          }

        }
   }

    render() {

        const {anuncio,tipo}=this.props
        console.log(tipo);
        return (
            <div className="row">
                
             {
               this.renderBody(anuncio,tipo)

             }
        
            </div>
        );
    }
}

export default AnuncioSummary;