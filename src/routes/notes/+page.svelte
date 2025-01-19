<script lang="ts">
	import Modal from '../../lib/modal/Modal.svelte'
	let title = $state('Notes')
	let showModal = $state(false)
</script>

<section class="page-layer nwp">
	<article class="content">
		<h1>Library {title}</h1>
		<p>
			<a href="#/" class="btn">Start</a>
			<button class="btn" onclick={() => (showModal = true)}>
				show modal
			</button>
		</p>
	</article>
</section>

<Modal bind:showModal>
	{#snippet header()}
		<header class="flex items-center justify-between">
			<span class="text-lg font-bold">Info</span>
			<span></span>
		</header>
	{/snippet}

	<p class="py-4">Click the button below to close</p>
	<div class="modal-action">
		<button class="btn">Action</button>
		<form method="dialog">
			<!-- if there is a button, it will close the modal -->
			<button class="btn">Close</button>
		</form>
	</div>
</Modal>
