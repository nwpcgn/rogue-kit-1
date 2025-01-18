<script>
	import { onDestroy } from 'svelte'
	import { fly } from 'svelte/transition'
	const devMode = false
	let { handleKeyPress } = $props()
	let key = $state()
	let keyCode = $state()
	let active = $state(false)
	let timerId
	function clear() {
		if (timerId) clearTimeout(timerId)
		active = false
	}
	function onkeydown(event) {
		key = event.key
		keyCode = event.keyCode
		if (event.key.includes('Arrow')) {
			handleKeyPress(event.key)
		}
		clear()
		active = true
		timerId = setTimeout(clear, 1000)
	}

	onDestroy(() => {
		clear()
	})
</script>

<svelte:window {onkeydown} />

{#if active && devMode}
	<div
		transition:fly={{ duration: 400, y: 50 }}
		class="fixed bottom-0 right-0 z-40 flex flex-col items-center gap-4 p-8 uppercase">
		<kbd class="kbd kbd-lg">
			{key === ' ' ? 'Space' : key}
		</kbd>
		<kbd class="kbd hidden">{keyCode}</kbd>
	</div>
{/if}
