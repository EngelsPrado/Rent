import authReducer from './authReducer'
import anuncioReducer from './anuncioReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
import {reducer as reduxForm} from 'redux-form'

const rootReducer = combineReducers({
  auth: authReducer,
  anuncioReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  form: reduxForm,
});

export default rootReducer