import { useAuth } from 'providers/AuthProvider';
import React, { useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarTop = () => {
  const [userFromStorage, setUserFromStorage] = useState(
    JSON.parse(localStorage.getItem('user'))
  );
  const { auth, setAuth } = useAuth();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ ...auth, loggedIn: false });
  };
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Demo Site
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {auth.loggedIn ? (
              <>
                <Nav.Link as={Link} to="/">
                  Documentation
                </Nav.Link>

                <Nav.Link as={Link} to="spotify">
                  Spotify Demo
                </Nav.Link>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Container className="d-flex justify-content-end">
        {auth.loggedIn ? (
          <Button as={Link} to="/" onClick={logout}>
            Logout
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
