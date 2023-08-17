import { useAuthStore } from '~/stores/authStore'
const auth = useAuthStore()
import { useMenuStore } from '@/stores'
const menuStore = useMenuStore()

const checkPerm = (app) => {
	// const user = JSON.parse(sessionStorage.getItem('auth'))
	const user = auth.user
	const temp = user.perms
	const perms = temp.find(function (u) {
		return u.admin_app_name === app
	})
	return perms.admin_perm
}

export function useNavigationMenu() {
	const navigationMenu = () => {
		// const customMenuItems = JSON.parse(sessionStorage.getItem('custommenu'))

		const customMenuItems = menuStore.getCustomMenuItems
		return [
			{
				items: [
					{
						label: 'Homepage',
						to: '/',
						icon: 'pi pi-fw pi-home',
						visible: () => !auth.isLoggedIn,
					},
					{
						label: 'Login',
						icon: 'pi pi-fw pi-bookmark',
						to: '/loginpage',
						visible: () => !auth.isLoggedIn,
					},
				],
			},
			{
				label: 'About',
				items: [
					{
						label: 'News',
						icon: 'pi pi-fw pi-bookmark',
						to: '/news',
					},
					{
						label: 'Events',
						icon: 'pi pi-fw pi-bookmark',
						to: '/events',
					},
					{
						label: 'Payments',
						icon: 'pi pi-fw pi-bookmark',
						to: '/payments',
					},
					{
						label: 'Officers',
						icon: 'pi pi-fw pi-bookmark',
						to: '/officers',
					},
					{
						label: 'Members',
						icon: 'pi pi-fw pi-bookmark',
						to: '/members',
					},
					{
						label: 'Schedule',
						icon: 'pi pi-fw pi-bookmark',
						to: '/games/schedule',
					},
					{
						label: 'Opponents',
						icon: 'pi pi-fw pi-bookmark',
						to: '/opponents',
					},
					{
						label: 'Contributions',
						icon: 'pi pi-fw pi-bookmark',
						to: '/contributions',
					},
					{
						label: 'Sponsors',
						icon: 'pi pi-fw pi-bookmark',
						to: '/sponsors',
					},
				],
				visible: () => !auth.isLoggedIn,
			},
			{
				label: 'Custom Pages',
				items: customMenuItems,
				visible: () => !auth.isLoggedIn,
			},
			{
				label: 'Admin',
				items: [
					{
						label: 'Admin Users',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/users',
						visible: () => checkPerm('users') > 0,
					},
					{
						label: 'Content',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/content',
						visible: () => checkPerm('content') > 0,
					},
					{
						label: 'Contributions',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/contributions',
						visible: () => checkPerm('contributions') > 0,
					},
					{
						label: 'Events',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/events',
						visible: () => checkPerm('events') > 0,
					},
					{
						label: 'Members Men',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/accounts/men',
						visible: () => checkPerm('accounts/men') > 0,
					},
					{
						label: 'News',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/news',
						visible: () => checkPerm('news') > 0,
					},
					{
						label: 'Newsletters',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/newsletters',
						visible: () => checkPerm('newsletters') > 0,
					},
					{
						label: 'Opponents',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/opponents',
						visible: () => checkPerm('opponents') > 0,
					},
					{
						label: 'Payments',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/payments',
						visible: () => checkPerm('payments') > 0,
					},
					{
						label: 'Texts',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/sms',
						visible: () => checkPerm('sms') > 0,
					},
					{
						label: 'Stats',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/game_player_stats',
						visible: () => checkPerm('game_player_stats') > 0,
					},
					{
						label: 'Videos',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/videos',
						visible: () => checkPerm('videos') > 0,
					},
					{
						label: 'Sponsors',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/sponsors',
						visible: () => checkPerm('sponsors') > 0,
					},
					{
						label: 'Log out',
						icon: 'pi pi-fw pi-bookmark',
						to: '/logout',
						visible: () => auth.isLoggedIn,
					},
				],
				visible: () => auth.isLoggedIn,
			},

			{
				label: 'Pages',
				items: [{ label: 'I18n', icon: 'pi pi-fw pi-database', to: '/i18n' }],
				visible: () => !auth.isLoggedIn,
			},
		]
	}

	return { navigationMenu }
}
