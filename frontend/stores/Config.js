/**
 * Created by taushif on 26/02/2017.
 */
import qs from "qs"

import { signal } from "@preact/signals-react"

export const Id = signal("");
export const City = signal("");
export const MPD = signal("");
export const Enabled = signal([]);

export const fetchConfig = (toast) => {

    fetch('http://localhost:3000/config?timestamp=' + new Date().getTime())
        .then(response => response.json())
        .then(json => {
            Id.value = json.Id
            City.value = json.City
            Enabled.value = json.Enabled
        })
        .catch(err => {
            toast({
                title: "Error",
                description: "Kon instellingen niet ophalen.",
                variant: "destructive"
            })
        })
}

export const update = (toast) => {

    const data = { Id: Id.value, City: City.value }

    let queryString = qs.stringify(data)

    Enabled.value.forEach(prayer => {
        queryString += "&Enabled=" + prayer
    })

    fetch(`http://localhost:3000/configu?${queryString}`)
        .then(response => response.json())
        .then(json => {
            fetchConfig(toast)
        })
        .catch(err => {
            toast({
                title: "Error",
                description: "Kon instellingen niet bijwerken.",
                variant: "destructive"
            })
        })
}

export const brightness = (amount = 100) => {
    fetch('http://localhost:3000/brightness?amount=' + amount)
}

export const fullscreen = () => {
    fetch('http://localhost:3000/fullscreen')
}

export const stop = () => {
    fetch('http://localhost:3000/stop')
}