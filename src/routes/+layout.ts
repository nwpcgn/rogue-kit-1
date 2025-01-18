export const load = async () => {
	return {
		nav: [
			{ name: 'Start', href: '/', icon: 'icon-start' },
			{ name: 'Battle', href: '/battle', icon: 'icon-battle' },
			{ name: 'Notes', href: '/notes', icon: 'icon-resources' },
			{ name: 'Pixel', href: '/pixel', icon: 'icon-bar' },
			{ name: 'Navi', href: '/navi', icon: 'icon-db' },
			{ name: 'Settings', href: '/settings', icon: 'icon-settings' }
		],
		colors: [
			'neutral',
			'info',
			'success',
			'warning',
			'error',
			'primary',
			'secondary',
			'accent'
		]
	}
}
