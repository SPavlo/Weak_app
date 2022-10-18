import React, {useState} from 'react';
import {Card, Col, Image, Button, Row } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {BOXPAGE_ROUTE, POSTCARD_ROUTE} from "../utils";


const PostCardItem = ({postCard}) => {
    const navigate = useNavigate()
    return (
        <div  className="card-list-item" >
            <div
                onClick={() => navigate(POSTCARD_ROUTE +'/' + postCard.id)}
            >

                <img  width={230} height={230} src={process.env.REACT_APP_API_URL + postCard.img}/>
                <div className="text-card">
                    <div className="name-card">{postCard.name}</div>
                    <div className="price-card">{postCard.price} грн</div>
                </div>

            </div>
        </div>
    );
};

export default PostCardItem;