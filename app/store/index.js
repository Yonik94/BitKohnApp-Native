import userReducer from '../reducers/user.reducers';
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

export const store = createStore(userReducer, compose(applyMiddleware(thunk)));