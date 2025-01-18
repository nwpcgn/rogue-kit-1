export class Note {
	text = $state('')
	style = $state('')

	constructor(text, style) {
		this.text = text
		this.style = style
	}
}

export let notes = $state([])

export function addNote(text = '', style = '') {
	const note = new Note(text, style)
	notes.push(note)
}
