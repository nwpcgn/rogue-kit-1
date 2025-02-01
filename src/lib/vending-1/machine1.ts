export const coins = [0.05, 0.1, 0.2, 0.5, 1, 2]

export const sodas = [
	{
		name: 'Pepsi',
		amount: 5,
		price: 1,
		code: 'A1'
	},
	{
		name: 'Coke',
		amount: 5,
		price: 1.2,
		code: 'A2'
	},
	{
		name: 'Fanta',
		amount: 5,
		price: 1.1,
		code: 'A3'
	},
	{
		name: 'Sprite',
		amount: 5,
		price: 0.95,
		code: 'A4'
	}
]

let vendingMachine = {
	coins: [
		{
			value: 0.05,
			label: '5ct',
			symbol: '5c'
		},
		{
			value: 0.1,
			label: '10ct',
			symbol: '10c'
		},
		{
			value: 0.2,
			label: '20ct',
			symbol: '20c'
		},
		{
			value: 0.5,
			label: '50ct',
			symbol: '50c'
		},
		{
			value: 1,
			label: '1Eu',
			symbol: '1e'
		},
		{
			value: 2,
			label: '2Eu',
			symbol: '2e'
		}
	],
	sodas: [
		{
			name: 'Pepsi',
			amount: 5,
			price: 1,
			code: 'A1'
		},
		{
			name: 'Coke',
			amount: 5,
			price: 1.2,
			code: 'A2'
		},
		{
			name: 'Fanta',
			amount: 5,
			price: 1.1,
			code: 'A3'
		},
		{
			name: 'Sprite',
			amount: 5,
			price: 0.95,
			code: 'A4'
		}
	]
}
export interface VendingMachine {
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

/* -------------------------------- Rpg Game -------------------------------- */

let rpgGame = {
	titel: 'RPG',
	resourcen: [
		{
			slug: 'wood',
			name: 'Wood',
			description: 'Brown stuff that grows on trees.',
			action: 'Chop',
			total: 0,
			clickIncrement: 1,
			autoIncrement: 0,
			max: 100,
			storage: {
				total: 1,
				max: 100,
				cost: { wood: 50, stone: 50, iron: 0, food: 0 },
				costIncrease: 1.1
			}
		},
		{
			slug: 'stone',
			name: 'Stone',
			description: 'Hard stuff.',
			action: 'Mine',
			total: 0,
			clickIncrement: 1,
			autoIncrement: 0,
			max: 100,
			storage: {
				total: 1,
				max: 100,
				cost: { wood: 50, stone: 50 },
				costIncrease: 1.1
			}
		},
		{
			slug: 'iron',
			name: 'Iron',
			description: 'Even harder stuff. Bit rusty.',
			action: 'Mine',
			total: 0,
			autoIncrement: 0,
			max: 100,
			storage: {
				total: 1,
				max: 100,
				cost: { wood: 100, stone: 100 },
				costIncrease: 1.1
			}
		},
		{
			slug: 'food',
			name: 'Food',
			description: 'Can be cooked to provide nutrition.',
			action: 'Hunt',
			total: 0,
			clickIncrement: 1,
			autoIncrement: 0,
			max: 100,
			storage: {
				total: 1,
				max: 100,
				cost: { wood: 50, stone: 50 },
				costIncrease: 1.1
			}
		}
	],
	buildings: [
		{
			slug: 'tent',
			name: 'Tent',
			description: 'Just like a house but way smaller and made out of fabric.',
			total: 0,
			residents: 1,
			cost: { wood: 30, stone: 0, iron: 0 },
			costIncrease: 1.1
		},
		{
			slug: 'house',
			name: 'House',
			description:
				'Just like a tent but way bigger and not made out of fabric.',
			total: 0,
			residents: 4,
			cost: { wood: 75, stone: 50, iron: 10, food: 0 },
			costIncrease: 1.1
		},
		{
			slug: 'hostel',
			name: 'Hostel',
			description: 'A bit like a house but not as nice and not as private.',
			total: 0,
			residents: 10,
			cost: { wood: 200, stone: 30, iron: 30 },
			costIncrease: 1.1
		}
	],
	worker: [
		{
			slug: 'lumberjack',
			name: 'Lumberjack',
			description: 'A person who likes to chop wood.',
			resourcen: 'wood',
			total: 0,
			autoIncrement: 1,
			cost: { food: 10 },
			costIncrease: 1.1
		},
		{
			slug: 'miner',
			name: 'Miner',
			description: 'Not a young person.',
			resourcen: 'stone',
			total: 0,
			autoIncrement: 1,
			cost: { wood: 0, stone: 0, iron: 0, food: 10 },
			costIncrease: 1.1
		},
		{
			slug: 'scraper',
			name: 'Scraper',
			description: "Isn't it obvious?",
			resourcen: 'iron',
			total: 0,
			autoIncrement: 1,
			cost: { stone: 1, food: 10 },
			costIncrease: 1.2
		},
		{
			slug: 'hunter',
			name: 'Hunter',
			description: 'The opposite to a gatherer.',
			resourcen: 'food',
			total: 0,
			autoIncrement: 1,
			cost: { food: 10 },
			costIncrease: 1.1
		}
	],
	meta: {
		city: 'Gotham City',
		name: 'Bruce Wayne',
		population: 0,
		maxPopulation: 0,
		tick: 1000,
		saveGameInterval: 30000
	}
}

export interface RpgGame {
	resourcen?: ResourcenEntity[] | null
	buildings?: BuildingsEntity[] | null
	worker?: WorkerEntity[] | null
	meta: Meta
}
export interface ResourcenEntity {
	slug: string
	name: string
	description: string
	action: string
	total: number
	clickIncrement?: number | null
	autoIncrement: number
	max: number
	storage: Storage
}
export interface Storage {
	total: number
	max: number
	cost: Cost
	costIncrease: number
}
export interface Cost {
	wood: number
	stone: number
	iron?: number | null
	food?: number | null
}
export interface BuildingsEntity {
	slug: string
	name: string
	description: string
	total: number
	residents: number
	cost: Cost1
	costIncrease: number
}
export interface Cost1 {
	wood: number
	stone: number
	iron: number
	food?: number | null
}
export interface WorkerEntity {
	slug: string
	name: string
	description: string
	resourcen: string
	total: number
	autoIncrement: number
	cost: Cost2
	costIncrease: number
}
export interface Cost2 {
	food: number
	wood?: number | null
	stone?: number | null
	iron?: number | null
}
export interface Meta {
	city: string
	name: string
	population: number
	maxPopulation: number
	tick: number
	saveGameInterval: number
}
