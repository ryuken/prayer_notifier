/**
 * Created by taushif on 26/02/2017.
 */
import {observable, action} from 'mobx'

export default class Prayers {

    @observable errors = 0;
    @observable items = [];
    @observable nextPrayer = {}

    @action fetch = () => {

	if(this.errors < 3) {

		fetch('http://localhost:3000/today?timestamp=' + new Date().getTime())
		    .then(response => response.json())
		    .then(json => {
				this.errors = 0
				this.items = json
		    })
		    .catch(err => {
				this.errors++
				alert("error, kon gebedstijden niet ophalen")
		    })
		}
    }

    @action fetchNext = () => {

		if(this.errors < 3) {

			fetch('http://localhost:3000/nextPrayer?timestamp=' + new Date().getTime())
				.then(response => response.json())
				.then(json => {
					this.errors = 0
					this.nextPrayer = json.prayer
				})
				.catch(err => {
					this.errors++
					alert( "error, kon volgend gebed niet ophalen" )
				})
		}
    }
}
