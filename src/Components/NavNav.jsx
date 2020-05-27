import React from 'react';
import { loginUser, logoutUser } from '../_Redux/Actions'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

const NavNav = () => {

const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)
console.log(isAuthenticated);
const dispatchLogin = useDispatch(loginUser())
const dispatchlogout = useDispatch(logoutUser())

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">TerTwii</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Accueil</Nav.Link>
                <NavDropdown title="Compte" id="basic-nav-dropdown">
                    {!isAuthenticated && 
                    <div>
                    <NavDropdown.Item href="/connexion">Connexion</NavDropdown.Item>
                    <NavDropdown.Item href="/inscription">Inscription</NavDropdown.Item></div>}
                    {isAuthenticated && 
                    <NavDropdown.Item href="/profil">Profil</NavDropdown.Item>}
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )  
} 

export default NavNav