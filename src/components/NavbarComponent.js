import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={"assets/images/icon.png"} alt="icon" />
          <strong> Kasir</strong> App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/pesanan">Pesanan</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
