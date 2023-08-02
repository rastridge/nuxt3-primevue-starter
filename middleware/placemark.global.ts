import { usePlacemarkStore } from '@/stores'
import { useAlertStore } from '~/stores/alertStore'
export default defineNuxtRouteMiddleware((to, from) => {
	const appto = to.path.split('/')[2]
	const appfrom = from.path.split('/')[2]

	const placemark = usePlacemarkStore()
	// non-admin schedule page
	placemark.initYear()

	if (to.path.slice(0, 6) === '/admin' && appto !== appfrom) {
		placemark.setPage(0)
		placemark.setAlpha('1')
		placemark.initYear()
		placemark.setMemberTypeId(2)
		placemark.setGameTypeId(1)
	}
	//
	// clear previous alerts
	//
	const alert = useAlertStore()
	alert.clear()
})
