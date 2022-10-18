import React, {useContext, useEffect, useState} from 'react';
import {
    Form,
    Modal,
    Button,
    Row,
    Col,
    Dropdown,
    Container,
    ModalBody,
    ModalTitle,
    Card,
    InputGroup, FormControl
} from "react-bootstrap";
import {createBox, fetchBoxes, fetchOneBox, updateBox} from "../../http/boxApi";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {BOXPAGE_ROUTE} from "../../utils";
import {login} from "../../http/userApi";
import data from "bootstrap/js/src/dom/data";
import {Context} from "../../index";
import ModalHeader from "react-bootstrap/ModalHeader";
import {fetchPostCards} from "../../http/postCardApi";
import {createOrder, updateOrder} from "../../http/orderApi";
import MyAlert from "../MyAlert";

const CreateOrder = ({show, onHide, curOrder, isUpd}) => {



    const {order} = useContext(Context)
    const {box} = useContext(Context)
    const {postCard} = useContext(Context)

    const [searchedBox, setSearchedBox] = useState([])
    const [searchedPostCard, setSearchedPostCard] = useState([])
    const [showAlert, setShowAlert] = useState(false)

    const [chosenBox, setChosenBox] = useState([])
    const [chosenPostCard, setChosenPostCard] = useState([])

    const [price, setPrice] = useState('')
    const [clientName, setClientName] = useState('')
    const [clientPhone, setClientPhone] = useState('')
    const [dateToSend, setDateToSend] = useState('')
    const [city, setCity] = useState('')
    const [department, setDepartment] = useState('')
    const [postCardText, setPostCardText] = useState('')
    const [comment, setComment] = useState('')


    const [status,setStatus] = useState(null)
    const [paymentStatus,setPaymentStatus] = useState(null)
    const [searchQueryBox, setSearchQueryBox] = useState('')
    const [searchQueryPostCard, setSearchQueryPostCard] = useState('')


    const [boxModalVisible, setBoxModalVisible] = useState(false)
    const [postCardModalVisible, setPostCardBoxModalVisible] = useState(false)


    const refreshAndHide = () =>{
        setStatus(null)
        setPaymentStatus(null)
        setPrice()
        setClientName('')
        setClientPhone('')
        setDateToSend('')
        setCity('')
        setDepartment('')
        setPostCardText('')
        setComment('')
        setChosenBox([])
        setChosenPostCard([])
        onHide()

    }
    const changeChosenBox = (key,value,number) =>{
        setChosenBox(chosenBox.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    const changeChosenPostCard = (key,value,number) =>{
        setChosenPostCard(chosenPostCard.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addOrder = () =>{
        console.log('CreateOrder')
        const formData =  new FormData()
        formData.append('client_name', clientName)
        if(clientPhone)formData.append('client_phone', clientPhone)
        if(dateToSend)formData.append('date_to_send', dateToSend)
        if(city)formData.append('city', city)
        if(department)formData.append('department', department)
        if(postCardText)formData.append('post_card_text', postCardText)
        if(comment)formData.append('comment', comment)

        const orderBoxes = []
        const orderPostCards = []
        chosenBox.forEach(box =>{
            orderBoxes.push({
                id:box.box.id,
                amount:box.amount
            })
        })

        chosenPostCard.forEach(postCard =>{
            orderPostCards.push({
                id:postCard.postCard.id,
                amount:postCard.amount
            })
        })

        formData.append('price', `${price}`)
        formData.append('status', status)
        formData.append('payment_status', paymentStatus)
        formData.append('orderBoxes', JSON.stringify(orderBoxes))
        formData.append('orderPostCards', JSON.stringify(orderPostCards))
        if(isUpd){
            updateOrder(curOrder.id,formData).then(data => refreshAndHide())
        } else {
            createOrder(formData).then(res =>{
                if(res) refreshAndHide()
            })
        }


    }
    const checkPostCard = (postCard) =>{
        let res = true
        chosenPostCard.forEach((i) =>{
            if(i.postCard.id === postCard.id){
                res = false
            }
        })
        return res
    }
    const addChosenPostCard = (postCard) => {
        const isUniq = checkPostCard(postCard)

        if (isUniq) {
            setChosenPostCard([...chosenPostCard, {postCard: postCard, amount: 1, number: Date.now()}])
            setPostCardBoxModalVisible(false)
        } else {
            setShowAlert(true)
        }
    }
   const checkBox = (box) =>{
            let res = true
            chosenBox.forEach((i) =>{
                if(i.box.id === box.id){
                    res = false
                }
            })
            return res
    }
   const addChosenBox = (box) =>{
            const isUniq = checkBox(box)
            if(isUniq){
                setChosenBox([...chosenBox,{box:box, amount:1, number:Date.now()}])
                setBoxModalVisible(false)
            }else {
               setShowAlert(true)
            }

    }
    const removeChosenBox = (id) => {
        setChosenBox(chosenBox.filter(i => i.box.id !== id))
    }
    const removeChosenPostCard = (id) => {
        setChosenPostCard(chosenPostCard.filter(i => i.postCard.id !== id))
    }

    const showBoxModal = () =>{
        fetchBoxes().then(data =>{
            box.setBoxes(data.rows)
            setSearchedBox(box.boxes)
            setBoxModalVisible(true)
            })
    }
    const showPostCardModal = () =>{
        fetchPostCards().then(data =>{
            postCard.setPostCards(data.rows)
            setSearchedPostCard(postCard.postCards)
            setPostCardBoxModalVisible(true)
        })
    }
    const searchBoxList = () =>{
        setSearchedBox(box.boxes.filter(box => box.name.toLowerCase().includes(searchQueryBox.toLowerCase())))
    }
    const searchPostCardList = () =>{
        setSearchedPostCard(postCard.postCards.filter(postCard => postCard.name.toLowerCase().includes(searchQueryPostCard.toLowerCase())))
    }
    const calcPrice = () =>{
        let res = 0
        chosenBox.forEach((box)=> res += box.box.price * box.amount)
        chosenPostCard.forEach((postCard)=> res += postCard.postCard.price * postCard.amount)
        setPrice(res)
    }



    return (
        <Container>


        <Modal
            show={show}
            onHide={refreshAndHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {isUpd?'Редагувати': 'Додати замовлення'}
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>

                {isUpd
                    ?<div
                        style={{color:"red"}}
                    >
                    *При додаванні до замовлення нового боксу чи декору, існуючі буде видалено
                    </div>
                    :<div></div>}
                <div className="d-flex flex-column">
                    {chosenBox.length===0
                        ?<div></div>
                        : <h3 style={{marginLeft:30}}>Бокси:</h3>}
                    {chosenBox.map(box =>{
                       return <Row key={ box.box.id} className="d-flex align-items-center">
                            <Col md={5}>
                            <Card key={box.box.id} style={{ width: 200,  height:280}} className="m-2 p-0">
                            <Card.Img variant="top" src={process.env.REACT_APP_API_URL + box.box.img}  height={200} />
                        <Card.Body style={{fontSize:12}}>
                            <Card.Title>{box.box.name}</Card.Title>
                        </Card.Body>
                    </Card>
                    </Col>
                        <Col md={5} className="d-flex flex-column">
                            <div style={{fontSize:20, marginBottom:20}}>Кількість боксів:</div>
                            <InputGroup size="lg" className="mb-3">
                                <FormControl
                                    style={{width:50}}
                                    placeholder="Введіть кількість.."
                                    type="number"
                                    value={box.amount}
                                    onChange={(e) => changeChosenBox('amount',e.target.value,box.number)}
                                />

                            </InputGroup>
                            <Button
                                style={{width:150}}
                                variant="outline-danger"
                                onClick={()=> removeChosenBox(box.box.id)}
                            >
                                Видалити
                            </Button>
                        </Col>
                    </Row>
                    })}

                </div>
                <div className="d-flex flex-column">

                    <Button
                        onClick={showBoxModal}
                        className="mt-3"

                    >
                        Додати Бокс
                    </Button>
                    {chosenPostCard.length===0
                        ?<div></div>
                        : <h3 style={{marginLeft:30, marginTop:30}}>Декор:</h3>}
                    {chosenPostCard.map(postCard =>
                        <Row key={postCard.id}className="d-flex align-items-center">
                            <Col md={5}>
                                <Card key={postCard.postCard.id} style={{ width: 200,  height:280}} className="m-2 p-0">
                                    <Card.Img variant="top" src={process.env.REACT_APP_API_URL + postCard.postCard.img}  height={200} />
                                    <Card.Body style={{fontSize:12}}>
                                        <Card.Title>{postCard.postCard.name}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={5} className="d-flex flex-column">
                                <div style={{fontSize:20, marginBottom:20}}>Кількість:</div>
                                <InputGroup size="lg" className="mb-3">
                                    <FormControl
                                        style={{width:50}}
                                        placeholder="Введіть кількість.."
                                        type="number"
                                        value={postCard.amount}
                                        onChange={(e) =>
                                            changeChosenPostCard('amount',e.target.value,postCard.number)
                                        }
                                    />

                                </InputGroup>
                                <Button
                                    style={{width:150}}
                                    variant="outline-danger"
                                    onClick={()=> removeChosenPostCard(postCard.postCard.id)}
                                >
                                    Видалити
                                </Button>
                            </Col>
                        </Row>

                    )}
                    <Button
                        onClick={showPostCardModal}
                        className="mt-3"
                    >
                        Додати Декор
                    </Button>
                </div>

                <Form>
                    {isUpd?
                        <div></div>
                        :<Form.Label style={{color:"red"}}> * - обов'язкові поля</Form.Label>}

                    <Form.Control
                        className="mt-3"
                        onChange={e => setClientName(e.target.value)}
                        placeholder={ isUpd? "Введіть ім'я клієнта":"*Введіть ім'я клієнта"}

                        value={clientName}
                    />
                    <Form.Control
                        className="mt-3"
                        onChange={e => setClientPhone(e.target.value)}
                        placeholder={"Введіть телефон клієнта"}
                        type="phone"
                        value={clientPhone}
                    />
                    <Form.Control
                        className="mt-3"
                        onChange={e => setDateToSend(e.target.value)}
                        placeholder={"Введіть дату відправки"}
                        value={dateToSend}
                    />
                    <Form.Control
                        className="mt-3"
                        onChange={e => setCity(e.target.value)}
                        placeholder={"Введіть місто доставки"}
                        value={city}
                    />
                    <Form.Control
                        className="mt-3"
                        onChange={e => setDepartment(e.target.value)}
                        placeholder={"Введіть відділення  НП"}
                        value={department}
                    />
                    {chosenPostCard.length === 0
                        ?<div></div>
                        : <Form.Control
                            className="mt-3"
                            onChange={e => setPostCardText(e.target.value)}
                            placeholder={"Коментар до декору"}
                            value={postCardText}
                        />
                    }


                    <Form.Control
                        className="mt-3"
                        onChange={e => setComment(e.target.value)}
                        placeholder={"Коментар"}
                        value={comment}
                    />

                    <Row className="d-flex justify-content-between align-items-center"
                         style={{marginTop:20, marginLeft:0}}
                    >

                        <Form.Control
                            style={{width:620}}
                            onChange={e => setPrice(Number(e.target.value))}
                            placeholder={isUpd?"Введіть ціну":"*Введіть ціну"}
                            type="number"
                            value={price}
                        />
                        <Button
                            style={{width:150}}
                            variant="outline-primary"
                            onClick={calcPrice}
                        >
                            Розрахувати
                        </Button>
                    </Row>
                    <Dropdown className="mt-3">
                        <Dropdown.Toggle>{status||"Оберіть стан замовлення"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {order.status.map(status =>
                                <Dropdown.Item
                                    onClick={() => setStatus(status.title)}
                                    key={status.id}
                                >
                                    {status.title}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>

                    </Dropdown>
                    <Dropdown className="mt-3">
                        <Dropdown.Toggle>{paymentStatus || "Оберіть стан оплати"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {order.paymentStatus.map(paymentStat =>
                                <Dropdown.Item
                                    onClick={() => setPaymentStatus(paymentStat.title)}
                                    key={paymentStat.id}
                                >
                                    {paymentStat.title}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>

                    </Dropdown>

                </Form>
                <hr/>

            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={refreshAndHide}>Закрити</Button>
                <Button variant={"outline-success"} onClick={addOrder}>{isUpd?"Зберегти":"Додати"}</Button>
            </Modal.Footer>
        </Modal>

        <Modal
            show={boxModalVisible}
            onHide={()=> {setBoxModalVisible(false)
            setSearchQueryBox('')}}

            size="lg"
            centered
        >
            <ModalHeader closeButton>
                <ModalTitle>
                    Додати Бокс
                </ModalTitle>
            </ModalHeader>
            <ModalBody
                style={{minHeight:500}}
            >
                <MyAlert show={showAlert} setShow={setShowAlert}/>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Пошук.."
                        value={searchQueryBox}
                        onChange={event => {
                            setSearchQueryBox(event.target.value)
                            searchBoxList()
                        }}

                    />

                </InputGroup>
                <Row className="d-flex justify-content-around">
                    {searchedBox.length ===0
                        ?<h3 className="d-flex justify-content-center ">Нічого не знайдено(</h3>
                        :searchedBox.map(box =>
                        <Card key={box.id} style={{ width: 300 }} className="m-2 p-0">
                            <Card.Img variant="top" src={process.env.REACT_APP_API_URL + box.img} width={300} height={300} />
                            <Card.Body>
                                <Card.Title>{box.name}</Card.Title>
                                <Card.Text>
                                    {box.price} грн
                                </Card.Text>
                                <Button
                                    style={{marginTop:10}}
                                    onClick={()=> {
                                        addChosenBox(box)
                                        }
                                    }
                                    variant="primary"
                                >
                                    Додати
                                </Button>
                            </Card.Body>
                        </Card>
                    )}

                </Row>

            </ModalBody>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={()=> setBoxModalVisible(false)}>Закрити</Button>
            </Modal.Footer>

        </Modal>
            <Modal
                show={postCardModalVisible}
                onHide={()=> {setPostCardBoxModalVisible(false)
                setSearchQueryPostCard('')}}
                size="lg"
                centered
            >
                <ModalHeader closeButton>
                    <ModalTitle>
                        Додати Декор
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <MyAlert show={showAlert} setShow={setShowAlert}/>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Пошук.."
                            value={searchQueryPostCard}
                            onChange={event => {
                                setSearchQueryPostCard(event.target.value)
                                searchPostCardList()
                            }}

                        />

                    </InputGroup>
                    <Row className="d-flex justify-content-around">

                        {searchedPostCard.length ===0
                            ?<h3 className="d-flex justify-content-center ">Нічого не знайдено(</h3>
                            :searchedPostCard.map(postCard =>
                            <Card key={postCard.id} style={{ width: 300 }} className="m-2 p-0">
                                <Card.Img variant="top" src={process.env.REACT_APP_API_URL + postCard.img} width={300} height={300} />
                                <Card.Body>
                                    <Card.Title>{postCard.name}</Card.Title>
                                    <Card.Text>
                                        {postCard.price} грн
                                    </Card.Text>
                                    <Button
                                        onClick={()=> addChosenPostCard(postCard)}
                                        variant="primary"
                                    >
                                        Додати
                                    </Button>
                                </Card.Body>
                            </Card>

                        )}
                    </Row>

                </ModalBody>
                <Modal.Footer>
                    <Button variant={"outline-danger"} onClick={()=> setPostCardBoxModalVisible(false)}>Закрити</Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export default CreateOrder;