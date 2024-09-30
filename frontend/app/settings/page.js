"use client"

import React, { Suspense } from 'react'

import { useToast } from "@/hooks/use-toast"
import Button, { ButtonGroup } from "@/components/Button"

import { fetchPrayers } from "@/stores/Prayers"
import { City, update, brightness } from "@/stores/Config"

import clx from "classnames"

import { Circle, CircleCheck } from "lucide-react"

const Settings = () => {


    const setCity = (e) => {

        City.value = e.target.innerHTML

        update()

        setTimeout(() => {
            fetchPrayers()
        }, 1000)
    }

    const setBrightness = (amount) => {
        brightness(amount)
    }
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
                        <Button onClick={() => setBrightness(20)}>20</Button>
                        <Button onClick={() => setBrightness(50)}>50</Button>
                        <Button onClick={() => setBrightness(80)}>80</Button>
                        <Button onClick={() => setBrightness(100)}>100</Button>
                        <Button onClick={() => setBrightness(150)}>150</Button>
                        <Button onClick={() => setBrightness(200)}>200</Button>
                        <Button onClick={() => setBrightness(255)}>255</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}

export default Settings