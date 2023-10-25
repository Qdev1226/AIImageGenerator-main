import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from '../reducers/rootReducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(rootReducer, composedEnhancer);

let currentState = store.getState();

store.subscribe(() => {
    let previousState = currentState;
    currentState = store.getState();
})

export default store;