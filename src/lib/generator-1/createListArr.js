export function createListArr(text) {
	if (!text) {
		console.log('NO TEXT')
	}

	let listArr = []
	let o = {}
	let list = text.split('\n')
	list.forEach((str) => {
		let name = str.trim()
		let slug = name.replaceAll(' ', '_')
		let link = slug.toLowerCase()
		let icon = `icon-${link}`
		if (link === 'start' || link === 'home') {
			link = ''
		}

		let href = `/${link}`

		o[slug] = { name, href, icon }
	})
	listArr = Object.values(o)

	return listArr
}

export default createListArr
