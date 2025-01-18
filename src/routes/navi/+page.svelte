<script lang="ts">
	import Gen1 from '$lib/generator-1/Gen1.svelte'
	let title = $state('Navi Generator')
</script>

<section class="page-layer nwp">
	<article class="content">
		<div><a href="#/" class="btn">Start</a></div>
	</article>
	<Gen1 {title}></Gen1>
</section>
