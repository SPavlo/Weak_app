import React, {useState} from 'react';
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import styles from "../style/pages/Main.css"

const BoxSort = ({select}) => {


    const renderTooltip = (props) => (
        <Tooltip {...props}>
            Чутливий до регістру
        </Tooltip>
    );


    const sortByName = () =>{
        select("name")
    }
    const sortByPrice = () =>{
        select("price")
    }

    return (
        <div className="sidebar-item">
            <div className="text">
                СОРТУВАННЯ
            </div >
                <div  className="sort-btns " >
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 150, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <button
                            className="btn-sort"
                            onClick={()=> sortByName()}
                        >
                            ПО НАЗВІ
                        </button>
                    </OverlayTrigger>
                    <button
                        className="btn-sort"
                        onClick={()=> sortByPrice()}
                    >
                        ПО ЦІНІ
                    </button>

                </div>



        </div>

    );
};

export default BoxSort;