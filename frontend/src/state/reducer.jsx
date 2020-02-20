import {actions} from './actions'


export const initialState = {};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_USER:
            return {...state, user: action.payload};
        default:
            return state;
    }
};

export default rootReducer
