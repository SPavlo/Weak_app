import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import BoxStore from "./store/BoxStore";
import PostCardStore from "./store/PostCardStore";
import OrderStore from "./store/OrderStore";


export const  Context = createContext(null)


ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        box: new BoxStore(),
        postCard: new PostCardStore(),
        order: new OrderStore()
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

