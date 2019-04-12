import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import config from './config/fbconfig'
import rootReducer from './store/reducers/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

  export const history = createBrowserHistory()
 
export  default function configureStore(preloadedState){
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(rootReducer(history),preloadedState,
    compose(
      applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore}),routerMiddleware(history)),
      reactReduxFirebase(config, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true}),
      reduxFirestore(config) // redux bindings for firestore
    )
  );

  return store
  }
