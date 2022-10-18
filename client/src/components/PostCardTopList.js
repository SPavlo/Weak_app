import React from 'react';
import {BOXPAGE_ROUTE} from "../utils";
import {useNavigate} from "react-router-dom"


const PostCardTopList = ({postCards}) => {
    const navigate = useNavigate()
    console.log('PostCardTopList')
    console.log(postCards)
    return (
        <div  className="card-list justify-content-start mt-4" >
            {postCards.map(postCard =>
                <div

                    className="card-list-item"
                    onClick={()=> navigate(BOXPAGE_ROUTE +'/' + postCard.postCard.id)}
                    key={postCard.postCard.id}
                >
                    <img
                        src={process.env.REACT_APP_API_URL + postCard.postCard.img}
                        width={150}
                        height={150}

                    />
                    <div className="text-card">
                        <div className="name-card">{postCard.postCard.name}</div>
                        <div className="price-card">{postCard.amount} шт.</div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default PostCardTopList;