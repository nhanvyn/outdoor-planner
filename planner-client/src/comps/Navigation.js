import { Navbar, Nav, Container } from 'react-bootstrap'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom"
import "./Navigation.css"
import NavDropdown from 'react-bootstrap/NavDropdown';
const Navigation = () => {

  return (
    <div className='mb-3'>
      {/* <Navbar bg="light" variant="light">
        <Container>
          
         
        </Container>
      </Navbar> */}
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">OutPlanner</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>

              <Nav.Link as={Link} to="/Contact">Contact</Nav.Link>
              <Nav.Link as={Link} to="/Activities">Your Activities</Nav.Link>
            </Nav>
            
            
            <Nav>
              <Nav.Link href="#deets">Sign Up</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">People</Nav.Link>
            </Nav>
          
          
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>



  )
};

export default Navigation;