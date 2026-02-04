/**
 * Created by taushif on 26/02/2017.
 */
import { signal } from "@preact/signals-react"
import { toast } from "sonner"

export const errors = signal(0)
export const items = signal([])

export const fetchReminders = () => {

	if (errors.value < 3) {

		fetch('http://localhost:3000/reminders?timestamp=' + new Date().getTime())
			.then(response => response.json())
			.then(json => {

				errors.value = 0
				items.value = json
			})
			.catch(err => {

				errors.value++

				toast.error("Error - Kon reminders niet ophalen.", { position: "bottom-right" })
			})
	}
}

export const resetErrors = () => {
	errors.value = 0
}
