<script>
	//	let { title = 'Gaming' } = $props()

	function clickCtrl(event) {
		const id = event.currentTarget.getAttribute('id')
		console.log('Clicked on ', id)
	}

	let ctrlBar = $state({
		_t: 'foreignObject',
		transform: [247, 25],
		size: [56, 331.52],
		layers: [
			{
				name: 'changeout',
				transform: [7.6671877, 308.72736],
				size: [38.925785, 22.338501],
				fills: [{ color: '1F3035' }]
			},
			{
				name: 'keypad',
				transform: [7.7998047, 113.338135],
				size: [39.757927, 66.9361],
				fills: [{ color: '0' }]
			},
			{
				name: 'coinslot',
				transform: [7.7998047, 230.70601],
				size: [39.757927, 66.93599]
			},
			{
				name: 'coindisplay',
				transform: [2.24, 54.840626],
				size: [51.52, 22.399998],
				export: [{}],
				fills: [{ color: '686869' }]
			},
			{
				name: 'statusdisplay',
				transform: [0.4432422, 1.080625],
				size: [54.471313, 34.509518],
				fills: [{ color: '686869' }]
			}
		]
	})
</script>

{#snippet machina2T()}
	<div class="machine-2">
		<svg height="600" width="368" stroke="none" viewBox="0 0 368 600">
			<g id="machine-2x-empty">
				<rect id="machine-2x" width="368" height="600" fill="none" />
				<rect
					id="productsel-2x"
					width="218"
					height="166"
					fill-opacity="0.1"
					transform="translate(35 19)"
					fill="currentColor" />

				<rect
					opacity="0"
					fill="none"
					height="323"
					width="56"
					id="sidebarel-2x"
					transform="translate(287 25)" />

				<foreignObject x="35" y="19" width="218" height="166">
					<div
						class="grid grid-cols-4 p-2 gap-2 grid-rows-3 overflow-hidden w-full h-full">
						{#each ['2E1B3B', 'C90000', '686869', 'B01B4F', '686869', '2E1B3B', 'B01B4F', 'C90000', 'C90000', 'B01B4F', '2E1B3B', '686869'] as item}
							<button
								class="font-extralight flex items-end justify-end p-1 rounded"
								style="background-color: #{item}; font-size: var(--spacing-sm);">
								<span class="bg-base-300 leading-snug text-base-content">{item}</span>
							</button>
						{/each}
					</div>
				</foreignObject>
				<foreignObject x="287" y="25" height="323" width="56">
					<div class="text-xs w-full h-full relative">
						{#each ['statusdispl', 'coindispl', 'keypad', 'coinslot', 'changeout'] as id}
							<button onclick={clickCtrl} class="rounded-box" {id}
								><span class="sr-only">{id}</span></button>
						{/each}
					</div>
				</foreignObject>
			</g>
		</svg>
	</div>
{/snippet}

<article class="machina-2-wrapp">
	<aside class="s1"></aside>
	<aside class="s2"></aside>
	<article class="ma1">
		{@render machina2T()}
	</article>
</article>

<style>
	.machina-2-wrapp {
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
		grid-template-rows: 1fr;
		gap: var(--spacing-sm);
		grid-auto-flow: row;
		grid-template-areas: 's1 ma1 s2';
		> * {
			background-color: var(--color-base-300);
			border-radius: var(--radius-box);
		}

		.s1 {
			grid-area: s1;
			position: relative;
			overflow: hidden;
		}

		.s2 {
			grid-area: s2;
			position: relative;
			overflow: hidden;
		}

		.ma1 {
			grid-area: ma1;
			position: relative;
			overflow: hidden;
			border-radius: var(--radius-box, 0);
		}
	}
	.machine-2 {
		background-image: url('/img/machine/machine-2x-empty.png');
		background-repeat: no-repeat;
	}
	#statusdispl {
		position: absolute;
		left: 0.44px;
		top: 1.08px;
		width: 54.47px;
		height: 34.51px;
		background: #686869;
		background-blend-mode: normal;
	}
	#coindispl {
		position: absolute;
		left: 2.24px;
		top: 54.84px;
		width: 51.52px;
		height: 22.4px;
		background: #686869;
		background-blend-mode: normal;
	}

	#changeout {
		position: absolute;
		left: 7.67px;
		top: 308.73px;
		width: 38.93px;
		height: 22.34px;
		background: #1f3035;
		background-blend-mode: normal;
		border-radius: 2px;
	}

	#keypad {
		position: absolute;
		left: 7.8px;
		top: 113.34px;
		width: 39.76px;
		height: 66.94px;
		background: #000000;
		background-blend-mode: normal;
	}
	#coinslot {
		position: absolute;
		left: 7.8px;
		top: 230.71px;
		width: 39.76px;
		height: 66.94px;
		background: rgba(0, 0, 0, 0.525);
	}
</style>
