/**
 * Created by taushif on 08/01/2017.
 */
import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { inject } from 'mobx-react'
import screenfull from "screenfull"
import { Navbar, Nav, NavItem } from 'react-bootstrap'

@inject("stores")
export default class Menu extends Component {

    render() {
        return (
            <Navbar fixedTop fluid>
                <Nav pullLeft>
                    <NavItem><Link to="/">Home</Link></NavItem>
                    <NavItem><Link to="/settings">Instellingen</Link></NavItem>
                    <NavItem onClick={() => {window.location.reload()}}>
                        <span className="fa fa-refresh" />
                    </NavItem>
                    <NavItem>
                        <Link to="/clock">
                            <span className="fa fa-clock-o" />
                        </Link>
                    </NavItem>
                </Nav>

                <Nav pullRight>
                    <NavItem onClick={() => {
                        if (screenfull.enabled) {
                            screenfull.toggle();
                        }
                    }}>
                        <span className="fa fa-arrows-alt" />
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}
