import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
//import createReduxStore from 'create-redux-store'
import { createFirestoreInstance } from 'redux-firestore'
import { Provider } from 'react-redux'
import firebase, { firestore } from 'firebase/app';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import config from './config/fbconfig'
import rootReducer from './store/reducers/rootReducer'
//const fbConfig = {} // object containing Firebase config
import App from './App'

import createReduxStore from './store/reducers/createReduxStore'



  // Listen for auth ready (promise available on store thanks to attachAuthIsReady: true config option)
  const store = createStore(rootReducer,
    compose(
      applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
      reactReduxFirebase(config, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true}),
      reduxFirestore(config) // redux bindings for firestore
    )
  );
  
  store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
    serviceWorker.unregister()
  });



