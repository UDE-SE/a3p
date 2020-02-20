import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'

import {loadSession} from './actions';
import rootReducer, {initialState} from './reducer';

export const globalStore = createStore(rootReducer, initialState, applyMiddleware(thunk));

globalStore.dispatch(loadSession());

globalStore.subscribe(() => {
    console.log('new client state', globalStore.getState());
});
