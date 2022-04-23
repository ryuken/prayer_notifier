/**
 * Created by taushif on 26/02/2017.
 */
import {makeObservable, observable, runInAction, action} from 'mobx'

export default class Prayers {

    @observable errors = 0;
    @observable items = [];
    @observable nextPrayer = ""

	constructor() {
        makeObservable(this)
    }

    @action fetch() {

		if(this.errors < 3) {

			fetch('http://localhost:3000/today?timestamp=' + new Date().getTime())
				.then(response => response.json())
				.then(json => {

					runInAction(() => {
						this.errors = 0

						this.items = json
					})
				})
				.catch(err => {
					
					runInAction(() => {
						this.errors++
					})

					alert("error, kon gebedstijden niet ophalen")
				})
		}
    }

    @action fetchNext() {

		if(this.errors < 3) {

			fetch('http://localhost:3000/nextPrayer?timestamp=' + new Date().getTime())
				.then(response => response.json())
				.then(json => {

					runInAction(() => {
						this.errors = 0
						this.nextPrayer = json.prayer
					})
				})
				.catch(err => {
					
					runInAction(() => {
						this.errors++
					})
					
					alert( "error, kon volgend gebed niet ophalen" )
				})
		}
    }

	@action resetErrors() {
		this.errors = 0
	}
}
