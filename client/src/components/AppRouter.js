import React, {Component, useContext} from 'react';
import {Routes, Route,Navigate} from "react-router-dom"
import {authRoutes, publickRoutes} from "../routes";
import {LOGIN_ROUTE} from "../utils";
import {Context} from "../index";
import {observer} from "mobx-react-lite";



const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
       <Routes>
           {console.log("AppRouter")}
           {console.log(user.isAuth)}
           {user.isAuth && authRoutes.map(({path,Component}) =>
               <Route key={path} path={path} element={Component} exact/>
           )}
           {console.log(user.isAuth)}
           {publickRoutes.map(({path,Component}) =>
               <Route key={path} path={path} element={Component} exact/>
           )}
           <Route
               path="*"
               exact
               element={<Navigate to={LOGIN_ROUTE} />}
           />
       </Routes>
    )
})


export default AppRouter;