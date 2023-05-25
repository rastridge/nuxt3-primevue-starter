//
// used in all except Newsletters an SMS
// they must handle Send Now Send Later
//
import { useAuthStore } from '~/stores/authStore'
import { useAlertStore } from '~/stores/alertStore'
const alert = useAlertStore()

export default function useSubmit() {
	const auth = useAuthStore()
	const onSubmitEdit = async function (app, form_state) {
		const { data, pending, error } = await useFetch(`/${app}/editone`, {
			method: 'post',
			body: form_state,
			headers: {
				authorization: auth.user.token,
			},
		})
		alert.clear()
		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Error submitting data to /${app}/editone`,
			})
		} else {
			if (data.value.message) {
				alert.error(data.value.message)
			}
		}
	}
	const onSubmitAdd = async function (app, form_state) {
		const { data, error } = await useFetch(`/${app}/addone`, {
			method: 'post',
			body: form_state,
			headers: {
				authorization: auth.user.token,
			},
		})

		alert.clear()
		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Error submitting data to /${app}/addone`,
			})
		} else {
			if (data.value.message) {
				alert.error(data.value.message)
			}
		}
	}
	return { onSubmitEdit, onSubmitAdd }
}
