import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png'

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
            <img src={logo} width="300"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#home">General Feed</Nav.Link>
            <Nav.Link href="#home">Login</Nav.Link>
            <Nav.Link href="#home">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;