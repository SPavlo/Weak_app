import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {FormControl, InputGroup, Row} from "react-bootstrap";
import PostCardItem from "./PostCardItem";
import BoxItem from "./BoxItem";

const PostCardList = observer( ({sort}) => {
    const {postCard} = useContext(Context)

    const [searchQuery, setSearchQuery] = useState('')
    const [searchedPostCard, setSearchedPostCard] = useState([])

    useEffect(()=>{
        sortPostCard()
    },[sort])

    const sortPostCard = () =>{
        if(searchQuery){
            setSearchedPostCard([...searchedPostCard].sort((a, b) => a[sort] > b[sort] ? 1 : -1))

        }else {
            postCard.postCards.sort((a, b) => a[sort] > b[sort] ? 1 : -1)

        }

    }

    const searchPostCardList = () =>{
        setSearchedPostCard(postCard.postCards.filter(postCard => postCard.name.toLowerCase().includes(searchQuery.toLowerCase())))
    }
    return (
        <div className="content" >
            <div className="search">
                <InputGroup
                >
                    <FormControl
                        placeholder="Пошук.."
                        value={searchQuery}
                        onChange={event => {
                            setSearchQuery(event.target.value)
                            searchPostCardList()
                        }}

                    />

                </InputGroup>
            </div>
            <div className="card-list">
                {searchQuery
                    ?searchedPostCard.map(postCard =>
                        <PostCardItem key={postCard.id} postCard={postCard}/>)
                    :postCard.postCards.map(postCard =>
                        <PostCardItem key={postCard.id} postCard={postCard}/>
                    )}

            </div>
        </div>

    );
});

export default PostCardList;