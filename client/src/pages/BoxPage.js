import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {deleteBox, fetchOneBox} from "../http/boxApi";
import data from "bootstrap/js/src/dom/data";
import {BOXPAGE_ROUTE, MAIN_ROUTE} from "../utils";
import CreateBox from "../components/modals/CreateBox";

import styles from "../style/pages/BoxPage..css"

const BoxPage = () => {

    const navigate = useNavigate()
    const [box,setBox] = useState({composition:[]})
    const {id} = useParams()
    const [boxVisible, setBoxVisible] = useState(false)


    const removeBox = () =>{
        try {
            deleteBox(id).then(data => navigate(MAIN_ROUTE) )
        }catch (e) {
            console.log('Помилка при видалені')}
    }

    const updBox = () => {
        try {
            setBoxVisible(true)

        }catch (e) {
            console.log('Помилка при оновлені')}
    }
    useEffect(()=>{
        fetchOneBox(id).then(data=> {
            setBox(data)
        })
    },[])
        return (
        <Container
            className="d-flex justify-content-evenly"
            style={{marginTop:90}}
        >
            <div className= "box-page-first">
                <img alt="Box" width={400} height={400} src={process.env.REACT_APP_API_URL + box.img}/>

            </div>
            <div className= "box-page-second">
                <div className="box-name">
                    {box.name}
                </div>
                <div className="box-price">
                    {box.price} грн

                </div>
                <div className="composition">
                    {box.composition.map((line, index) =>
                        <div className="composition-item" key={line.id}>
                            {line.name}  {line.amount}шт.
                        </div>
                    )}
                </div>
                <div className="box-btns">
                        <button
                            className="box-upd"
                            onClick={updBox}>
                           ЗМІНИТИ
                        </button>
                        <button
                            className="box-del"
                            onClick={removeBox}>
                           ВИДАЛИТИ
                        </button>
                </div>



            </div>


            <CreateBox show={boxVisible} onHide={()=> setBoxVisible(false)} oldComposition={box.composition}/>
        </Container>
    );
};

export default BoxPage;