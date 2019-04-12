import React, { Component } from 'react';
import Categorias from './categorias';

class Home extends Component {
    render() {
        return (
            <div className="bg-light container  mt-5">

                 <div id="carouselExampleIndicators" class="carousel slide container" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner ">
                        <div class="carousel-item active">
                        <img class="d-block w-100 " width="500" height="650" src="https://firebasestorage.googleapis.com/v0/b/rent-me-165ca.appspot.com/o/Fotos%20del%20proyecto%2Flogo.png?alt=media&token=c105d935-eb74-400d-9a8a-7115ceb0653d" alt="First slide"/>
                        </div>
                        <div class="carousel-item">
                        <img class="d-block w-100" width="500" height="650" src="https://firebasestorage.googleapis.com/v0/b/rent-me-165ca.appspot.com/o/Fotos%20del%20proyecto%2Flogo.png?alt=media&token=c105d935-eb74-400d-9a8a-7115ceb0653d" alt="Second slide"/>
                        </div>
                        <div class="carousel-item">
                        <img class="d-block w-100"  width="500" height="650" src="https://firebasestorage.googleapis.com/v0/b/rent-me-165ca.appspot.com/o/Fotos%20del%20proyecto%2Flogo.png?alt=media&token=c105d935-eb74-400d-9a8a-7115ceb0653d" alt="Third slide"/>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                    </div>

                   <Categorias></Categorias>
            </div>
        );
    }
}

export default Home;