import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/home';
import Header from './components/header';
import Publicar from './components/activos/Publicar';
import Anuncios from './components/activos/anuncios';
import  MapContainer  from './components/activos/mapas';
import Perfil from './components/user/Perfil';
import PerfilLink from './components/user/PerfilLink';
import MyAnuncios from './components/user/MyAnuncios';
import Save from './components/user/Save';
import NotFound from './components/NotFound';
import Chat from './components/activos/Chat';

class App extends Component {
  render() {
    return (
      <BrowserRouter>

      <div className="App">
             <Header></Header> 
             <Switch>
               <Route exact path='/' component={Home}/> 
               <Route  exact path='/chat/:dni' render={props=> <Chat  dni={props.match.params.dni} /> } />
               <Route exact path='/publicar' component={Publicar} />
               <Route exact path='/perfil' component={Perfil}/> 
               <Route  path='/perfil/:dni' render={props=>  <PerfilLink dni={props.match.params.dni}/> }/>
               
             </Switch>
             <Switch>
               <Route  exact path='/perfil/anuncios' component={MyAnuncios} />
               <Route  exact path='/perfil/guardados' component={Save} />
               
               </Switch>

            <Switch> 
                <Route exact path='/anuncios/:dni' render={ props=> <Anuncios dni={props.match.params.dni}/>} />
               
            </Switch>
            
      </div>
      
      </BrowserRouter>
    );
  }
}


export default App;
