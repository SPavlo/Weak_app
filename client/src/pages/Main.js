import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import SideBar from "../components/SideBar";
import BoxList from "../components/BoxList";
import CreateBox from "../components/modals/CreateBox";
import {Context} from "../index";
import {fetchBoxes} from "../http/boxApi";
import {fetchPostCards} from "../http/postCardApi";
import PostCardList from "../components/PostCardList";
import BoxSort from "../components/BoxSort";
import CreatePostCard from "../components/modals/CreatePostCard";
import styles from "../style/pages/Main.css"

const Main = () => {


    const [selectedSort,setSelectedSort] = useState('')
    const [boxVisible, setBoxVisible] = useState(false)


    const {box} = useContext(Context)



    const selectSort =(sort) =>{
        setSelectedSort(sort)
    }


    useEffect(()=>{
        fetchBoxes().then(data => {
            box.setBoxes(data.rows)
        })
    },[])


    return (
        <Container>
            <div className="main">
                <div className="sidebar">
                    <BoxSort select ={selectSort}/>
                    <button
                        className="btn-add"
                        onClick={()=>setBoxVisible(true)}
                    >
                      ДОДАТИ БОКС
                    </button>
                </div>
                <BoxList sort={selectedSort}/>


                <CreateBox show={boxVisible} onHide={()=> setBoxVisible(false)}/>

            </div>

        </Container>
    );
};

export default Main;