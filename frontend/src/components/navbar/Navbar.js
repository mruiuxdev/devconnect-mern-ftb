import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Menu() {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#home" className="fw-bold text-primary">
          DevConnect
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link href="#home">Developers</Nav.Link>
            <Nav.Link as="span">
              <a
                href="/"
                className="btn btn-primary text-white rounded-pill py-2"
              >
                Register
              </a>
            </Nav.Link>
            <Nav.Link as="span">
              <a
                href="/"
                className="btn btn-outline-secondary rounded-pill py-2"
              >
                Login
              </a>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
