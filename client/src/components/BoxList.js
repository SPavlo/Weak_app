import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Col, FormControl, InputGroup, Row} from "react-bootstrap";
import BoxItem from "./BoxItem";

const BoxList = observer( ({sort}) => {
    const {box} = useContext(Context)




    const [searchQuery, setSearchQuery] = useState('')
    const [searchedBox, setSearchedBox] = useState([])

    useEffect(()=>{
         sortBox()
    },[sort])

    const searchBoxList = () =>{
        setSearchedBox(box.boxes.filter(box => box.name.toLowerCase().includes(searchQuery.toLowerCase())))
    }


    const sortBox = () =>{
        console.log('sortby', sort)
        if(searchQuery){
            setSearchedBox([...searchedBox].sort((a, b) => a[sort] > b[sort] ? 1 : -1))
            console.log('sorting... with search');
            console.log(searchedBox)

        }else {
            box.boxes.sort((a, b) => a[sort] > b[sort] ? 1 : -1)
            console.log('sorting... without search');

        }

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
                                searchBoxList()
                            }}

                        />

                    </InputGroup>
                </div>
                <div className="card-list">
                    {searchQuery
                        ?searchedBox.map(box => <BoxItem key={box.id} box={box}/>)
                        :box.boxes.map(box =><BoxItem key={box.id} box={box}/>)}

                </div>
            </div>

    );
});

export default BoxList;