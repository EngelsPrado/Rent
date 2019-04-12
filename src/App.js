import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/home';
import Header from './components/header';
import Publicar from './components/activos/Publicar';
import Anuncios from './components/activos/anuncios';
import  MapContainer  from './components/activos/mapas';

class App extends Component {
  render() {
    return (
      <BrowserRouter>

      <div className="App">
      
       <Header></Header>
            
             <Route exact path='/' component={Home}/> 
             <Route path='/maps' component={MapContainer} />
             <Route path='/publicar' component={Publicar} />
             
         <Switch> 
           
         <Route path='/anuncios/:dni' render={ props=> <Anuncios dni={props.match.params.dni}/>} /> 
            </Switch>
        
      </div>

      </BrowserRouter>
    );
  }
}


export default App;