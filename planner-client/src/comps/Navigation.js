import { Navbar, Nav, Container } from 'react-bootstrap'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom"
import "./Navigation.css"
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from '../utils/toast';
const Navigation = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    showSuccessToast("Logged out successfully")
    navigate('/')
  }


  return (

    <div className='mb-3'>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>


          {user === null ? (
            <>
              <Navbar.Brand as={Link} to="/">OutPlanner</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>

                <Nav>
                  <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/Register">Register</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          ) : (
            <>
              <Navbar.Brand as={Link} to="/">OutPlanner</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav>

                  <Nav.Link as={Link} to="/Activities">Activities</Nav.Link>
                  <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                  <Nav.Link>Welcome, {user.name}</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          )}


        </Container>
      </Navbar>
    </div>



  )
};

export default Navigation;