import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { getFirestore } from 'redux-firestore';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

class IniciaSesion extends Component {

    state = {
        isSignedIn:false
      }

    componentDidMount=()=>{
        firebase.auth().onAuthStateChanged(user=>{
          this.setState({
            isSignedIn:!!user,
         })
     
         if(user )
         {
          const db=getFirestore(); 
          const userRef=db.collection("user").doc(user.uid).collection("datos") 
          
          userRef.set({
             name: user.displayName,
             email: user.email,
             uid: user.uid
         })
         .then(function() {
             console.log("User successfully written!");
         })
         .catch(function(error) {
             console.error("Error writing document: ", error);
         });
         }
   
        })
      }

    uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'http://localhost:3000/publicar',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>',
        // Privacy policy url.
        privacyPolicyUrl: '<your-privacy-policy-url>'
      };
    render() {
        const {  auth } = this.props;
   
        if (auth.uid || this.state.isSignedIn) return <Redirect to='/' /> 
        return (
            <div className="dashboard container mt-3">
                <button type="button" class="btn btn-primary " data-toggle="modal" data-target="#exampleModalCenter">
                  Inicia Sesion!
                </button>


          <div class="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content ">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle">Elige una opcion</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div className="col s12 m6">
                        <StyledFirebaseAuth className="ui" uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}></ StyledFirebaseAuth>
                </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                 
                </div>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps) (IniciaSesion);