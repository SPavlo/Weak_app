import React, {useEffect, useState} from 'react';
import {Form, Modal, Button, Row, Col} from "react-bootstrap";
import {createBox, fetchOneBox, updateBox} from "../../http/boxApi";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {BOXPAGE_ROUTE} from "../../utils";
import {login} from "../../http/userApi";
import data from "bootstrap/js/src/dom/data";

const CreateBox = ({show, onHide, oldComposition}) => {

    const navigate = useNavigate()
    const {id} = useParams()
    const location = useLocation()
    const isUpd = location.pathname.includes(BOXPAGE_ROUTE);
    const [deletedComposition, setDeletedComposition] = useState([])
    const [renderComposition, setRenderComposition] = useState([])
    const [composition, setComposition]= useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)


    const removeOldComposition = (id) =>{
        setRenderComposition(renderComposition.filter(i => i.id !== id))

        setDeletedComposition([...deletedComposition,id])
        console.log(id)
    }

    const showOldComposition = () =>{

        setRenderComposition(oldComposition)
    }
    const addComposition = () => {
         setComposition([...composition,{name:'', amount: 1, number: Date.now()}])
    }
    const removeComposition = (number) => {
        setComposition(composition.filter(i => i.number !== number))
    }
    const changeCoposition = (key,value,number) =>{
        setComposition(composition.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    const selectFile= (e) =>{
       setFile(e.target.files[0])

    }
    const refreshAndHide = () =>{
        setPrice('')
        setName('')
        onHide()

    }



    const addBox = () => {
        const formData =  new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        if (file) formData.append('img', file)
        if(deletedComposition) formData.append('deletedComposition', JSON.stringify(deletedComposition))
        if (composition) formData.append('composition', JSON.stringify(composition))
        if (isUpd){
            updateBox(id,formData).then(data=> {refreshAndHide()})

        } else {
            createBox(formData).catch().then(res => {
                if(res)refreshAndHide()
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
                    {isUpd?'Змінити Бокс':'Додати Бокс'}
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
                <hr/>
                <h6>Склад</h6>
                {
                    isUpd
                        ? <Button
                            style={{display:"block", marginTop:20}}
                            onClick={showOldComposition}
                            >
                            Змінити склад
                        </Button>:''
                }

                {
                    isUpd?renderComposition.map((i)=>
                    <Row className="mt-3" key={i.id} >
                        <Col md={4} >
                            <Form.Label>
                                <div className="m-2">
                                    {i.name}
                                </div>

                            </Form.Label>
                        </Col>
                        <Col md={4}>
                            <Form.Label>
                                {i.amount}
                            </Form.Label>
                        </Col>
                        <Col md={4}>
                            <Button
                                onClick={() => removeOldComposition(i.id)}
                                variant={"outline-danger"}>
                                Видалити
                            </Button>
                        </Col>


                    </Row>
                ):<Row>

                    </Row>
                }
                {composition.map((i) =>
                    <Row className="mt-4" key={i.number}>
                        <Col md={4}>
                            <Form.Control
                                value={i.title}
                                onChange={(e) => changeCoposition('name',e.target.value,i.number)}
                                placeholder="Введіть назву"/>
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                value={i.amount}
                                onChange={(e) => changeCoposition('amount',e.target.value,i.number)}
                                placeholder="Введіть кількість" type = "number"/>
                        </Col>
                        <Col md={4}>
                           <Button
                               onClick={() => removeComposition(i.number)}
                               variant={"outline-danger"}>
                               Видалити
                           </Button>
                        </Col>
                    </Row>
                )}

                <Button
                    className="mt-3"
                    variant={"outline-dark"}
                    onClick={addComposition}
                >
                    Додати
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={refreshAndHide}>Закрити</Button>
                <Button variant={"outline-success"} onClick={addBox}>{isUpd?'Зберегти':'Додати '}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBox;