import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectMode } from '../app/appSlice';
import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import defaultLogo from '../images/defaultNavLogo.svg';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import ThemeToggle from './ThemeToggle';

import Foto from '../images/minhafoto.jpg';

const navLinks = {
  routes: [
    { id: '1R', name: 'Home', route: '/' },
    { id: '2R', name: 'All Projects', route: '/All-Projects' },
  ],
  to: [
    { id: '1T', name: 'Home', to: 'Home' },
    { id: '2T', name: 'About Me', to: 'About' },
    { id: '3T', name: 'Skills', to: 'Skills' },
    { id: '4T', name: 'Projects', to: 'Projects' },
    { id: '5T', name: 'Contact', to: 'Contact' },
  ],
};

const StyledDiv = styled.div`
  .navbar {
    border-bottom: var(--border);
  }

  .spacer {
    height: var(--nav-height);
  }

  .logo-img {
    background: ${({ theme }) =>
      theme.name === 'light' ? 'var(--bs-dark)' : 'var(--bs-light)'};
  }
`;

const propTypes = {
  Logo: PropTypes.node,
  callBack: PropTypes.func,
  closeDelay: PropTypes.number,
};

const NavBar = ({ Logo = defaultLogo, callBack, closeDelay = 125 }) => {
  const theme = useSelector(selectMode);
  const [isExpanded, setisExpanded] = React.useState(false);
  const { pathname } = useLocation();
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <StyledDiv>
      <div className="spacer" />
      <Navbar
        id="nav"
        collapseOnSelect={true}
        expand="xl"
        expanded={isExpanded}
        bg={theme === 'light' ? 'light' : 'dark'}
        variant={theme === 'light' ? 'light' : 'dark'}
        fixed="top"
      >
        <Container>
          <Navbar.Brand>
            <img
              alt="Logo"
              src={Foto}
              width="35"
              height="35"
              className="rounded-circle logo-img"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setisExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav navbarScroll className="me-auto">
              {pathname === '/'
                ? navLinks.to.map((el) => {
                    return (
                      <Nav.Item key={el.id}>
                        <ScrollLink
                          to={el.to}
                          spy={true}
                          smooth={true}
                          duration={500}
                          className="nav-link"
                          onClick={() => {
                            setTimeout(() => {
                              setisExpanded(false);
                            }, closeDelay);
                          }}
                        >
                          {t(el.name)}
                        </ScrollLink>
                      </Nav.Item>
                    );
                  })
                : navLinks.routes.map((el) => {
                    return (
                      <Nav.Item key={el.id}>
                        <RouterLink
                          to={el.route}
                          className={
                            pathname === el.route
                              ? 'nav-link active'
                              : 'nav-link'
                          }
                          onClick={() => {
                            setTimeout(() => {
                              setisExpanded(false);
                            }, closeDelay);
                          }}
                        >
                          {t(el.name)}
                        </RouterLink>
                      </Nav.Item>
                    );
                  })}
            </Nav>
            <Nav>
              <Dropdown style={{ marginRight: '1rem' }}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {i18n.language.toUpperCase()}
                </Dropdown.Toggle>

                <Dropdown.Menu className='drop'>
                  <Dropdown.Item onClick={() => changeLanguage('en')}>
                    English
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('pt')}>
                    Português
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('es')}>
                    Español
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <ThemeToggle
                closeDelay={closeDelay}
                setExpanded={setisExpanded}
                setTheme={callBack}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </StyledDiv>
  );
};

NavBar.propTypes = propTypes;

export default NavBar;