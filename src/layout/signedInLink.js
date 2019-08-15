import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from './../store/actions/authAction'

const SignedInLinks = (props) => {

  return (
    <div className="d-flex flex-row">
     
      {/* <li><NavLink to='/register' className="btn btn-info">Registrar Negocio</NavLink></li> */}
        
        <div className="dropdown right self-align-center" >
           
           <button class="btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  
               <img  width='45'  src={props.profile.photoURL}></img>
 
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <NavLink className="dropdown-item" to='/perfil'>Mi perfil</NavLink>
          <button onClick={props.signOut} type="button" class="btn btn-secondary">Cerrar Sesiónn</button>
          </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)