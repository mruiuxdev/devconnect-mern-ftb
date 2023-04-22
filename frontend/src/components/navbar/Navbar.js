import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Menu = () => {
  return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand as="span" className="fw-bold text-primary h1 mb-0 ">
          <Link className="text-decoration-none" to="/">
            DevConnect
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link href="#home">Developers</Nav.Link>
            <Nav.Link as="span">
              <Link
                to="/register"
                className="btn btn-primary text-white rounded-pill py-2"
              >
                Register
              </Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link
                to="/login"
                className="btn btn-outline-secondary rounded-pill py-2"
              >
                Login
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
