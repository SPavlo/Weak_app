import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Spinner} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils";
import {check, login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {

    const {user} = useContext(Context)
    const  location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const signIn = async () =>{
        try {
            let data;
            data = await login(email,password)
            check().then(data => {

                user.setUser(user)
                user.setIsAuth(true)


            }).finally(()=> {
                console.log(user.isAuth)
                navigate(MAIN_ROUTE)
                setLoading(false)
            })
            if(loading){
                return <Spinner animation={"grow"}/>
            }
        }catch (e) {
            alert(e.response.data.message)
        }

    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height:window.innerHeight - 54}}
        >
            <Card style={{width:600}} className="p-5">
                <h2 className="m-auto">Авторизація</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        onKeyUp={(e)=>{
                            if(e.code === 'Enter') signIn()
                        }}
                        className="mt-3"
                        placeholder="Введіть логін"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        onKeyUp={(e)=>{
                            if(e.code === 'Enter') signIn()
                        }}
                        className="mt-3"
                        placeholder="Введіть пароль"
                        value={password}
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        onClick={signIn}
                        className="mt-3 align-self-end"
                        variant={"outline-success"}
                    >
                        Увійти
                    </Button>
                </Form>
            </Card>

        </Container>
    );
});

export default Auth;