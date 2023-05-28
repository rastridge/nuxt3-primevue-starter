import { useAuthStore } from '~/stores/authStore'

export default function useCustomPages() {
	const getCustomMenuItems = async () => {
		const { data, error } = await useFetch(`/content/custommenuitems`, {
			method: 'get',
			headers: {
				authorization: 'not-needed',
			},
		})
		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Could not get data from /content/custommenuitems`,
			})
		}
		const items = [
			{
				label: 'News',
				icon: 'pi pi-fw pi-bookmark',
				to: '/news',
			},
			{
				label: 'Members',
				icon: 'pi pi-fw pi-bookmark',
				to: '/members',
			},
		]

		return items
	}

	return {
		getAll,
	}
}
