import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { loginUser, logoutUser } from '../_Redux/Actions'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'

const NavNav = () => {

    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)

    const disconnect = () => {
        dispatch(logoutUser())
    }

    return (
        <Navbar bg="light" expand="lg">
            <Link to="/"><Navbar.Brand >TerTwii</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link><Link to="/">Accueil</Link></Nav.Link>
                <NavDropdown title="Compte" id="basic-nav-dropdown">
                    {!isAuthenticated && 
                    <div>
                    <NavDropdown.Item><Link to="/connexion">Connexion</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/inscription">Inscription</Link></NavDropdown.Item>
                    </div>}
                    {isAuthenticated &&
                    <div>
                    <NavDropdown.Item><Link to="/profil">Profil</Link></NavDropdown.Item>
                    <Button onClick={disconnect} className="ml-2" variant="outline-warning">Se déconnecter</Button>
                    </div>
                    }
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )  
} 

export default NavNav