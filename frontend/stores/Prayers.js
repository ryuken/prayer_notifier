/**
 * Created by taushif on 26/02/2017.
 */
import { signal } from "@preact/signals-react"

export const errors = signal(0)
export const items = signal([])
export const nextPrayer = signal("")

export const fetchPrayers = (toast) => {

	if(errors.value < 3) {

		fetch('http://localhost:3000/today?timestamp=' + new Date().getTime())
			.then(response => response.json())
			.then(json => {
				errors.value = 0
				items.value = json
			})
			.catch(err => {
				
				errors.value++

				toast({
					title: "Error",
					description: "Kon gebedstijden niet ophalen.",
					variant: "destructive"
				})
			})
	}
}

export const fetchNext = (toast) => {

	if(errors.value < 3) {

		fetch('http://localhost:3000/nextPrayer?timestamp=' + new Date().getTime())
			.then(response => response.json())
			.then(json => {
				errors.value = 0
				nextPrayer.value = json.prayer
			})
			.catch(err => {
				
				errors.value++
				
				toast({
					title: "Error",
					description: "Kon volgend gebed niet ophalen.",
					variant: "destructive"
				})
			})
	}
}

export const resetErrors = () => {
	errors.value = 0
}