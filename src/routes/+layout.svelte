<script lang="ts">
	import '../app.css'
	import '../assets/scss/nwp.scss'
	import IconSprite from '$lib/icons/iconSprite.svelte'
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props()
</script>

<header>
	<div class="navbar bg-neutral text-neutral-content shadow">
		<a href="#/" class="btn btn-ghost text-xl">Nwp-Studio</a>
	</div>
</header>

{@render children?.()}

<IconSprite />
