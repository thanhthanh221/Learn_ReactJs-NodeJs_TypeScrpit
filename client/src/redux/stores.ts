import ThunkMiddleware from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { accountReducer } from './Account/reducers';

const rootReducer = combineReducers({
    account: accountReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [ThunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    return createStore(rootReducer, middlewareEnhancer);
};