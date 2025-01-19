<script lang="ts">
	import { sprite } from './toasts.json'
	import sleep from '../utils/sleep'
	import { slide, fly } from 'svelte/transition'
	let toasts = $state([])

	function addToast(toast) {
		const id = crypto.randomUUID()
		const defaults = {
			id,
			type: 'info'
		}
		const updated = [...toasts, { ...defaults, ...toast }]
		toasts = updated

		if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout)
	}
	const dismissToast = (id) => {
		toasts = toasts.filter((t) => t.id !== id)
	}

	// addToast({ message: 'Error Messsage', timeout: 4000, type: 'error' })
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
	let curr = $state(0)

	const add = async () => {
		if (demoDaten[curr]) {
			let { text, style } = demoDaten[curr]
			addToast({ message: text, timeout: 6000, type: style })
			curr++
		} else {
			curr = 0
			add()
		}
	}

	sleep(1000).then(add)
	sleep(2000).then(add)
	sleep(3000).then(add)
	sleep(4000).then(add)
	sleep(5000).then(add)
</script>

{@html sprite}

{#snippet iconT(name)}
	<svg class="nwp-icon"><use xlink:href="#{name}"></use></svg>
{/snippet}

{#if toasts.length}
	<div class="toast toast-top toast-end w-96">
		{#each toasts as { message, type, id } (id)}
			<div
				out:fly={{ duration: 400, x: 200 }}
				in:slide={{ duration: 400, delay: 200 }}
				class="alert alert-{type}">
				{@render iconT(`rpg-${type}`)}
				<span>{message}</span>
			</div>
		{:else}
			<div
				class="alert alert-error alert-success alert-info alert-warning sr-only">
				<span class="">Blank</span>
			</div>
		{/each}
	</div>
{/if}
