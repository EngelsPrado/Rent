import React, { Component } from 'react';
import Categorias from './categorias';

class Home extends Component {
    render() {
        return (
            <div className="bg-light container  mt-5">
                <div class="jumbotron">
                <h1 class="display-4">Hola,somos Rent!</h1>
                <p class="lead">Tu web de alquiler</p>
                <hr class="my-4"/>
                <p>Accede a los miles de anuncios segun tu preferencia</p>
                <a class="btn btn-primary btn-lg" href="#" role="button">Inicia sesion,y publica ya!</a>
                </div>

                   <Categorias></Categorias>
            </div>
        );
    }
}

export default Home;