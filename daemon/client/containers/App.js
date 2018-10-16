import React, { Component, PropTypes } from 'react'

import { withRouter } from "react-router"
import {inject, observer} from 'mobx-react'

import Menu from '../components/Menu'

@withRouter @inject("stores") @observer
export default class App extends React.Component {

    state = {
        poller : null,
        backgrounds : [
            '/img/backgrounds/islamic_wallpaper_2.jpg',
            '/img/backgrounds/islamic_wallpaper_3.jpg',
            '/img/backgrounds/islamic_wallpaper_10.jpg',
            '/img/backgrounds/bismillah.jpg',
        ]
    }

    componentDidMount() {

        const {stores} = this.props
        stores.prayers.fetch()
        stores.config.fetch()

        this.changeBackground()

        this.setState({
            poller : setInterval(function() {
                stores.prayers.fetchNext()
            }, 1000)
        })
    }

    changeBackground() {

        const {backgrounds} = this.state

        if(window.screen.width >= 800) {

            const randomIndex = Math.floor(Math.random() * (backgrounds.length - 1))

            const body = document.querySelector('body')
            body.style['background-image'] = `url('${backgrounds[randomIndex]}')`
            body.style.color = "#fff"
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.poller)
    }

    render() {

        return (
            <div>
                <Menu />

                <div id="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
