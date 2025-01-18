<script lang="ts">
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props()
</script>

<main class="main">
	{@render children?.()}
</main>
