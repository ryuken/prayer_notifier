import React, { useEffect, useState } from 'react'

import { inject, observer } from 'mobx-react'

import dynamic from 'next/dynamic'
const Menu = dynamic(() => import("./Menu"), { ssr: false })

const Layout = ({ children, stores }) => {

    const [state, setState] = useState({
        poller : null,
        backgrounds : [
            'img/backgrounds/islamic_wallpaper_2.jpg',
            'img/backgrounds/islamic_wallpaper_3.jpg',
            'img/backgrounds/islamic_wallpaper_10.jpg',
            'img/backgrounds/bismillah.jpg',
        ]
    })

    useEffect(() => {

        stores.prayers.fetch()
        stores.config.fetch()

        changeBackground()

        setState({
            poller : setInterval(() => {
                stores.prayers.fetchNext()
            }, 1000)
        })

        // FIXME clearInterval(this.state.poller)
    }, [])

    const changeBackground = () => {

        const { backgrounds } = state

        if(window.screen.width >= 800) {

            const randomIndex = Math.floor(Math.random() * (backgrounds.length - 1))

            const body = document.querySelector('body')
            body.style['background-image'] = `url('${backgrounds[randomIndex]}')`
        }
    }

    return (
        <>
            <Menu />

            <div id="content" className="min-h-full">
                {children}
            </div>
        </>
    )
}

export default inject("stores")(observer(Layout))