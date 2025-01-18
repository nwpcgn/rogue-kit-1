<script lang="ts">
	let { data } = $props()
</script>

<main class="main">
	<section class="page-layer nwp">
		<article class="content">
			<h1>Library Project</h1>
			<p>
				Create your package using @sveltejs/package and preview/showcase your
				work with SvelteKit
			</p>
			<div>
				{#each data.nav as { name, href, icon }}
					<a href="#{href}" class="btn">{name}</a>
				{/each}
			</div>
		</article>
	</section>
</main>
