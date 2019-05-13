import React, { Component } from 'react';

import { connect } from 'react-redux'
import { Redirect,Link } from 'react-router-dom'
import { compose } from 'redux'
import './style.css'
import Auto from './Auto';
import firebase from 'firebase'
import { Field, reduxForm } from 'redux-form'


//Controlar los limits cuando el usuario le da click en mostrar mas anuncios

class Coches extends Component {

  constructor(props) {
    super(props)
    this.state = {
      a:[],
      lastVisible:null,
      err:'invisible',
      btn:'visible',
      redirect:false,
      categoria:null,
    }

    this.renderA = this.renderA.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.more=this.more.bind(this)

    
  }
   //Funcion para mostrar mas anuncios 
  more()
  {
    
    const db=firebase.firestore()
    //Mejorar 
    db.collection("anuncios")
          .startAfter(this.state.lastVisible)
          .limit(3).where("tipoAnuncio","==","auto").get().then(documentSnapshots=>{
            var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
            
            if(lastVisible)
            {
              this.setState(prevState => ({
                a: [
                    ...prevState.a,
                    documentSnapshots
                   ],
                   lastVisible
              }))
            }else{
              this.setState({err:'visible',btn:'invisible' })  
            }

          }).catch(err=>{ this.setState({err:'visible',btn:'invisible' })   }); 
  } 
  //Trae los anuncios al front
  componentDidMount()
  {
     this.renderA()
  }

  renderA()
  {
    const db=firebase.firestore()
    //Mejorar
    db.collection("anuncios").limit(3).where("tipoAnuncio","==","auto").get().then(querySnapshot=>{
      var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
       console.log("last", lastVisible.data());
       this.setState(prevState => ({
        a: [
            ...prevState.a,
               querySnapshot
           ],
           lastVisible
      }))
           
  
      }).catch(err=>console.log(err))

  }
 
  handleSubmit(values){
 
    setTimeout(this.setState({
      err:'invisible',
      btn:'visible',
      categoria:values.categoria
    }),500)
     
    const db=firebase.firestore()
    if(values.departamento)
    {
      db.collection("anuncios").limit(3).where("tipoAnuncio","==","auto").where("departamento","==",values.departamento).get().then(querySnapshot=>{
        var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
         console.log("last", lastVisible.data());
         this.setState(prevState => ({
          a: [
              //...prevState.a,
                 querySnapshot
             ],
             lastVisible
        }))
             
    
        }).catch(err=>{console.log('no hay') })
    }else
    {
      db.collection("anuncios").limit(3).where("tipoAnuncio","==",values.categoria).get().then(querySnapshot=>{
        var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
         console.log("last", lastVisible.data());
         this.setState(prevState => ({
          a: [
              //...prevState.a,
                 querySnapshot
             ],
             lastVisible
        }))
             
    
        }).catch(err=>{console.log('no hay') })
    }
   
  }
    render() {

      const array=this.state.a
      const { handleSubmit, pristine, reset, submitting } = this.props
  
  
        return (
            <div className="row d-flex flex-sm-column flex-md-row flex-lg-row">
                <div className="col-sm-12  col-lg-2 bg-light one">
                <h4>Busqueda por:</h4>
                <h5>Departamento</h5>
                <form onSubmit={handleSubmit(this.handleSubmit)} className="d-flex row flex-sm-row flex-lg-column">
                
                {/* <Field
                    name="categoria"
                    type="text"
                    component="select"
                    label="Categoria"
                    //validate={[required]}
                    className="form-control col-sm-5 ml-sm-2 col-lg-7"
                  > 
                   <option> </option>
                   <option value="bienRaiz">Bienes Raices</option>
                   <option value="auto">Autos</option>
                   <option value="ocio">Ocio</option>
                   
                  </Field>    */}
            
                  <Field
                    name="departamento"
                    type="text"
                    component="select"
                    label="Ubicacion"
                    //validate={[required]}
                    className="form-control col-sm-5 col-lg-7 ml-5"
                  > 
                   <option> </option>
                   <option value="managua">Managua</option>
                   <option value="leon">Leon</option>
                   <option value="masaya">Masaya</option>
                   
                  </Field>  
                  <button type="submit"  class="btn btn-primary mt-1 ml-2">Buscar</button>
                </form>
                
                </div>
                <div className="col-sm-12 col-md-12 col-lg-10 bg-light mt-md-5 mt-sm-5 mt-lg-0">
                
                
                 <div className="row "> 
                    {
                      array && array.map(querySnapshot=>{
                        return querySnapshot && querySnapshot.docs.map(doc=>{
                       
                        return <Auto auto={doc.data()} key={doc.id} />
                    
                      })

                      }) 

                    }
                  
                 </div>
                 <div class={`alert alert-info ${this.state.err}`} role="alert">
                  No hay mas anuncios en esta categoria
                </div>
                <div className={`btn btn-info ${this.state.btn}`} onClick={this.more} >Ver mas anuncios</div>
                
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      anuncios: state.firestore.ordered.anuncios,

    }
  }

  export default compose(
    connect(mapStateToProps),
    reduxForm({
      form: 'simple',
       // a unique identifier for this form   
    })
  )(Coches)