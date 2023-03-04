import { Navbar, Nav, Container } from 'react-bootstrap'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom"
import "./Navigation.css"
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
const Navigation = () => {
  const [user, setUser] = useState(null)


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
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/Contact">Contact</Nav.Link>
                  <Nav.Link as={Link} to="/Activities">Your Activities</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="#people">People</Nav.Link>
                  <Nav.Link eventKey={2} href="#Sign Out">Sign Out</Nav.Link>
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