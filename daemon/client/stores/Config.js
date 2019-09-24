/**
 * Created by taushif on 26/02/2017.
 */

import {observable, action, toJS} from 'mobx'

export default class Config {

    @observable City = "";
    @observable Enabled = [];

    @action fetch() {

        fetch('http://localhost:3000/config?timestamp=' + new Date().getTime())
            .then(response => response.json())
            .then(json => {
                this.City = json.City
                this.Enabled = json.Enabled
            })
            .catch(err => {
                alert( "error, kon instellingen niet ophalen" )
            })
    }

    @action update() {

        const data = { City: this.City, Enabled: toJS(this.Enabled) }

        fetch('http://localhost:3000/config', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                this.fetch()
            })
            .catch(err => {
                alert( "error, kon instellingen niet bijwerken" )
            })
    }

    @action brightness(amount = 100) {
        fetch('http://localhost:3000/brightness?amount=' + amount)
    }

    @action fullscreen() {
        fetch('http://localhost:3000/fullscreen')
    }
}
