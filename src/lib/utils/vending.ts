export interface Vendingmachine {
	coins?: CoinsEntity[] | null
	sodas?: SodasEntity[] | null
}
export interface CoinsEntity {
	value: number
	label: string
	symbol: string
}
export interface SodasEntity {
	name: string
	amount: number
	price: number
	code: string
}
