import React, { Component } from 'react';
import firebase from 'firebase';
import { getFirestore } from 'redux-firestore';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import SignedInLinks from './../layout/signedInLink'

class Header extends Component {
    render() {

        const { auth } = this.props;

        const link=auth.uid ? <SignedInLinks profile={auth} ></SignedInLinks> : null 

        return (
            <div className="bg-light sticky-top nav">
                          
             <div className="container-fluid justify-content-between shadow  mb-3 rounded" >
                 
               <nav className="d-flex navbar">
                 <div className="dropdown align-self-center">
                    <button className="btn btn-info dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Menu
                    </button>
                    <div className ="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>

                <a className="navbar-brand align-self-center "  href="/">
                    <img  src="https://firebasestorage.googleapis.com/v0/b/rent-me-165ca.appspot.com/o/Fotos%20del%20proyecto%2Flogo.png?alt=media&token=c105d935-eb74-400d-9a8a-7115ceb0653d" width="70" height="70" className="d-inline-block align-top " alt="logo"/>
                
                 </a>    
 
                  <div className="d-flex flex-row">
                     {link}

                    <NavLink  to="/publicar"  className=" btn btn-light text-black p-3 ml-2"> + Publica</NavLink> 
                  </div>
                   
                </nav>
                     
                
            
             
             </div>

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


export default connect(mapStateToProps)(Header);
           

