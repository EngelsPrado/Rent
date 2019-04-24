import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect,Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import './style.css'
import {NavLink} from 'react-router-dom'
import Auto from './Auto';
import firebase from 'firebase'
class Coches extends Component {

  constructor(props) {
    super(props)
    this.state = {
      a:[],
      lastVisible:null,
      err:'invisible',
      btn:'visible'
    }
    this.more=this.more.bind(this)
    this.renderA = this.renderA.bind(this);

  }

  more()
  {
    //Validar que si hay anuncios por mostrar
    const db=firebase.firestore()

    console.log(this.state.lastVisible)
    db.collection("anuncios")
          .startAfter(this.state.lastVisible)
          .limit(4).where("tipoAnuncio","==","bienRaiz").get().then(documentSnapshots=>{
            var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
            console.log(documentSnapshots.docs[1].data())

            this.setState(prevState => ({
              a: [
                  ...prevState.a,
                  documentSnapshots
                 ],
                 lastVisible
            }))
          }).catch(err=>{ this.setState({err:'visible',btn:'invisible' })   });
  } 

  componentDidMount()
  {
     this.renderA()
  }
   
  renderA()
  {
    const db=firebase.firestore()

    db.collection("anuncios").limit(2).where("tipoAnuncio","==","auto").get().then(querySnapshot=>{
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

    render() {
    
        const array=this.state.a
       
        return (
            <div className="row">
                <div className="col-2 bg-light one">
                <h3>Categorias</h3>
                <div class="btn-group d-flex flex-column" role="group" aria-label="Basic example">
                <Link to="/anuncios/auto" class="btn btn-primary mt-3">Autos </Link>
                <Link to="/anuncios/bienRaiz" class="btn btn-primary mt-3">Bienes raices </Link>
                <Link to="/anuncios/ocio" class="btn btn-primary mt-3">Ocio</Link>

                </div>
                
                </div>
                <div className="col-9 bg-primary">
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
      autos: state.firestore.ordered.auto,
     
    }
  }

  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'user'},
      { collection: 'anuncios',doc:'categorias',subcollections:[
        {collection:'auto'}
      ]}
    ])
  )(Coches)