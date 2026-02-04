/**
 * Created by taushif on 26/02/2017.
 */
import { signal } from "@preact/signals-react"
import { toast } from "sonner"

export const errors = signal(0)
export const items = signal([])
export const nextPrayer = signal("")

export const fetchPrayers = () => {

	if (errors.value < 3) {

		fetch('http://localhost:3000/today?timestamp=' + new Date().getTime())
			.then(response => response.json())
			.then(json => {
				errors.value = 0
				items.value = json
			})
			.catch(err => {

				errors.value++

				toast.error("Error - Kon gebedstijden niet ophalen.", { position: "bottom-right" })
			})
	}
}

export const fetchNext = () => {

	if (errors.value < 3) {

		fetch('http://localhost:3000/nextPrayer?timestamp=' + new Date().getTime())
			.then(response => response.json())
			.then(json => {
				errors.value = 0
				nextPrayer.value = json.prayer
			})
			.catch(err => {

				errors.value++

				toast.error("Error - Kon volgend gebed niet ophalen.", { position: "bottom-right" })
			})
	}
}

export const resetErrors = () => {
	errors.value = 0
}