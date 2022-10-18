import React, {useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {BOXPAGE_ROUTE, POSTCARD_ROUTE} from "../../utils";
import {createBox, updateBox} from "../../http/boxApi";
import {useLocation, useParams} from "react-router-dom";
import {createPostCard, updatePostCard} from "../../http/postCardApi";

const CreatePostCard = ({show,onHide}) => {

    const {id} = useParams()
    const location = useLocation()

    const isUpd = location.pathname.includes(POSTCARD_ROUTE);

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)

    const refreshAndHide = () =>{
        setPrice('')
        setName('')
        onHide()

    }

    const selectFile= (e) =>{
        setFile(e.target.files[0])

    }

    const addPostCard = () => {
        const formData =  new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        if (file) formData.append('img', file)
        if (isUpd){
            updatePostCard(id,formData).then(data=> {refreshAndHide()})

        } else {
           createPostCard(formData).catch().then(res =>  {
               if(res) refreshAndHide()
           })
        }
    }



        return (

        <Modal
            show={show}
            onHide={refreshAndHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {isUpd?'Змінити Декор':'Додати Декор'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-3"
                        onChange={e => setName(e.target.value)}
                        placeholder={"Введіть назву"}
                        value={name}
                    />
                    <Form.Control
                        className="mt-3"
                        onChange={e => setPrice(Number(e.target.value))}
                        placeholder={"Введіть ціну"}
                        type="number"
                        value={price}
                    />

                    <Form.Control
                        onChange={selectFile}
                        className="mt-3"
                        type="file"
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={refreshAndHide}>Закрити</Button>
                <Button variant={"outline-success"} onClick={addPostCard}>{isUpd?'Зберегти':'Додати '}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreatePostCard;