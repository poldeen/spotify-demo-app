import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarTop = () => {
  const [userFromStorage, setUserFromStorage] = useState(
    JSON.parse(localStorage.getItem('user'))
  );

  useEffect(() => {
    setUserFromStorage(JSON.parse(localStorage.getItem('user')));
  });

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
            {userFromStorage === null ? null : (
              <>
                <Nav.Link as={Link} to="/">
                  Documentation
                </Nav.Link>

                <Nav.Link as={Link} to="spotify">
                  Spotify Demo
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Container>
        {userFromStorage === null ? null : (
          <Button as={Link} to="/" onClick={logout}>
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
