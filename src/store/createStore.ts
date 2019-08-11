import thunkMiddleware from 'redux-thunk';
import {
    applyMiddleware, compose, createStore, Store
} from 'redux';
import rootReducer from '../reducers';

export default (initialState: object = {}): Store => createStore(
    rootReducer, initialState,
    compose(applyMiddleware(...[thunkMiddleware]))
);
