import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import BoxSort from "../components/BoxSort";
import PostCardList from "../components/PostCardList";
import CreatePostCard from "../components/modals/CreatePostCard";
import {fetchPostCards} from "../http/postCardApi";
import {Context} from "../index";

const PostCard = () => {

    const {postCard} = useContext(Context)
    const [postCardVisible, setPostCardVisible] = useState(false)
    const [selectedSort,setSelectedSort] = useState('')

    const selectSort =(sort) =>{
        setSelectedSort(sort)
    }


    useEffect(()=>{
        fetchPostCards().then(data =>{
            postCard.setPostCards(data.rows)
        })
    },[])
    return (
        <Container>
            <div className="main">
                <div className="sidebar">
                    <BoxSort select ={selectSort}/>
                    <button
                        className="btn-add"
                        onClick={()=>setPostCardVisible(true)}
                    >
                        ДОДАТИ ДЕКОР
                    </button>
                </div>
                    <PostCardList sort={selectedSort} />
                    <CreatePostCard show={postCardVisible} onHide={()=> setPostCardVisible(false)}/>
            </div>
        </Container>
    );
};

export default PostCard;