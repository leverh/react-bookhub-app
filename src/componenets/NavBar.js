import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/" className="nav-link">
          <Navbar.Brand>
            <img src={logo} alt="BookHub logo" height="40" />
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left navbar-special">
            <NavLink exact className={`${styles.NavLink} nav-link`} activeClassName={styles.Active} to="/">
              <span><i className="fas fa-igloo"></i>Home</span>
            </NavLink>

            <NavLink exact className={`${styles.NavLink} nav-link`} activeClassName={styles.Active} to="/reviews">
              <span><i className="fas fa-book"></i>Reviews</span>
            </NavLink>

            <NavLink exact className={`${styles.NavLink} nav-link`} activeClassName={styles.Active} to="/profile">
              <span><i className="fas fa-user"></i>My Profile</span>
            </NavLink>

            <NavLink exact className={`${styles.NavLink} nav-link`} activeClassName={styles.Active} to="/signin">
              <span><i className="fas fa-sign-in-alt"></i>Sign in</span>
            </NavLink>

            <NavLink exact className={`${styles.NavLink} nav-link`} activeClassName={styles.Active} to="/signup">
              <span><i className="fas fa-user-plus"></i>Sign up</span>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;