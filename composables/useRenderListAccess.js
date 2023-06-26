import { useAuthStore } from '~/stores/authStore'

export default function useRenderListAccess() {
	const auth = useAuthStore()

	function getAccess(app) {
		let access = {
			editable: false,
			addable: false,
			deleteable: false,
			statusable: false,
			viewable: true,
		}
		//
		// Set access permisions for Renderlist
		//
		access.editable = false
		access.addable = false
		access.deleteable = false
		access.statusable = false
		access.viewable = true
		const user = JSON.parse(sessionStorage.getItem('auth'))
		const temp = user.perms

		const perms = temp.find((u) => u.admin_app_name === app)

		if (perms.admin_perm === 3) {
			// all access
			access.editable = true
			access.addable = true
			access.deleteable = true
			access.statusable = true
			access.viewable = true
		} else if (perms.admin_perm === 2) {
			// create
			access.addable = true
		} else if (perms.admin_perm === 1) {
			// view
			access.viewable = true
		} else {
			navigateTo('/admin') // no access
		}
		return access
	}
	return {
		getAccess,
	}
}
