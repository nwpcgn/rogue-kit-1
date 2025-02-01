export interface Vendingmachine {
	coins?: CoinsEntity[] | null
	sodas?: SodasEntity[] | null
}
export interface CoinsEntity {
	value: number
	label: string
	title: string
}
export interface SodasEntity {
	name: string
	amount: number
	price: number
	code: string
}
