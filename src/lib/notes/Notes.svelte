<script lang="ts">
	import { slide, fly } from 'svelte/transition'
	import { notes } from './notes.svelte.ts'
	function handleClick() {
		notes.shift()
	}
	let currentId = $state(0)
	let current = $derived(notes[currentId] || null)
	let renderId = $derived(notes.length)
</script>

{#if current}
	<div class="toast w-full max-w-sm">
		{#key renderId}
			<div
				out:fly={{ duration: 400, y: 100 }}
				in:slide={{ duration: 400, delay: 200 }}
				style="--alert-color: var(--color-{current.style})"
				role="alert"
				class="alert alert-horizontal">
				{@render alertIcon()}
				<div>
					<span>{current.text}</span>
				</div>
				<div>
					<button onclick={handleClick} class="btn btn-sm btn-neutral"
						>Ok</button>
				</div>
			</div>
		{/key}
	</div>
{/if}

{#snippet alertIcon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		class="h-6 w-6 shrink-0 stroke-current">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
	</svg>
{/snippet}
