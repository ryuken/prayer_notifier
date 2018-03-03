/**
 * Created by taushif on 08/01/2017.
 */
import React, {Component} from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {inject} from 'mobx-react'

@inject("stores")
export default class Menu extends Component {

    render() {
        return (
            <Navbar fixedTop fluid>
                <Nav pullLeft>
                    <LinkContainer to="/">
                        <NavItem>Home</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/settings">
                        <NavItem>Instellingen</NavItem>
                    </LinkContainer>
                    <NavItem onClick={() => {window.location.reload()}}>
                        <span className="fa fa-refresh" />
                    </NavItem>
                </Nav>

                <Nav pullRight>
                    <NavItem onClick={() => { this.props.stores.config.fullscreen() }}>
                        <span className="fa fa-arrows-alt" />
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}