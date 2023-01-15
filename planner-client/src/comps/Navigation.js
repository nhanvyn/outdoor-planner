import { Navbar, Nav, Container } from 'react-bootstrap'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom"
import "./Navigation.css"

const Navigation = () => {

  return (
    <div className='mb-3'>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">OutPlanner</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            <Nav.Link as={Link} to="/Contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/Activities">Your Activities</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>

  )
};

export default Navigation;