import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateBus from './../Formulario'
import IniciaSesion from '../IniciaSesion';
import './../style.css'
import firebase from 'firebase'
import {createAnuncio} from './../../store/actions/anuncioAction'
import {createUrl} from './../../store/actions/fotoAction'


const uuidv4 = require('uuid/v4');

//Guardar varias fotos

class Publicar extends Component {
   
   
   state={
     array:[]
   }
      
    handleBack=()=>{ this.props.history.goBack() }
    handleOnSubmitSuccess = () => {
      this.props.history.goBack();
  }
    handleSubmit=(value)=>{
        
         
         const storageRef = firebase.storage().ref();
         
         const array=value.photo;
         var uploadTask=[];
        
         const id=uuidv4();
         console.log(id)
         for (var i = 0; i < array.length; i++) {
         
          const mountainsRef = storageRef.child(`Anuncios/${this.props.auth.uid}/${array[i].name}-${uuidv4()}`);
           uploadTask= [...uploadTask,mountainsRef.put(array[i])]
         
         }


         
           this.props.createUrl(uploadTask,id)               
          this.props.createAnuncio(value,id)   
          
           
    }

    render() {

        const { auth,url} = this.props;
        const aviso= auth.uid ? <CreateBus 
        onSubmitSuccess={this.handleOnSubmitSuccess}
        onSubmit={this.handleSubmit}
        onBack={this.handleBack}></CreateBus> : <IniciaSesion></IniciaSesion>
        
         
        return (
            <div className="container publica  d-flex justify-content-center">
                  {aviso}
                    
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
     // authError: state.auth.authError,
      auth: state.firebase.auth,
      url:state.urlReducer
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      createAnuncio: (value,id) => dispatch(createAnuncio(value,id)),
      createUrl:(urlF,id)=> dispatch(createUrl(urlF,id)) 
    }
  }


export default  connect(mapStateToProps,mapDispatchToProps)( Publicar);