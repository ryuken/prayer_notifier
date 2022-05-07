/**
 * Created by taushif on 26/02/2017.
 */
import {makeObservable, observable, runInAction, action} from 'mobx'

export default class Reminders {

    @observable errors = 0;
    @observable items = [];

	constructor() {
        makeObservable(this)
    }

    @action fetch() {

		if(this.errors < 3) {

			fetch('http://localhost:3000/reminders?timestamp=' + new Date().getTime())
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

					alert("error, kon reminders niet ophalen")
				})
		}
    }

	@action resetErrors() {
		this.errors = 0
	}
}
