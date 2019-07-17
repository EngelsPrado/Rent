import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom'

class NotFound extends Component {
    render() {
        return (
            <div>
                <div class="jumbotron">
                <h1 class="display-4">Hola,parece que te has perdido !</h1>
                <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr class="my-4"/>
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <Link class="btn btn-primary btn-lg" to="/" role="button">Back To Home</Link>
                </div>
            </div>
        );
    }
}

export default NotFound;