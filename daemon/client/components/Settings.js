/**
 * Created by taushif on 08/01/2017.
 */
import React, {Component} from 'react'

import {Grid, Row, Col, ListGroup, ListGroupItem, ButtonGroup, Button} from 'react-bootstrap'

import {inject, observer} from 'mobx-react'

@inject("stores") @observer
export default class Settings extends Component {

    setCity = (e) => {

        const {stores} = this.props
        stores.config.City = e.target.innerHTML

        stores.config.update()

        setTimeout(() => {
            stores.prayers.fetch()
        }, 1000)
    }

    setBrightness(amount) {
        this.props.stores.config.brightness(amount)
    }

    render() {

        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h3>Stad</h3>

                        <ListGroup className="btn-lg">
                            <ListGroupItem onClick={this.setCity}>Amsterdam</ListGroupItem>
                            <ListGroupItem onClick={this.setCity}>Den Haag</ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <h3>Brightness</h3>

                        <ButtonGroup bsSize="large">
                            <Button onClick={this.setBrightness.bind(this, 20)}>20</Button>
                            <Button onClick={this.setBrightness.bind(this, 50)}>50</Button>
                            <Button onClick={this.setBrightness.bind(this, 80)}>80</Button>
                            <Button onClick={this.setBrightness.bind(this, 100)}>100</Button>
                            <Button onClick={this.setBrightness.bind(this, 150)}>150</Button>
                            <Button onClick={this.setBrightness.bind(this, 200)}>200</Button>
                            <Button onClick={this.setBrightness.bind(this, 255)}>255</Button>
                        </ButtonGroup>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <h3>Media control</h3>

                        <ButtonGroup bsSize="large">
                            <Button onClick={() => this.props.stores.config.stop()}>
                                <i className="fa fa-stop" />
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Grid>
        )
    }
}