import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import './style.css'
import {Link} from 'react-router-dom'
import MisAnuncios from './MisAnuncios';
import MyAnuncios from './MyAnuncios';
import Modal from './Modal';
import Save from './Save';
import Nav from '../activos/Nav';
class Perfil extends Component {

   state={
    click1:false,
    click2:false
   } 

  renderAnuncios=()=>{
    this.setState({
      click1:true,
      click2:false
    })    

  } 

  
  renderSave=()=>
  {
      
    this.setState({
      click1:false,
      click2:true
    })    
  
  } 
    render() {

      const {  auth } = this.props;

       
        if (!auth.uid) return <Redirect to='/' /> 
        return (
            <div>
              <div className="container-fluid ">
                
                <div className="row">
{/*               
                <div className="col-12">
                 <Nav></Nav>
                </div>
                  <div className="col-12 d-flex flex-column ml-3 shadow-sm p-3 mb-5 bg-white rounded">
               
                    <div >
                    <img src={auth.photoURL} alt="..." class="img-thumbnail"/>  
                    </div>  
                      <h5>{auth.displayName}</h5>  
                    <h6>Tel:{auth.phoneNumber}</h6>
                    <h6>Email:{auth.email}</h6>
                    <button  type="button" class="btn btn-primary w-25">Editar perfil</button>

                  </div>  */}

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
export default connect(mapStateToProps) (Perfil);