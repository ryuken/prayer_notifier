/**
 * Created by taushif on 26/02/2017.
 */
import {observable, action} from 'mobx'
import $ from 'jquery'

export default class Prayers {

    @observable items = [];
    @observable nextPrayer = {}

    @action fetch() {

        $.get('http://localhost:3000/today', (json) => {
            this.items = json
        })
        .fail(function() {
            alert( "error, kon gebedstijden niet ophalen" );
        })
    }

    @action fetchNext() {
        $.get('http://localhost:3000/nextPrayer', (json) => {
            this.nextPrayer = json.prayer
        })
        .fail(function() {
            alert( "error, kon volgend gebed niet ophalen" );
        })
    }
}
