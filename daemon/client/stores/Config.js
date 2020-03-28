/**
 * Created by taushif on 26/02/2017.
 */
import qs from "qs"
import {observable, action, toJS} from 'mobx'

export default class Config {

    @observable Id = "";
    @observable City = "";
    @observable Enabled = [];

    @action fetch() {

        fetch('http://localhost:3000/config?timestamp=' + new Date().getTime())
            .then(response => response.json())
            .then(json => {
                this.Id = json.Id
                this.City = json.City
                this.Enabled = json.Enabled
            })
            .catch(err => {
                alert( "error, kon instellingen niet ophalen" )
            })
    }

    @action update() {

        const data = { Id: this.Id, City: this.City }

        let queryString = qs.stringify(data)

        this.Enabled.forEach(prayer => {
            queryString += "&Enabled=" + prayer
        })

        fetch(`http://localhost:3000/configu?${queryString}`)
            .then(response => response.json())
            .then(json => {
                this.fetch()
            })
            .catch(err => {
                console.log(err)
                alert( "error, kon instellingen niet bijwerken" )
            })
    }

    @action brightness(amount = 100) {
        fetch('http://localhost:3000/brightness?amount=' + amount)
    }

    @action fullscreen() {
        fetch('http://localhost:3000/fullscreen')
    }

    @action stop() {
        fetch('http://localhost:3000/stop')
    }
}