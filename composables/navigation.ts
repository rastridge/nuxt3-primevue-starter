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
						label: 'Members',
						icon: 'pi pi-fw pi-bookmark',
						to: '/members',
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
						label: 'Texts',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/sms',
						visible: () => checkPerm('sms') > 0,
					},
					{
						label: 'Contributions',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/contributions',
						visible: () => checkPerm('contributions') > 0,
					},
					{
						label: 'Stats',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/game_player_stats',
						visible: () => checkPerm('game_player_stats') > 0,
					},
					{
						label: 'Opponents',
						icon: 'pi pi-fw pi-user-edit',
						to: '/admin/opponents',
						visible: () => checkPerm('opponents') > 0,
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
				label: 'PrimeVue',
				items: [
					{
						label: 'DataTable',
						icon: 'pi pi-fw pi-table',
						to: '/prime/datatable',
					},
					{
						label: 'Messages',
						icon: 'pi pi-fw pi-user-edit',
						to: '/prime/messages',
					},
					{
						label: 'Validation',
						icon: 'pi pi-fw pi-user-edit',
						to: '/prime/validation',
					},
				],
				visible: () => !auth.isLoggedIn,
			},
			{
				label: 'UI',
				items: [
					{ label: 'UnoCSS', icon: 'pi pi-fw pi-user-edit', to: '/ui/uno' },
					{ label: 'Icons', icon: 'pi pi-fw pi-user-edit', to: '/ui/icons' },
					{ label: 'TipTap', icon: 'pi pi-fw pi-user-edit', to: '/ui/tiptap' },
				],
				visible: () => !auth.isLoggedIn,
			},
			{
				label: 'Content',
				items: [
					{
						label: 'Markdown',
						icon: 'pi pi-fw pi-user-edit',
						to: '/cms/markdown',
					},
					{
						label: 'Component',
						icon: 'pi pi-fw pi-user-edit',
						to: '/cms/component',
					},
				],
				visible: () => !auth.isLoggedIn,
			},
			{
				label: 'Pages',
				items: [
					{ label: 'Stores', icon: 'pi pi-fw pi-database', to: '/stores' },
					{ label: 'Server', icon: 'pi pi-fw pi-database', to: '/server' },
					{ label: 'I18n', icon: 'pi pi-fw pi-database', to: '/i18n' },
				],
				visible: () => !auth.isLoggedIn,
			},
			{
				label: 'Templates',
				items: [
					{
						label: 'Blueprint',
						icon: 'pi pi-fw pi-user-edit',
						to: '/templates/blueprint',
					},
				],
				visible: () => !auth.isLoggedIn,
			},
			{
				label: 'Menu Hierarchy',
				icon: 'pi pi-fw pi-search',
				items: [
					{
						label: 'Submenu 1',
						icon: 'pi pi-fw pi-bookmark',
						items: [
							{
								label: 'Submenu 1.1',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
								],
							},
							{
								label: 'Submenu 1.2',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark' },
								],
							},
						],
					},
					{
						label: 'Submenu 2',
						icon: 'pi pi-fw pi-bookmark',
						items: [
							{
								label: 'Submenu 2.1',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark' },
								],
							},
							{
								label: 'Submenu 2.2',
								icon: 'pi pi-fw pi-bookmark',
								items: [
									{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
									{ label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark' },
								],
							},
						],
					},
				],
				visible: () => !auth.isLoggedIn,
			},
		]
	}

	return { navigationMenu }
}
