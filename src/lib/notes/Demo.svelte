<script lang="ts">
	import { notes, addNote } from './notes.svelte.ts'

	let demoDaten = [
		{
			text: 'Zu wenig Speicherplatz!',
			style: 'warning',
			done: false
		},
		{
			text: 'Ihre Datei wurde erfolgreich hochgeladen.',
			style: 'success',
			done: false
		},
		{
			text: 'Zugriff verweigert!',
			style: 'error',
			done: false
		},
		{
			text: 'Bitte aktualisieren Sie Ihre App.',
			style: 'info',
			done: false
		},
		{
			text: 'Ein neues Update ist verfügbar.',
			style: 'error',
			done: false
		},
		{
			text: 'Ihre Sitzung läuft bald ab.',
			style: 'warning',
			done: false
		}
	]

	function loadDemoData() {
		demoDaten.forEach(({ text = '', style = '' }) => addNote(text, style))
	}
	function nextAlert() {
		notes.shift()
	}
	let isActive = $derived(notes.length || false)
</script>

{#if isActive}
	<button class="btn" onclick={nextAlert}>Next ({notes.length})</button>
{:else}
	<button class="btn" onclick={loadDemoData}>Demo</button>
{/if}
