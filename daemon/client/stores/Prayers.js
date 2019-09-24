/**
 * Created by taushif on 26/02/2017.
 */
import {observable, action} from 'mobx'

export default class Prayers {

    @observable items = [];
    @observable nextPrayer = {}

    @action fetch() {

        fetch('http://localhost:3000/today?timestamp=' + new Date().getTime())
            .then(response => response.json())
            .then(json => {
                this.items = json
            })
            .catch(err => {
                alert("error, kon gebedstijden niet ophalen")
            })
    }

    @action fetchNext() {

        fetch('http://localhost:3000/nextPrayer?timestamp=' + new Date().getTime())
            .then(response => response.json())
            .then(json => {
                this.nextPrayer = json.prayer
            })
            .catch(err => {
                alert( "error, kon volgend gebed niet ophalen" )
            })
    }
}