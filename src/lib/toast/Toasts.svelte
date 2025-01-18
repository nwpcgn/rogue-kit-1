<script lang="ts">
	import { sprite } from './toasts.json'
	import { fade, fly } from 'svelte/transition'
	let toasts = $state([])

	function addToast(toast) {
		const id = crypto.randomUUID()
		const defaults = {
			id,
			type: 'info'
		}
		const updated = [{ ...defaults, ...toast }, ...toasts]
		toasts = updated

		if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout)
	}
	const dismissToast = (id) => {
		toasts = toasts.filter((t) => t.id !== id)
	}

	addToast({ message: 'Test Messsage', timeout: 3000 })
	addToast({ message: 'Error Messsage', timeout: 5000, type: 'error' })
</script>

{@html sprite}

{#snippet iconT(name)}
	<svg class="nwp-icon"><use xlink:href="#{name}"></use></svg>
{/snippet}

{#if toasts.length}
	<div class="toast toast-top toast-end">
		{#each toasts as { message, type }}
			<div role="alert" class="alert alert-{type}">
				{@render iconT(`rpg-${type}`)}
				<span>{message}</span>
			</div>
		{/each}
	</div>
{/if}
