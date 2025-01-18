<script lang="ts">
	import '../app.css'
	import '../assets/scss/nwp.scss'
	import IconSprite from '$lib/icons/iconSprite.svelte'
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props()
</script>

{@render children?.()}

<IconSprite />
