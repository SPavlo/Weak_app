import React,{useContext} from 'react';
import {Button, Col, Container, Image, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {DECOR_ROUTE, MAIN_ROUTE, ORDER_ROUTE, ORDERPAGE_ROUTE, REPORT_ROUTE} from "../utils";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import styles from "../style/components/MyNavBar.css"

const MyNavBar = observer(() => {

    return (

                <div className="nav-bar">
                    <div className="nav-container">
                        <NavLink
                            className="nav-item"
                            to={MAIN_ROUTE}
                            style={{textDecoration:"none"}}>
                            <div>
                                <Image width={65} src={process.env.REACT_APP_API_URL + 'icon.jpg'}/>

                            </div>
                            <div className="logo">WEAK_POINT</div>
                        </NavLink>
                        <Nav>
                            <div className="nav-link">
                                <NavLink
                                    className="nav-link-item"
                                    to={MAIN_ROUTE}
                                >БОКСИ
                                </NavLink>
                                <NavLink
                                    className="nav-link-item"

                                    to={DECOR_ROUTE}
                                >ДЕКОР
                                </NavLink>
                                <NavLink
                                    className="nav-link-item"

                                    to={ORDER_ROUTE}
                                >
                                    ЗАМОВЛЕННЯ</NavLink>
                                <NavLink
                                    className="nav-link-item"

                                    to={REPORT_ROUTE}
                                >
                                    ЗВІТ
                                </NavLink>
                            </div>

                        </Nav>
                    </div>

                </div>


    );
}) ;

export default MyNavBar;