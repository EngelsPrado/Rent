import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect,Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import ListAnuncios from './listAnuncios';
import './style.css'
import {NavLink} from 'react-router-dom'
import Auto from './Auto';
import Objeto from './Objeto'
import firebase from 'firebase'
import AnuncioSummary from './NegocioSummary';

class BienRaiz extends Component {

  constructor(props) {
    super(props)
    this.state = {
      a:{}
    }

    this.renderA = this.renderA.bind(this);
   // this.getAnuncio=this.getAnuncio.bind(this);
  }


  componentDidMount()
  {
     this.renderA()
  }
   
  renderA()
  {
    const db=firebase.firestore()
    db.collection("anuncios").doc("categorias").collection("bienRaiz").get().then(querySnapshot=>{
           this.setState({
             a:querySnapshot
           })
  
      })

  }
 
  
    render() {


      const querySnapshot=this.state.a.docs
      console.log(querySnapshot)   
        const {  auth,anuncios,autos,tipo,dni } = this.props;       
     
  
        return (
            <div className="row">
                <div className="col-2 bg-light one">
                <h3>Categorias</h3>
                <div class="btn-group d-flex flex-column" role="group" aria-label="Basic example">
                {/* <a href="/anuncios/auto" class="btn btn-primary mt-3">Autos</a> */}
                <Link to="/anuncios/auto" class="btn btn-primary mt-3">Autos </Link>
                <Link to="/anuncios/bienRaiz" class="btn btn-primary mt-3">Bienes raices</Link>
                <Link to="/anuncios/ocio" class="btn btn-primary mt-3">Ocio</Link>

                </div>
                
                </div>
                <div className="col-9 bg-light">
                
                
                 <div className="row"> 
                    {
                       querySnapshot && querySnapshot.map(doc=>{
                        //  console.log(doc.data()) ;
                       return <Auto auto={doc.data()} key={doc.id} />
                    
                      })
                    }
                   
                 </div>
                 
                
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      anuncios: state.firestore.ordered.anuncios,
     // autos: state.firestore.ordered.auto,
      user: state.firestore.ordered.user,
    }
  }

  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'user'},
      { collection: 'anuncios',doc:'categorias',subcollections:[
        {collection:'bienRaiz'}
      ]}
    ])
  )(BienRaiz)