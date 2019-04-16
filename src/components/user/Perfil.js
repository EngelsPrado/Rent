import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import './style.css'
import {Link} from 'react-router-dom'
import MisAnuncios from './MisAnuncios';
import MyAnuncios from './MyAnuncios';
import Modal from './Modal';
import Save from './Save';
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
  renderCustomerControl=()=>
  {
      
        //Valida cual de los path es el que entro el usuario
       if(this.state.click1)
         return  <MyAnuncios></MyAnuncios>     
        else
            if(this.state.click2)
              return <Save></Save>     
            else
                return  <Modal></Modal>       
       
      //  console.log(CustomerControl)
      //  return <CustomerControl//Le enviamos todas las propiedad
      //  />   
  
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
              <div className="container-fluid">
                
                <div className="row">
                {/* Div para el lado lateral del perfil */}
                  <div className="col-2 d-flex flex-column ml-3 shadow-sm p-3 mb-5 bg-white rounded">
                     {/* Div para la imagen */}
                    <div >
                    <img src={auth.photoURL} alt="..." class="img-thumbnail"/>  
                    </div>  
                      <h5>{auth.displayName}</h5>  
                    <h6>Tel:{auth.phoneNumber}</h6>
                    <h6>Email:{auth.email}</h6>
                    <button type="button" class="btn btn-primary">Editar perfil</button>
                    <button type="button" onClick={this.renderAnuncios} class="btn btn-info mt-5">Mis anuncios</button> 
                    {/* <Link to='/perfil/misAnuncios' classclassName="btn btn-info mt-5" >Mis anuncios</Link> */}
                    <button type="button" class="btn btn-info mt-5" onClick={this.renderSave}>Anuncios guardados</button>
                    {/* validar que una vez guardado ya no aparezca el boton guardar */}
                  </div> 
                   <div className="col-9">
                      
                        {
                          this.renderCustomerControl()
                        }
                     
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
export default connect(mapStateToProps) (Perfil);