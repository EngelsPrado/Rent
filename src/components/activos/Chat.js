import React, { Component } from 'react';
import { Field, reduxForm ,reset} from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import { link } from 'fs';
import './style.css'
import moment from 'moment'



class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
          value: '',
          mensajes:[],
          parar:false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       // this.scroll=this.scroll.bind(this)
     //   this.mouseOver=this.mouseOver.bind(this)
       //  this.mouseOut=this.mouseOut.bind(this)

        
      }

     componentDidMount(){

    

      const db=firebase.firestore();
      var link;
      if(this.props.auth.uid<this.props.dni)
         link= this.props.auth.uid+this.props.dni;
      else 
           link=this.props.dni+this.props.auth.uid;
       if(this.props.auth.uid!==this.props.dni)
       {
        //Ver los mensajes que tengo con ese usuario 
        db.collection("soporte").doc(link).collection("chats").orderBy("createdAt").onSnapshot(snap=>{

          document.getElementById('chat').scrollTop=document.getElementById('chat').scrollHeight
          this.setState(prevState => ({
            mensajes: [
               
                   snap
               ]
              
          }))
               
        })
       }
      
      }
 
       

      handleSubmit(value) {
         

        const db=firebase.firestore();
        const content=this.state.value;
        var link;
        this.setState({
          value:''
        })
        if(this.props.auth.uid<this.props.dni)
           link= this.props.auth.uid+this.props.dni;
        else 
             link=this.props.dni+this.props.auth.uid;

        db.collection("soporte").doc(link).collection("chats").add({
         content,
         enviado:this.props.auth.uid,
         recibido:this.props.dni,
         createdAt: new Date(),
        
        })
        
        //Enviar una notificacion al usuario que se le esta enviando un mensaje 
        db.collection("user").doc(this.props.auth.uid).collection("bandeja").doc(this.props.dni).set({
           content,
           createdAt: new Date(),
           id:this.props.dni,
           name:this.props.auth.displayName,
           photo:this.props.auth.photoURL
        })
        db.collection("user").doc(this.props.dni).collection("bandeja").doc(this.props.auth.uid).set({
          content,
          createdAt: new Date(),
          id:this.props.auth.uid,
          name:this.props.auth.displayName,
          photo:this.props.auth.photoURL
       })
        
       
      }
   
      handleChange(event) {
         
        this.setState({value: event.target.value});
      }



  componentDidUpdate(){
    document.getElementById('chat').scrollTop=document.getElementById('chat').scrollHeight
  }

    
    render() {

        const {  auth,dni } = this.props;
        const { handleSubmit, pristine, reset, submitting } = this.props
        const array=this.state.mensajes
        return (
            <div className="d-flex container-fluid row bg-chat">
                {/* <div className="col-3 bg-light border border-secondary">
                  
                  
                
                </div>    */}
                <div className="col-12 chat  ml-5" id="chat"   > 
                  {
                    array.map(msj=>{
                      return msj.docs.map(m=>{
                       
                        
                        var user=m.data()
                        if(user.enviado==auth.uid)
                          return (

                            <div className="col-12">
                              
                              <div class="card ml-auto shadow-sm p-3  bg-light">
                               
                              <div class="card-body rounded ">
                              <p className="text-left font-weight-normal text-dark" >{user.content} </p>
                              </div>
                              <small className="ml-auto text-secondary">{moment(user.createdAt.toDate()).format('LT') }</small> 
                              </div>  
                            </div>  

                          )  
                        else{
                        
                          return (
                            <div className="col-12 ">
                            <div class="card justify-content-start .bg-white mr-auto rounded ">
                              <div class="card-body">
                               <p className="text-left font-weight-normal text-dark " >{user.content} </p>
                              </div>
                              <small className="ml-auto text-secondary">{moment(user.createdAt.toDate()).format('LT') }</small>
                            </div>  

                            </div>  

                          ) 
                        }
                        
                      })

                    })


                  } 
                </div>
            
                 <div className="col-12 mt-2 border-top-2">
                 <form  onSubmit={handleSubmit(this.handleSubmit)} className="row mr-5">
                       <Field name="mensaje" type="text" 
                              component="text" className="col-lg-6 col-sm-12 ml-auto">
                                    <div class="input-group mb-3 w-30">

                                    <input aria-describedby="inputGroup-sizing-default"  id="mensaje" type="text" class="form-control rounded " aria-label="Sizing example input" autocomplete="off" id="txtMensaje" placeholder="Escribe tu mensaje aquí" value={this.state.value} onChange={this.handleChange}  autoFocus/>
                                    <button  type="submit" onClick={reset}  class="btn btn-primary ml-2 h-25 w-7"><i class="far fa-paper-plane"></i></button>
                                      
                                    </div>
                              
                       </Field>
                      
                        
                  </form>  
                    
                    
                 </div>      
            

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,

    }
  }

  export default compose(
    connect(mapStateToProps),
    reduxForm({
      form: 'simple',
       // a unique identifier for this form   
    })
  )(Chat)