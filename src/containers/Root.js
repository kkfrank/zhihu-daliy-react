import React from 'react'
import {createStore,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './RootRedux'
import Router from '../router/'

let store=createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware)
)

const Root=()=>(
	<Provider store={store}>
		<Router/>
	</Provider>
)
export default Root