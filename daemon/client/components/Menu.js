/**
 * Created by taushif on 08/01/2017.
 */
import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { inject, observer } from 'mobx-react'
import screenfull from "screenfull"
import { Navbar, Nav, NavItem } from 'react-bootstrap'

@inject("stores") @observer
export default class Menu extends Component {

    render() {

	const { stores } = this.props

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
		    
                    {stores.prayers.errors === 3 && (
                        <NavItem onClick={() => {
                            stores.prayers.errors = 0
                        }}>
                            <span className="fa fa-plug inactive" />
                        </NavItem>
                    )}
                    <NavItem onClick={() => {
                        if (screenfull.isEnabled) {
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