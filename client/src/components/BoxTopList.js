import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import {BOXPAGE_ROUTE} from "../utils";
import {useNavigate} from "react-router-dom";

const BoxTopList = ({boxes}) => {

    const navigate = useNavigate()
    console.log('BoxTopList')
    return (
        <div  className="card-list justify-content-start mt-4" >
            {boxes.map(box =>
                    <div

                        className="card-list-item"
                        onClick={()=> navigate(BOXPAGE_ROUTE +'/' + box.box.id)}
                        key={box.box.id}
                    >
                        <img
                            src={process.env.REACT_APP_API_URL + box.box.img}
                            width={150}
                            height={150}

                        />
                        <div className="text-card">
                            <div className="name-card">{box.box.name}</div>
                            <div className="price-card">{box.amount} шт.</div>
                        </div>
                    </div>
            )}
        </div>
    )
}

export default BoxTopList;

