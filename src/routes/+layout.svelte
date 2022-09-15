<script>
	import Leftnav from '$lib/LeftNav/leftnav.svelte';
	import '../app.css';
	/**
	 * Code for handling authentication, top level stores, etc
	 */
</script>

<div class="grid grid-cols-6 h-screen bg-gray-50">
	<div class="border-r border-gray-300 shadow-inner">
		<Leftnav />
	</div>
	<div class="col-span-5">
		<slot />
	</div>
</div>
