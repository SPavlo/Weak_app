import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {MAIN_ROUTE} from "../utils";
import {deletePostCard, fetchOnePostCard} from "../http/postCardApi";
import {Container} from "react-bootstrap";
import CreatePostCard from "../components/modals/CreatePostCard";

const PostCardPage = () => {

    const navigate = useNavigate()
    const [postCard,setPostCard] = useState({composition:[]})
    const {id} = useParams()
    const [postCardVisible, setPostCardVisible] = useState(false)

    const removePostCard = () =>{
        try {
            deletePostCard(id).then(data => navigate(MAIN_ROUTE) )
        }catch (e) {
            console.log('Помилка при видалені')}
    }

    const updPostCard = () => {
        try {
            setPostCardVisible(true)

        }catch (e) {
            console.log('Помилка при оновлені')}
    }
    useEffect(()=> {
        fetchOnePostCard(id).then(data => {
            setPostCard(data)
        })
    })

    return (
        <Container
            className="d-flex justify-content-evenly"
            style={{marginTop:90}}
        >
            <div className= "box-page-first">
                <img alt="Box" width={400} height={400} src={process.env.REACT_APP_API_URL + postCard.img}/>

            </div>
            <div className= "box-page-second">
                <div className="box-name">
                    {postCard.name}
                </div>
                <div className="box-price">
                    {postCard.price} грн

                </div>
                <div className="composition">

                </div>
                <div className="box-btns">
                    <button
                        className="box-upd"
                        onClick={updPostCard}>
                        ЗМІНИТИ
                    </button>
                    <button
                        className="box-del"
                        onClick={removePostCard}>
                        ВИДАЛИТИ
                    </button>
                </div>
            </div>
            <CreatePostCard show={postCardVisible} onHide={()=> setPostCardVisible(false)}/>
        </Container>

    );
};

export default PostCardPage;