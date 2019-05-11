import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect,Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.css'
import BienRaiz from './bienRaiz';
import Coches from './coches';
import { BrowserRouter, Switch, Route,withRouter } from 'react-router-dom'
import Nav from './Nav';

class Anuncios extends Component {

  constructor(props)
  {
    super(props)

    this.state={

    }

  }   

  renderCustomerControl=(isHogar,isAuto,dni)=>
  {
      
        //Valida cual de los path es el que entro el usuario
       const CustomerControl= isAuto ? Coches : BienRaiz
       console.log(CustomerControl)
       return <CustomerControl  tipo={dni} //Le enviamos todas las propiedad
        />   
  
  } 


   renderBody=dni=>{

        return <Route path="/anuncios/bienRaiz" children={
   
             ({match:isHogar})=>(   
                 <Route path="/anuncios/auto" children={ 
                     ({match:isAuto})=>this.renderCustomerControl(isHogar,isAuto,dni)} />) 
          }/>
     
     
      }


    render() {
        const {  auth,dni } = this.props;
      //  var obj=JSON.stringify(anuncios)
         console.log(dni)
        
        return (
            <div className="container-fluid">
              <Nav></Nav>   

               {this.renderBody(dni)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      //anuncios: state.firestore.ordered.anuncios,
     // autos: state.firestore.ordered.auto,
     // user: state.firestore.ordered.user,
    }
  }

 export default withRouter(connect(mapStateToProps)(Anuncios))
