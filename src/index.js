
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import UserProvider from './Providers/UserProvider'


//const fbConfig = {} // object containing Firebase config
import App from './App'




ReactDOM.render(<UserProvider><App></App> </UserProvider>, document.getElementById('root'));




