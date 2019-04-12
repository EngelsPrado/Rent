import React, { Component } from 'react';

class Auto extends Component {
    render() {
        const {auto}=this.props;
      //  console.log(auto)
        return (
            <div className="ml-5 col-3" >

              <div class="card">
                <img class="card-img-top" src={auto.urlPhoto} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">{auto.titulo}</h5>
                    <p class="card-text">{auto.descripcion}</p>
                    <a href="#" class="btn btn-primary">Ver mas detalles</a>
                </div>
              </div>
  
            </div>
        );
    }
}

export default Auto;     