import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from 'firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

class Auto extends Component {
    
  state={
    className:'btn btn-info',
    btn:'btn btn-warning invisible'
  }
  //Pendiendte
  componentDidMount()
  {
    const db=firebase.firestore() 
    if(this.props.auth.uid==this.props.auto.authorId)//Mis anuncios no tendran opcion de guardar
    {
      this.setState({
        className:'invisible',
        btn:'btn btn-warning',
        card:null
      })
    }
    //Validamos que el anuncio que guardamos no aparezca su opcion de guardar otra veeeez
    db.collection("user").doc(this.props.auth.uid).collection("guardados").where("ID","==",this.props.auto.id).get().then(snap=>{
      const datos=snap.docs[0].data()
     
      if(datos.estado==true)
      {
        this.setState({
          className:'invisible'
        })
      }
    }).catch(err=>{console.log(err)})
  }   
  
  borrar=()=>
  {
    
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        const db=firebase.firestore() 
      
        db.collection("anuncios").doc(this.props.auto.id).delete().then(()=> {
         this.setState({
           card:'invisible'
         })
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
        Swal.fire(
          'Borrado!',
          'El anuncios ha sido borrado',
          'success'
        )
      }
    })

  }

   guardar=()=>{
    
    this.setState({
      className:'invisible'
    })
    const db=firebase.firestore()
   
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
     
        return (
            <div className="ml-5 col-3" >

              <div class={`card ${this.state.card}`}>
                <div className="d-flex justify-content-between">
                <span className="align-self-start border-bottom p-2"><i class="fas fa-minus-circle"></i></span>
                <span className="align-self-end border-bottom p-2"><i class="far fa-save"/></span>
                </div>
                <img class="card-img-top" src={auto.urlPhoto} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">{auto.titulo}</h5>
                    <p class="card-text">{auto.descripcion}</p>
                    <div>
                    <a href="#" class="btn btn-primary">Ver mas detalles</a>
                    

                    <button type="button" className={this.state.className} onClick={this.guardar}>Guardar</button>
                    <button type="button" className={this.state.btn} onClick={this.borrar}>Borrar</button>
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