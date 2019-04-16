import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateBus from './../Formulario'
import IniciaSesion from '../IniciaSesion';
import './../style.css'
import firebase from 'firebase'
import {createAnuncio} from './../../store/actions/anuncioAction'


class Publicar extends Component {

    //handleBack=()=>{ this.props.history.goBack() }
    handleSubmit=(value)=>{
        console.log(value)
         
         const storageRef = firebase.storage().ref();
         const mountainsRef = storageRef.child(`Anuncios/${value.photo[0].name}`);
       
         const uploadTask= mountainsRef.put(value.photo[0])
        
       uploadTask.on('state_changed', function(snapshot){
            //        Observe state change events such as progress, pause, and resume
            //        Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                 
                 }, function(error) {
                   // Handle unsuccessful uploads
                  }, function() {
                   // Handle successful uploads on complete
            //       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                   uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                     console.log('File available at', downloadURL);
                       getURL(downloadURL);
                      // var urls=downloadURL;             
                   });
                   })
                   
        console.log(`${this.urls}`)
        const getURL=(url)=>this.props.createAnuncio(value,url)   
        this.props.history.push(`/anuncios/${value.clasificacion}`);
    }

    render() {

        const { auth } = this.props;
        
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
      auth: state.firebase.auth
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      createAnuncio: (value,url) => dispatch(createAnuncio(value,url))
    }
  }


export default  connect(mapStateToProps,mapDispatchToProps)( Publicar);