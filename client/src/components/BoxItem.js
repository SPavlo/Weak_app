import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {BOXPAGE_ROUTE} from "../utils";

const BoxItem = ({box}) => {
    const navigate = useNavigate()
    return (
        <div  className="card-list-item" >
            <div
                onClick={() => navigate(BOXPAGE_ROUTE+'/' + box.id)}
            >

                <img  width={230} height={230} src={process.env.REACT_APP_API_URL + box.img}/>
                <div className="text-card">
                    <div className="name-card">{box.name}</div>
                    <div className="price-card">{box.price} грн</div>
                </div>

            </div>
        </div>
    );
};

export default BoxItem;