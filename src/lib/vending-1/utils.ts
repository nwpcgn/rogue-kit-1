export function roundToNext5Cents(amount) {
	return Math.ceil(amount * 20) / 20
}
export const addedCoin = () => {
	console.log('addedCoin')
	disabled = true
	sleep().then(() => {
		disabled = false
	})
}
