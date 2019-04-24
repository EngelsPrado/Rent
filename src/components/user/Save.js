import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from 'firebase'
import Auto from '../activos/Auto';

class Save extends Component {
    constructor(props) {
        super(props)
        this.state = {
          a:[] 
        }
    
        this.renderA = this.renderA.bind(this);
        //this.renderB=this.renderB.bind(this);
       // this.getAnuncio=this.getAnuncio.bind(this);
      }
    
    
      componentDidMount()
      {
         this.renderA()
        
      }
       
      renderA()
      {
        const db=firebase.firestore()
        db.collection("user").doc(this.props.auth.uid).collection("guardados").get().then(querySnapshot=>{
          const query=querySnapshot.docs
         
          query && query.map(snap=>{

            db.collection("anuncios").where("id","==",snap.data().ID).get().then(Snap=>{
              //console.log(Snap.docs[0].data())
              const datos=Snap.docs[0].data() 
              this.setState(prevState => ({
                a: [
                    ...prevState.a,
                       datos
                   ]
              }))
            }).catch(err=>{console.log("No hay anuncios guardados")})  


          })

          
      
          }).catch(err=>{console.log("No hay anuncios guardados")})
       
      }

    render() {
        const querySnapshot=this.state.a
        const db=firebase.firestore() 
        
        return (
            <div className="row">
             {
               querySnapshot && querySnapshot.map(datos=>{
                 return <Auto auto={datos} ></Auto>
               })
             }
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

export default connect(mapStateToProps) (Save);