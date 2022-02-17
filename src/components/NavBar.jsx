import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import Button from "react-bootstrap/Button";
import {observer} from "mobx-react-lite";


const NavBar = observer(() => {

  const {user} = useContext(Context)
  const navigate = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    navigate(LOGIN_ROUTE)
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        {user.isAuth ?
          <Nav className="m-auto" style={{color: 'white'}}>
            <Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)}>Admin Panel</Button>
            <Button variant={'outline-light'} onClick={() => logOut()} >Log out</Button>
          </Nav>
          :
          <Nav className="m-auto" style={{color: 'white'}}>
            <Button variant={'outline-light'} onClick={() =>  navigate(LOGIN_ROUTE)}>Authorization</Button>
          </Nav>
        }
      </Container>
    </Navbar>
  );
})

export default NavBar;