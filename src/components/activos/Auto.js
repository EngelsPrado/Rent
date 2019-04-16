import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from 'firebase'


class Auto extends Component {
    
  state={
    className:'btn btn-info',
  }
  //Pendiendte
  componentDidMount()
  {
    const db=firebase.firestore() 
    if(this.props.auth.uid==this.props.auto.authorId)//Mis anuncios no tendran opcion de guardar
    {
      this.setState({
        className:'invisible'
      })
    }
    //Validamos que el anuncio que guardamos no aparezca su opcion de guardar otra veeeez
    db.collection("user").doc(this.props.auth.uid).collection("guardados").where("ID","==",this.props.auto.id).get().then(snap=>{
      const datos=snap.docs[0].data()
      console.log(datos)
      if(datos.estado==true)
      {
        this.setState({
          className:'invisible'
        })
      }
    })
  }   

   guardar=()=>{
     
    this.setState({
      className:'invisible'
    })
    const db=firebase.firestore()
    //console.log(this.props.auto.titulo)
    db.collection("user").doc(this.props.auth.uid).collection("guardados").doc(this.props.auto.id).set({
      ID:this.props.auto.id,
      estado:true,
      createdAt: new Date()
  })
  .then(function() {
      console.log("Document successfully written!");
    
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
     
   }
    
    render() {
        const {auto}=this.props;
      //  console.log(auto)
        return (
            <div className="ml-5 col-3" >

              <div class="card">
                <img class="card-img-top" src={auto.urlPhoto} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">{auto.titulo}</h5>
                    <p class="card-text">{auto.descripcion}</p>
                    <div>
                    <a href="#" class="btn btn-primary">Ver mas detalles</a>
                    <button type="button" className={this.state.className} onClick={this.guardar}>Guardar</button>
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
export default connect(mapStateToProps) (Auto); 