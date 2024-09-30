"use client"

import React, { useEffect, useState } from 'react'

import { useToast } from "@/hooks/use-toast"

import Menu from "./Menu"

import { fetchPrayers, fetchNext } from "../stores/Prayers"
import { fetchReminders } from "../stores/Reminders"
import { fetchConfig } from "../stores/Config"

const Layout = ({ children }) => {

    const { toast } = useToast()

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

        fetchPrayers(toast)
        fetchNext(toast)
        fetchReminders(toast)
        fetchConfig(toast)

        changeBackground()

        setState({
            poller : setInterval(() => {
                fetchNext(toast)
            }, 1000)
        })

        return () => clearInterval(state.poller)
        
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

export default Layout