/**
 * Created by taushif on 08/01/2017.
 */
import React, {Component} from 'react'

import {inject, observer} from 'mobx-react'

import Button, { ButtonGroup } from "../components/Button"

class Settings extends Component {

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
            <div className="flex justify-center">
                <div className="block mt-6 p-6 rounded-lg shadow-lg bg-white bg-opacity-50">
                    {/*
                    <div className='col-12'>
                        <h3>Stad</h3>

                        <ListGroup className="btn-lg">
                            <ListGroupItem onClick={this.setCity}>Amsterdam</ListGroupItem>
                            <ListGroupItem onClick={this.setCity}>Den Haag</ListGroupItem>
                        </ListGroup>    
                    </div>
                    */}
                
                    <div className='p-3'>
                        <h3>Brightness</h3>

                        <ButtonGroup size="lg">
                            <Button onClick={this.setBrightness.bind(this, 20)}>20</Button>
                            <Button onClick={this.setBrightness.bind(this, 50)}>50</Button>
                            <Button onClick={this.setBrightness.bind(this, 80)}>80</Button>
                            <Button onClick={this.setBrightness.bind(this, 100)}>100</Button>
                            <Button onClick={this.setBrightness.bind(this, 150)}>150</Button>
                            <Button onClick={this.setBrightness.bind(this, 200)}>200</Button>
                            <Button onClick={this.setBrightness.bind(this, 255)}>255</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        )
    }
}

export default inject("stores")(observer(Settings))