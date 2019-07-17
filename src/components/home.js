import React, { Component } from 'react';
import Categorias from './categorias';

class Home extends Component {
    render() {
        return (
            <div className=" container-fluid  mt-3">
                <div class="d-flex head h-4">
            
               
                <hr class="my-4"/>
       
                <a class="btn btn-primary btn-lg align-self-end" href="#" role="button">Publica ya!</a>
               
                </div>

                <div className="container-fluid">
                <Categorias></Categorias>
                </div>
            </div>
        );
    }
}

export default Home;