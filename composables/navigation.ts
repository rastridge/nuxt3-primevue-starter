import { useAuthStore } from '~/stores/authStore'
const auth = useAuthStore()
import { useMenuStore } from '@/stores'
const menuStore = useMenuStore()
const customMenuItems = menuStore.getCustomMenuItems

const checkPerm = (app) => {
	const user = auth.user
	const temp = user.perms
	const perms = temp.find(function (u) {
		return u.admin_app_name === app
	})
	return perms.admin_perm
}

export function useNavigationMenu() {
	const navigationMenu = () => {
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
						icon: 'pi pi-fw pi-sign-in',
						to: '/loginpage',
						visible: () => !auth.isLoggedIn,
					},

					{
						label: 'About',
						items: [
							{
								label: 'News',
								to: '/news',
							},
							{
								label: 'Events',
								to: '/events',
							},
							{
								label: 'Payments',
								to: '/payments',
							},
							{
								label: 'Officers',
								to: '/officers',
							},
							{
								label: 'Members',
								to: '/members',
							},
							{
								label: 'Schedule',
								to: '/games/schedule',
							},
							{
								label: 'Opponents',
								to: '/opponents',
							},
							{
								label: 'Contributions',
								to: '/contributions',
							},
							{
								label: 'Sponsors',
								to: '/sponsors',
							},
							{
								label: 'Community Service',
								to: '/communityservice',
							},
							{
								label: 'Leaders',
								to: '/leaders',
							},
						],
						visible: () => !auth.isLoggedIn,
					},
				],
			},
			{
				label: 'Custom Pages',
				items: customMenuItems,
				visible: () => !auth.isLoggedIn,
			},

			{
				label: 'Admin',
				icon: 'pi pi-fw pi-plus',
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
						label: 'Leaders',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/leaders',
						visible: () => checkPerm('leaders') > 0,
					},
					{
						label: 'Log out',
						icon: 'pi pi-fw pi-sign-out',
						to: '/logout',
						visible: () => auth.isLoggedIn,
					},
				],
				visible: () => auth.isLoggedIn,
			},
		]
	}
	return { navigationMenu }
}
