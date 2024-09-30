/**
 * Created by taushif on 26/02/2017.
 */
import { signal } from "@preact/signals-react"

export const errors = signal(0)
export const items = signal([])

export const fetchReminders = (toast) => {

	if(errors.value < 3) {

		fetch('http://localhost:3000/reminders?timestamp=' + new Date().getTime())
			.then(response => response.json())
			.then(json => {

				errors.value = 0
				items.value = json
			})
			.catch(err => {
				
				errors.value++
				
				toast({
					variant: "destructive",
					title: "Error",
					description: "Kon reminders niet ophalen."
				})
			})
	}
}

export const resetErrors = () => {
	errors.value = 0
}
