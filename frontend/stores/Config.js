/**
 * Created by taushif on 26/02/2017.
 */
import qs from "qs"

import { signal } from "@preact/signals-react"
import { toast } from "sonner"

export const Id = signal("");
export const City = signal("");
export const MPD = signal("");
export const Enabled = signal([]);

export const fetchConfig = () => {

    fetch('http://localhost:3000/config?timestamp=' + new Date().getTime())
        .then(response => response.json())
        .then(json => {
            Id.value = json.Id
            City.value = json.City
            Enabled.value = json.Enabled
        })
        .catch(err => {
            toast.error("Error - Kon instellingen niet ophalen.", { position: "bottom-right" })
        })
}

export const update = () => {

    const data = { Id: Id.value, City: City.value }

    let queryString = qs.stringify(data)

    Enabled.value.forEach(prayer => {
        queryString += "&Enabled=" + prayer
    })

    fetch(`http://localhost:3000/configu?${queryString}`)
        .then(response => response.json())
        .then(json => fetchConfig)
        .catch(err => {
            toast.error("Error - Kon instellingen niet bijwerken.", { position: "bottom-right" })
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