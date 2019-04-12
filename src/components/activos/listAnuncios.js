import React, { Component } from 'react';
import AnuncioSummary from './NegocioSummary';

class ListAnuncios extends Component {
  
    render() {
        const {anuncios,tipo}=this.props
       // const anuncio= anuncios?Object.values(anuncios):null 
       console.log(anuncios) 
        return (
         
                <div>
                 
                {
                 
                    anuncios && anuncios.map(anuncio=>{
                       return <AnuncioSummary anuncio={anuncio} tipo={tipo} key={anuncio.id} ></AnuncioSummary>
                    })
                }
                
              </div>
        
        );
    }
}


export default ListAnuncios;