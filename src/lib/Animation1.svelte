<script>
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import sleep from './utils/sleep'
	let animated = $state(false)
	let visible = $state(false)
	let started = $derived(animated && visible)
	onMount(() => {
		animated = true
		visible = true
		sleep(3000).then(() => {
			animated = false
			sleep(4000).then(() => {
				visible = false
			})
		})
	})
</script>

{#if visible}
	<section class="fixed inset-0 z-20 bg-glass" out:fade={{ duration: 1000 }}>
	</section>
{/if}

{#if visible}
	<section
		class="fixed inset-0 z-40 bg-neutral"
		onanimationend={() => {
			console.log('animationEnd')
			if (started) {
				visible = false
			}
		}}
		class:circle-in={animated}
		class:circle-out={!animated}>
		<div class="load circle-in">
			<hr />
			<hr />
			<hr />
			<hr />
		</div>
	</section>
{/if}

<style>
	.load {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		/*change these sizes to fit into your project*/
		width: 100px;
		height: 100px;
	}
	.load hr {
		border: 0;
		margin: 0;
		width: 40%;
		height: 40%;
		position: absolute;
		border-radius: 50%;
		animation: spin 2s ease infinite;
	}

	.load :first-child {
		background: #19a68c;
		animation-delay: -1.5s;
	}
	.load :nth-child(2) {
		background: #f63d3a;
		animation-delay: -1s;
	}
	.load :nth-child(3) {
		background: #fda543;
		animation-delay: -0.5s;
	}
	.load :last-child {
		background: #193b48;
	}

	@keyframes spin {
		0%,
		100% {
			transform: translate(0);
		}
		25% {
			transform: translate(160%);
		}
		50% {
			transform: translate(160%, 160%);
		}
		75% {
			transform: translate(0, 160%);
		}
	}
</style>
