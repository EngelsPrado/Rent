import React, { Component } from 'react';
import './style.css'
import {Link} from 'react-router-dom'

class Categorias extends Component {
    render() {
        return (
            <div className="d-flex container flex-row justify-content-center">
                 <div class="card " >
                    <img class="card-img-top" src="https://firebasestorage.googleapis.com/v0/b/rent-me-165ca.appspot.com/o/Fotos%20del%20proyecto%2Fcasa.png?alt=media&token=c9d9934a-3281-430e-9059-da94042c4dfa" alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">Bienes Raices</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Link to="/anuncios/bienRaiz" class="btn btn-primary mt-3">Ver anuncios </Link>
                    </div>
            </div>

            <div class="card" >
                <img class="card-img-top" src="https://firebasestorage.googleapis.com/v0/b/rent-me-165ca.appspot.com/o/Fotos%20del%20proyecto%2Fautos.png?alt=media&token=bf8f639c-b667-4c72-bbd1-f20def7774ba" alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">Autos</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link to="/anuncios/auto" class="btn btn-primary mt-3">Ver anuncios</Link>
                </div>
            </div>

            <div class="card">
                <img class="card-img-top" src="https://firebasestorage.googleapis.com/v0/b/rent-me-165ca.appspot.com/o/Fotos%20del%20proyecto%2FMUSIC.png?alt=media&token=e58fed4b-7f1c-4a39-89c6-aee8d7ca86ef" alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">Ocio</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link to="/anuncios/ocio" class="btn btn-primary mt-3">Ver anuncios</Link>
                </div>
            </div>

                                  
            </div>
        );
    }
}



export default Categorias;