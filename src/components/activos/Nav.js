import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom'

class Nav extends Component {
    render() {
        return (
            <div >
                 <ul class="nav nav-tabs row">
                    <li class="nav-item col-2">
                       <Link to="/"  class="nav-link" >Home</Link>
                    </li>
                    <li class="nav-item dropdown col-4 col-lg-2">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Categorias</a>
                        <div class="dropdown-menu">
                        <Link class="dropdown-item"  to="/anuncios/bienRaiz">Bienes raices</Link>
                        <Link class="dropdown-item"  to="/anuncios/auto">Autos</Link>
                      
                        <div class="dropdown-divider"></div>
                      
                        </div>
                    </li>
                    <li class="nav-item dropdown  col-4 col-lg-2 ml-2">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Mi perfil</a>
                        <div class="dropdown-menu">
                        <Link class="dropdown-item"  to="/perfil">Mi cuenta</Link>
                        <Link class="dropdown-item"  to="/perfil/anuncios">Mis anuncios</Link>
                        <Link class="dropdown-item"  to="/perfil/guardados">Anuncios guardados</Link>
                        <div class="dropdown-divider"></div>
                      
                        </div>
                    
                    </li>
                   
                    </ul> 
            </div>
        );
    }
}

export default Nav;