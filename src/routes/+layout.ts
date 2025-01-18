export const load = async () => {
	return {
		nav: [
			{ name: 'Home', href: '/', icon: 'icon-home' },
			{ name: 'Clicker', href: '/clicker', icon: 'icon-battle' },
			{ name: 'Fight', href: '/fight', icon: 'icon-archive' },
			{ name: 'Battle', href: '/battle', icon: 'icon-db' },
			{ name: 'Gift', href: '/gift', icon: 'icon-buildings' },
			{ name: 'Tabs', href: '/tabs', icon: 'icon-bar' }
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
