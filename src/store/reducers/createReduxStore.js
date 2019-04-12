
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'

const initialState = {}

export default () => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk.withExtraArgument(getFirebase))
  )
}