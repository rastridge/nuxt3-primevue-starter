import { useAuthStore } from '~/stores/authStore'
const auth = useAuthStore()

export default function useNewsletter() {
	const addNewsletter = async (state, send) => {
		const { data, pending, error } = await useFetch('/newsletters/addone', {
			method: 'post',
			body: state,
			headers: {
				authorization: auth.user.token,
			},
		})
		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Error submitting data to  /newsletters/addone`,
			})
		}

		state.newsletter_id = data.value.insertId
		if (send === 'sendNow') {
			const { data, pending, error } = await useFetch('/newsletters/send', {
				method: 'post',
				body: state,
				headers: {
					authorization: auth.user.token,
				},
			})
			if (error.value) {
				throw createError({
					...error.value,
					statusMessage: `Error submitting data to  /newsletters/send`,
				})
			}
		}
	}

	const editNewsletter = async (state, send) => {
		const { data, pending, error } = await useFetch('/newsletters/editone', {
			method: 'post',
			body: state,
			headers: {
				authorization: auth.user.token,
			},
		})
		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Error submitting data to  /newsletters/editone`,
			})
		}

		if (send === 'sendNow') {
			const { data, pending, error } = await useFetch('/newsletters/send', {
				method: 'post',
				body: state,
				headers: {
					authorization: auth.user.token,
				},
			})
			if (error.value) {
				throw createError({
					...error.value,
					statusMessage: `Error submitting data to /newsletters/send`,
				})
			}
		}
	}
	return { addNewsletter, editNewsletter }
}
