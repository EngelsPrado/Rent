import React, { Component } from 'react';
import MyAnuncios from './MyAnuncios';
import { BrowserRouter, Switch, Route,withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
class MisAnuncios extends Component {

    renderCustomerControl=(isMisAnuncios,isAnunciosSave,dni)=>
    {
         
          //Valida cual de los path es el que entro el usuario
         const CustomerControl= isMisAnuncios ? MyAnuncios: null 
         console.log(CustomerControl)
         return <CustomerControl  tipo={dni} //Le enviamos todas las propiedad
          />   
    
    } 
    renderBody=dni=>{

        return <Route path="/perfil/misAnuncios" children={
   
             ({match:isMisAnuncios})=>(   
                 <Route path="/perfil/anunciosGuardados" children={ 
                     ({match:anunciosGuardados})=>this.renderCustomerControl(isMisAnuncios,anunciosGuardados,dni)} />) 
          }/>
     
     
      }

    render() {
        const {  auth,dni } = this.props;
      //  var obj=JSON.stringify(anuncios)
         console.log(dni)
        return (
            <div>
                {this.renderBody(dni)}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
      //authError: state.auth.authError,
      auth: state.firebase.auth
    }
  }

export default withRouter(connect(mapStateToProps)(MisAnuncios))
