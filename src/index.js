import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware , compose , combineReducers } from 'redux';
import pizzaBuilderReducer from './Store/reducers/pizzaBuilder';
import orderReducer from './Store/reducers/order';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    pizzaBuilder : pizzaBuilderReducer,
    order : orderReducer
})

const store = createStore(rootReducer,  composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App  />
        </BrowserRouter>
    </Provider>
    
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
