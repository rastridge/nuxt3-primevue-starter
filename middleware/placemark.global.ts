import { usePlacemarkStore } from '@/stores'

export default defineNuxtRouteMiddleware((to, from) => {
	const appto = to.path.split('/')[2]
	const appfrom = from.path.split('/')[2]

	const placemark = usePlacemarkStore()
	if (to.path.slice(0, 6) === '/admin' && appto !== appfrom) {
		placemark.setPage(0)
		placemark.setAlpha('1')
		placemark.initYear()
		placemark.setMemberTypeId(2)
		placemark.setGameTypeId(1)
	}
})
