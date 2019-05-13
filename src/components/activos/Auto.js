import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from 'firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment'
import { Redirect,Link } from 'react-router-dom'
const MySwal = withReactContent(Swal)

class Auto extends Component {
    
  state={
    className:'btn btn-info',
    btn:'btn btn-warning invisible',
    fotos:[],
    id:`carouselExampleControl${this.props.auto.id}`,
    modal:`exampleModalCenter${this.props.auto.id}`,
  
  }
  //Pendiendte
  componentDidMount()
  {


    const db=firebase.firestore()
    
    db.collection("urlFotos").doc(this.props.auto.id).get().then(url=>{
      var datos=url.data()

  
     this.setState({
       fotos:datos
     })
    
    })
  
    //Poner la opcion de borrar si el anuncio esta guardado
    db.collection("user").doc(this.props.auth.uid).collection("guardados").doc(this.props.auto.id).get().then(snap=>{
  
         
      if(snap.data().estado!==false)
      {
        this.setState({
        
          btn:'btn btn-warning',
       
        })  
      }

    }).catch(err=>{console.log(err)}) 
  
    if(this.props.auth.uid===this.props.auto.authorId)//Mis anuncios no tendran opcion de guardar
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
       console.log(datos.estado)
      if(datos.estado && datos.estado===true)
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
        
         if(this.props.auth.uid !== this.props.auto.authorId)
         {
          db.collection("user").doc(this.props.auth.uid).collection("guardados").doc(this.props.auto.id).update({
            estado:false
          }).then(()=>{
            this.setState({
              card:'invisible'
            })
          })
         }else{
          db.collection("anuncios").doc(this.props.auto.id).delete().then(()=> {
            this.setState({
              card:'invisible'
            })
         }).catch(function(error) {
             console.error("Error removing document: ", error);
         });
         }
        
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
            <div className="ml-0 ml-sm-5 ml-md-5 ml-lg-5 col-sm-12 col-md-5 col-lg-5 col-xl-3 " >

              <div class={`card ${this.state.card}`}>
                <div className="d-flex justify-content-between">
                <button type="button" className={this.state.btn} onClick={this.borrar}><span className="align-self-start border-bottom "><i class="fas fa-minus-circle"></i></span></button>
                
                <button type="button" className={this.state.className} onClick={this.guardar}><span className="align-self-end border-bottom"><i class="far fa-save"/></span></button>
                
                </div>
                {/*  */}
                <div id={this.state.id} class="carousel slide carousel-fade" data-ride="carousel">
                  <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img class="d-block w-100" src={this.state.fotos.urlPhoto? this.state.fotos.urlPhoto[0]:null} alt="First slide"/>
                      </div>
                      <div class="carousel-item">
                        <img class="d-block w-100" src={this.state.fotos.urlPhoto? this.state.fotos.urlPhoto[1]:null} alt="Second slide"/>
                      </div>
                      <div class="carousel-item">
                        <img class="d-block w-100" src={this.state.fotos.urlPhoto? this.state.fotos.urlPhoto[2]:null} alt="Third slide"/>
                      </div>
                  </div>
                    <a class="carousel-control-prev" href={`#${this.state.id}`}role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href={`#${this.state.id}`} role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                </div>      


                {/*  */}
                {/* <img class="card-img-top" src={ this.state.fotos.urlPhoto? this.state.fotos.urlPhoto[0]:null} alt="Card image cap"/> */}
                <div class="card-body d-flex flex-column bg-light">
                    <h5 class="card-title align-self-start">{auto.titulo}</h5>
                    <p class="card-text align-self-start">{auto.departamento}</p>
                    <div>
                    {/* <a href="#" class="btn btn-primary">Ver mas detalles</a> */}
                    {/*  */}
                
                    <button type="button " class="btn btn-primary" data-toggle="modal" data-target={`#${this.state.modal}`}>
                      Mas detalles
                    </button>

                 
                    <div class="modal fade" id={this.state.modal} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id={`${this.state.modal}`}>Informacion del anuncio</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body row">
                             <div className="col-5">
                             <h6>Descripcion</h6>  
                             {auto.descripcion}   
                                       
                             </div>
                             <div className="col-5">
                             <h6>Direccion</h6>  
                               {auto.direccion}
                             </div>
                             <div className="col-3 mt-1">
                             <h6>Telefono</h6>  
                               {auto.telefono}
                             </div>
                          </div>
                          <div class="modal-footer d-flex justify-content-between">
                          
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* <button type="button" className={this.state.className} onClick={this.guardar}>Guardar</button> */}
                    {/* <button type="button" className={this.state.btn} onClick={this.borrar}>Borrar</button> */}
                    </div>
                    <div class="card-footer d-flex">
      
                    
                      <small class="text-muted">publicado:{moment(auto.createdAt.toDate()).fromNow() }</small>
                      
                    
                    </div>
                    <small className="align-self-start ml-1">Por:
                                <Link className="tooltip-test" to={`/perfil/${this.props.auto.authorId}`}  title="Ver mas de sus anuncios" >{auto.user}</Link>
                    </small>
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