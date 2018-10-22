/**
 * Created by taushif on 26/02/2017.
 */

import {observable, action, toJS} from 'mobx'
import $ from 'jquery'

export default class Config {

    @observable City = "";
    @observable Enabled = [];

    @action fetch() {

        $.get('http://localhost:3000/config', (json) => {
            this.City = json.City
            this.Enabled = json.Enabled
        })
        .fail(function() {
            alert( "error, kon instellingen niet ophalen" );
        })
    }

    @action update() {

        const data = { City: this.City, Enabled: toJS(this.Enabled) }

        console.log(data)

        $.ajax({
            method : "post",
            url : 'http://localhost:3000/config',
            data : JSON.stringify(data),
            success: (json) => {
                this.fetch()
            },
            error : function() {
                alert( "error, kon instellingen niet bijwerken" );
            }
        })
    }

    @action brightness(amount = 100) {
        $.ajax({
            method : "get",
            url : 'http://localhost:3000/brightness?amount=' + amount
        })
    }

    @action fullscreen() {
        $.ajax({
            method : "get",
            url : 'http://localhost:3000/fullscreen'
        })
    }
}
