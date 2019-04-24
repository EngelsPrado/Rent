import React, { Component } from 'react';

import { connect } from 'react-redux'
import { Redirect,Link } from 'react-router-dom'
import { compose } from 'redux'
import './style.css'
import Auto from './Auto';

import firebase from 'firebase'
import { Field, reduxForm } from 'redux-form'
import coches from './coches';

//Controlar los limits cuando el usuario le da click en mostrar mas anuncios

class BienRaiz extends Component {

  constructor(props) {
    super(props)
    this.state = {
      a:[],
      lastVisible:null,
      err:'invisible',
      btn:'visible',
      redirect:false
    }

    this.renderA = this.renderA.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.more=this.more.bind(this)

    
  }
   //Funcion para mostrar mas anuncios 
  more()
  {
    
    const db=firebase.firestore()

    db.collection("anuncios")
          .startAfter(this.state.lastVisible)
          .limit(3).where("tipoAnuncio","==","bienRaiz").get().then(documentSnapshots=>{
            var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
            console.log(lastVisible.data())          

            this.setState(prevState => ({
              a: [
                  ...prevState.a,
                  documentSnapshots
                 ],
                 lastVisible
            }))
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

    db.collection("anuncios").limit(3).where("tipoAnuncio","==","bienRaiz").get().then(querySnapshot=>{
      var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
       console.log("last", lastVisible.data());
       this.setState(prevState => ({
        a: [
            ...prevState.a,
               querySnapshot
           ],
           lastVisible
      }))
           
  
      })

  }
 
  handleSubmit(values){
    console.log(values)
    setTimeout(this.setState({
      err:'invisible',
      btn:'visible',
    }),500)

    const db=firebase.firestore()
    if(values.categoria && values.departamento)
    {
      db.collection("anuncios").limit(3).where("tipoAnuncio","==",values.categoria).where("departamento","==",values.departamento).get().then(querySnapshot=>{
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
            <div className="row">
                <div className="col-2 bg-light one">
                <h4>Filtrar busqueda por:</h4>
                {/* <div class="btn-group d-flex flex-column" role="group" aria-label="Basic example">
       
                <Link to="/anuncios/auto" class="btn btn-primary mt-3">Autos </Link>
                <Link to="/anuncios/bienRaiz" class="btn btn-primary mt-3">Bienes raices</Link>
                <Link to="/anuncios/ocio" class="btn btn-primary mt-3">Ocio</Link>

                </div> */}
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                <h4 className="d-block mt-3">Categoria</h4>  
                <Field
                    name="categoria"
                    type="text"
                    component="select"
                    label="Categoria"
                    //validate={[required]}
                    className="form-control"
                  > 
                   <option> </option>
                   <option value="bienRaiz">Bienes Raices</option>
                   <option value="auto">Autos</option>
                   <option value="ocio">Ocio</option>
                   
                  </Field>   
                  <h4 className="d-block mt-4">Ubicacion</h4>  
                  <Field
                    name="departamento"
                    type="text"
                    component="select"
                    label="Ubicacion"
                    //validate={[required]}
                    className="form-control"
                  > 
                   <option> </option>
                   <option value="managua">Managua</option>
                   <option value="leon">Leon</option>
                   <option value="masaya">Masaya</option>
                   
                  </Field>  
                  <button type="submit"  class="btn btn-primary mt-4">Buscar</button>
                </form>
                
                </div>
                <div className="col-9 bg-light">
                
                
                 <div className="row"> 
                    {
                      array && array.map(querySnapshot=>{
                        return querySnapshot && querySnapshot.docs.map(doc=>{
                          console.log(doc.data()) ;
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
  )(BienRaiz)