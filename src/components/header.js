import React, { Component } from 'react';
import firebase from 'firebase';
import { getFirestore } from 'redux-firestore';
import {connect} from 'react-redux'
import {NavLink,Link} from 'react-router-dom'
import SignedInLinks from './../layout/signedInLink'
import IniciaSesion from './IniciaSesion';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
  
      noti:[]
    };

    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }
   
   componentDidMount(){

    const db=firebase.firestore();

    db.collection("user").doc(this.props.auth.uid).collection("bandeja").onSnapshot(snap=>{
      console.log(snap)

      this.setState(prevState => ({
        noti: [
           
               snap
           ]
          
      }))

    })

   }

    render() {

        const { auth } = this.props;
        const array=this.state.noti
        const link=auth.uid ? <SignedInLinks profile={auth} ></SignedInLinks> : <IniciaSesion></IniciaSesion>

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
                     <div>
                       {link}
                     </div>
                
                      <div className="dropdown align-self-center m-2">
                          <button className="btn btn-info dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="far fa-paper-plane"></i>
                          </button>
                          <div className ="dropdown-menu" aria-labelledby="dropdownMenuButton">
                           {
                             array.map(msj=>{
                              return msj.docs.map(m=>{
                                console.log(m.data())
                                
                                var user=m.data()
                                return <Link to={`/chat/${user.id}`} ><small>{user.content}</small> </Link>
                                
                              })
            
                            })
                           }
                          </div>
                      </div>
                
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
           

