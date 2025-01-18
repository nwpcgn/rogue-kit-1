export const load = async () => {
	return {
		nav: [
			{ name: 'Start', href: '/', icon: 'icon-start' },
			{ name: 'Pathfinder', href: '/navi', icon: 'icon-db' },
			{ name: 'Notes', href: '/notes', icon: 'icon-notes' },
			{ name: 'Pixel', href: '/pixel', icon: 'icon-pixel' }
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
