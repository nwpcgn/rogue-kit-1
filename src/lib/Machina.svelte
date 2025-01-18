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

{#snippet ctrlBarT(width, height)}
	<svg {width} {height}>
		<rect width="25" height="148" />
		<rect id="sideback" width="25" height="148" />
		<rect
			id="changeout"
			width="17.378"
			height="9.973"
			fill="#1F3035"
			fill-rule="evenodd"
			transform="translate(3.423 137.825)" />
		<g id="keypad" transform="translate(3.482 50.597)">
			<rect
				id="Rectangle"
				width="17.749"
				height="29.882"
				fill="#686869"
				fill-rule="evenodd" />
			<rect
				id="Rectangle"
				width="3.581"
				height="3.57"
				fill="#111B1D"
				fill-rule="evenodd"
				transform="translate(2.45 9.385)" />
			<rect
				id="Rectangle"
				width="3.581"
				height="3.57"
				fill="#111B1D"
				fill-rule="evenodd"
				transform="translate(7.082 9.385)" />
			<rect
				id="Rectangle"
				width="3.581"
				height="3.57"
				fill="#111B1D"
				fill-rule="evenodd"
				transform="translate(11.718 9.385)" />
			<rect
				id="Rectangle"
				width="3.581"
				height="3.57"
				fill="#111B1D"
				fill-rule="evenodd"
				transform="translate(2.45 13.897)" />
			<rect
				id="Rectangle"
				width="3.581"
				height="3.57"
				fill="#111B1D"
				fill-rule="evenodd"
				transform="translate(7.082 13.897)" />
			<rect
				id="Rectangle"
				width="3.581"
				height="3.57"
				fill="#111B1D"
				fill-rule="evenodd"
				transform="translate(11.718 13.897)" />
			<rect
				id="Rectangle"
				width="3.581"
				height="3.57"
				fill="#111B1D"
				fill-rule="evenodd"
				transform="translate(2.45 18.408)" />
			<rect
				id="Rectangle"
				width="3.581"
				height="3.57"
				fill="#111B1D"
				fill-rule="evenodd"
				transform="translate(7.082 18.408)" />
			<rect
				id="Rectangle"
				width="3.581"
				height="3.57"
				fill="#111B1D"
				fill-rule="evenodd"
				transform="translate(11.718 18.408)" />
			<rect
				id="Rectangle"
				width="3.581"
				height="3.57"
				fill="#111B1D"
				fill-rule="evenodd"
				transform="translate(2.45 22.92)" />
			<rect
				id="Rectangle"
				width="3.581"
				height="3.57"
				fill="#111B1D"
				fill-rule="evenodd"
				transform="translate(7.082 22.92)" />
			<rect
				id="Rectangle"
				width="3.581"
				height="3.57"
				fill="#111B1D"
				fill-rule="evenodd"
				transform="translate(11.718 22.92)" />
			<rect
				id="Rectangle"
				width="11.631"
				height="4.815"
				fill="#C0BCB6"
				fill-rule="evenodd"
				transform="translate(2.814 1.777)" />
		</g>
		<g id="coinslot" transform="translate(3.482 102.994)">
			<path
				id="Path"
				d="M13.8681 29.8821C13.8681 29.8821 3.88099 29.8821 3.88099 29.8821C1.73895 29.8821 0 28.1485 0 26.0129C0 26.0129 0 3.86922 0 3.86922C0 1.73362 1.73895 0 3.88099 0C3.88099 0 13.8681 0 13.8681 0C16.0101 0 17.7491 1.73368 17.7491 3.86922C17.7491 3.86922 17.7491 26.0129 17.7491 26.0129C17.7492 28.1524 16.0141 29.8821 13.8681 29.8821C13.8681 29.8821 13.8681 29.8821 13.8681 29.8821Z"
				fill="#686869"
				fill-rule="evenodd" />
			<rect
				id="Rectangle"
				width="11.849"
				height="2.1"
				fill="#111B1D"
				fill-rule="evenodd"
				transform="translate(2.707 12.841)" />
		</g>
		<rect
			id="coindisplay"
			width="23"
			height="10"
			fill="#686869"
			fill-rule="evenodd"
			transform="translate(1 24.482)" />
		<rect
			id="statusdisplay"
			width="24.318"
			height="15.406"
			fill="#686869"
			fill-rule="evenodd"
			transform="translate(0.198 0.482)" />
	</svg>
{/snippet}

{#snippet machina2T()}
	<div style="background-image: url('/img/machine/machine-2x-empty.png')">
		<svg height="600" width="368" stroke="none" viewBox="0 0 368 600">
			<g id="machine-2x-empty">
				<rect id="machine-2x" width="368" height="600" fill="none" />

				<rect
					opacity="0"
					fill="none"
					height="323"
					width="56"
					id="sidebarel-2x"
					transform="translate(287 25)" />

						<!-- <rect
					fill="none"
					height="166"
					width="218"
					id="productsel-2x"
					transform="translate(35 19)" /> -->

				<foreignObject x="287" y="25" height="323" width="56">
					<div class="text-xs w-full h-full relative">
						{#each ['statusdispl', 'coindispl', 'coinslot', 'keypad', 'changeout'] as id}
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
