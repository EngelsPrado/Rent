import React, { Component } from 'react';
import { firestore } from './../firebase';

import {NavLink,Link} from 'react-router-dom'
import SignedInLinks from './../layout/signedInLink'
import IniciaSesion from './IniciaSesion';
import './style.css'
import moment from 'moment'



class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
  
      noti:[]
    };

    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
   // this.Hit=this.Hit.bind(this)
  }
   
  /* componentWillMount(){



     firestore.collection("user").doc(this.props.auth.uid).collection("bandeja").onSnapshot(snap=>{
      console.log(snap)

      this.setState(prevState => ({
        noti: [
           
               snap
           ]
          
      }))

    })

   }

   */

    render() {

      //  const { auth } = this.props;
      
       // const array=this.state.noti
      //  const link=auth.uid ? <SignedInLinks profile={auth} ></SignedInLinks> : <IniciaSesion></IniciaSesion>

        return (
            <div className="sticky-top nav">

            

             <div className="container-fluid justify-content-between shadow  mb-3 rounded nav2" >
                 
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

              
                  <div className="d-flex flex-row">
                     
                
                      <div className="dropdown align-self-center m-2">
                          <button className="btn dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="far fa-paper-plane"></i>
                          </button>

                          <div className ="dropdown-menu" aria-labelledby="dropdownMenuButton">
                           {/* 
                             array.map(msj=>{
                              return msj.docs.map(m=>{
                            
                                var user=m.data()
                           
                                return(
                                  <Link class="card "  style={{ textDecoration: 'none',color:'black'}} to={`/chat/${user.id}`}>
                                    <div class="card-body">
                                    <img  width='45' className="rounded-circle d-inline"  src={user.photo}></img>
                                    <h5 class="card-title chat-box d-inline ml-1
                                    ">{user.name}</h5>
                                     
                                      <p class="card-text chat-box"><small>{user.content}</small></p>
                                      <h6 class="card-subtitle mb-2 text-muted chat-box">{moment(user.createdAt.toDate()).format('LT') }</h6>
                                    </div>
                                </Link> 

                                ) 
                                
                    
                                
                              })
            
                            })
                            */
                           }
                          </div>
                          
                      </div>
                      <div>
                       {/* {link} */}
                     </div>
                    <NavLink  to="/publicar"  className=" btn  text-white p-3 ml-2 h-50 "> + Publica</NavLink> 
                  </div>
                   
                </nav>
                     
                
            
             
             </div>

            </div>
        );
    }
}

export default Header
           

