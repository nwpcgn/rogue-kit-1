export function generateRandomMap(w = 24, h = 24) {
	const canH = h
	const canW = w
	let newMap = []
	  for (let y = 0; y < canH; y++) {
		  // Erstellt 20 Reihen
		  let row = ''
		  for (let x = 0; x < canW; x++) {
			  // Jede Reihe hat 40 Spalten
			  if (x === 0 || x === canW - 1 || y === 0 || y === canH - 1) {
				  // Randbereiche mit Wänden (#) markieren
				  row += '#'
			  } else {
				  // Freie Flächen (_) einfügen
				  row += '_'
			  }
		  }
		  newMap.push(row) // Die Reihe zur Karte hinzufügen
	  }
  
	  // Räume generieren und platzieren
	  let rooms = generateRooms(canW,canH)
	  rooms.forEach((room) => {
		  for (let y = room.y; y < room.y + room.height; y++) {
			  for (let x = room.x; x < room.x + room.width; x++) {
				  if (
					  y === room.y ||
					  y === room.y + room.height - 1 ||
					  x === room.x ||
					  x === room.x + room.width - 1
				  ) {
					  newMap[y] =
						  newMap[y].substring(0, x) + '#' + newMap[y].substring(x + 1)
				  }
			  }
		  }
		  // Tür hinzufügen
		  let doorX = room.x + Math.floor(room.width / 2)
		  let doorY = room.y + room.height - 1
		  newMap[doorY] =
			  newMap[doorY].substring(0, doorX) +
			  'D' +
			  newMap[doorY].substring(doorX + 1)
	  })
  
	  // Begegnungen platzieren
	  placeEncounters(newMap, rooms)
  
	  // Spieler und Treppe zur Karte hinzufügen
	  newMap[2] =
			  newMap[2].substring(0, 2) + '@' + newMap[2].substring(3)
	  newMap[canH - 2] =
		  newMap[canH - 2].substring(0, canW - 2) +
		  'S' +
		  newMap[canH - 2].substring(canW - 1)
	  return newMap
  }
  
  
// Räume erstellen
function generateRooms(canW, canH) {
	let rooms = []
	let numRooms = Math.floor(Math.random() * 3) + 3 // 3-5 Räume

	for (let i = 0; i < numRooms; i++) {
		let width = Math.floor(Math.random() * 5) + 6 // Breite: 6-10
		let height = Math.floor(Math.random() * 3) + 4 // Höhe: 4-6
		let x = Math.floor(Math.random() * (canW - 2 - width)) + 1
		let y = Math.floor(Math.random() * (canH - 2 - height)) + 1

		// Überlappungen vermeiden
		let overlap = rooms.some(
			(room) =>
				x < room.x + room.width + 1 &&
				x + width > room.x &&
				y < room.y + room.height + 1 &&
				y + height > room.y
		)

		if (!overlap) {
			rooms.push({ x, y, width, height })
		}
	}

	return rooms
}

// Begegnungen platzieren
function placeEncounters(map, rooms) {
	const symb = ['C', 'M', 'N', 'W', 'L']

	rooms.forEach((room) => {
		let encounters = 0
		for (let y = room.y + 1; y < room.y + room.height - 1; y++) {
			for (let x = room.x + 1; x < room.x + room.width - 1; x++) {
				if (encounters >= 2) break
				if (Math.random() < 0.3) {
					let symbol = symb[Math.floor(Math.random() * symb.length)]
					map[y] = map[y].substring(0, x) + symbol + map[y].substring(x + 1)
					encounters++
				}
			}
			if (encounters >= 2) break
		}
	})
}

export default generateRandomMap
