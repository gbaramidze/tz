import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'

import rootReducer from '../reducers'

function createMiddlewares({isServer}) {
    let middlewares = [
        thunkMiddleware
    ];

    return middlewares
}

export default (initialState = {}, context) => {
    let {isServer} = context
    let middlewares = createMiddlewares({isServer})

    return createStore(
        rootReducer, initialState,
        compose(applyMiddleware(...middlewares))
    )
}
