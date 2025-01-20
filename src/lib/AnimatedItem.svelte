<script lang="ts">
	import { onMount } from 'svelte'
	async function loadImage(src: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const image = new Image()
			image.onload = () => resolve(image)
			image.onerror = (error) => reject(error)
			image.src = src
		})
	}

	const animations = {
		idle: {
			src: './sprites/punk_idle.png',
			width: 96,
			height: 96,
			frames: 4,
			horiz: 1
		},
		run: {
			src: './sprites/punk_run 1.png',
			width: 96,
			height: 96,
			frames: 6,
			horiz: 1
		},
		jump: {
			src: './sprites/punk_jump 1.png',
			width: 96,
			height: 96,
			frames: 4,
			horiz: 1
		},
		double: {
			src: './sprites/punk_doublejump.png',
			width: 96,
			height: 96,
			frames: 6,
			horiz: 1
		}
	}
	let animSlug = $state('idle')
	let animation = $derived(animations[animSlug])

	$inspect(animation)
</script>

<header>
	<div class="join">
		{#each Object.entries(animations) as [k, v] (k)}
			<input
				class="join-item btn"
				bind:group={animSlug}
				type="radio"
				value={k}
				aria-label={k} />
		{/each}
	</div>
</header>
<figure>
	<div
		class="sprite-item"
		style="--sp-width: {animation.width}px; --sp-height: {animation.height}px; --sp-end: -{animation.frames *
			animation.width}px; --sp-steps: {animation.frames}; background-image: url('{animation.src}'); ">
	</div>
</figure>

<style>
	:root {
		--sp-width: 96px;
		--sp-height: 96px;
		--sp-end: -384px;
		--sp-steps: 4;
		--sp-img: url('./sprites/punk_idle.png');
	}
	.sprite-item {
		display: inline-block;
		position: relative;
		width: var(--sp-width);
		height: var(--sp-height);
		background-repeat: no-repeat;
		background-position: left top;
		border: 1px dashed var(--color-base-300);
		animation: frame-animation 0.5s steps(var(--sp-steps)) infinite;
		animation-direction: normal;
		/* animation-iteration-count: 5; */
		overflow: visible;
	}

	@keyframes frame-animation {
		0% {
			background-position: 0px 0;
		}
		100% {
			background-position: var(--sp-end, -384px) 0;
		}
	}
</style>
