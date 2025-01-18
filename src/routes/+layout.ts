export const load = async () => {
	return {
		nav: [
			{ name: 'Home', href: '/', icon: 'icon-home' },
			{ name: 'Notes', href: '/notes', icon: 'icon-battle' },
			{ name: 'Pathfinder', href: '/navi', icon: 'icon-archive' },
			{ name: 'Pixelator', href: '/pixel', icon: 'icon-db' }
			// { name: 'Gift', href: '/gift', icon: 'icon-buildings' },
			// { name: 'Tabs', href: '/tabs', icon: 'icon-bar' }
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
