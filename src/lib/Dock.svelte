<script>
	import { url, isActive } from '@roxi/routify'

	let { nav = [] } = $props()
</script>

{#snippet iconT(name)}
	<svg class="nwp-icon"><use xlink:href="#{name}"></use></svg>
{/snippet}

<nav class="dock bg-base-200 border-t">
	{#each nav as { name, href, icon }}
		<a {href} class:dock-active={$isActive(href)}>
			{@render iconT(icon)}
			<span class="dock-label">{name}</span>
		</a>
	{/each}
</nav>
