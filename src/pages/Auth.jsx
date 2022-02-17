import React, {useContext, useState} from 'react';
import {Card, Container, Form} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {NavLink, useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Auth = observer( () => {
  const {user} = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    var today = new Date(),
      date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    try {
      let data;
      if (isLogin) {
        data = await login(email,password);
      } else {
        data = await registration(name, email, password);
      }
      user.setUser(user)
      user.setIsAuth(true)
      navigate(ADMIN_ROUTE)
    } catch (e) {
      alert (e.response.data.message)
    }
  }

  return (
    <Container className='d-flex justify-content-center align-items-center'
               style={{height: window.innerHeight - 54}}>
      <Card style={{width: 600}} className="p-5">
        <h2 className='m-auto'>{isLogin ? 'Authorisation' : 'Registration'}</h2>
        <Form className='d-flex flex-column'>
          {!isLogin ?
            <Form.Control
              className='mt-2'
              placeholder='Enter your name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            :
            null
          }
          <Form.Control
            className='mt-2'
            placeholder='Enter your email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className='mt-2'
            placeholder='Enter your password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
          />
          <Row className='d-flex justify-content-between mt-3 pl-5 pr-5'>
            {isLogin ?
              <div>
                No account? <NavLink to={REGISTRATION_ROUTE}>Sign up</NavLink>
              </div>
              :
              <div>
                Have an account? <NavLink to={LOGIN_ROUTE}>Log in</NavLink>
              </div>
            }
            <Button
              variant={"outline-success"}
              onClick={click}
            >
              {isLogin ? 'Log in' : 'Registration'}
              </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;