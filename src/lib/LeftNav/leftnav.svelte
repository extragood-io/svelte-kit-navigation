<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-col text-purple-900">
	<a
		href="/"
		class:bg-gray-300={$page.url.pathname == '' || $page.url.pathname == '/'}
		class="p-4 flex flex-row cursor-pointer"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5 mr-2"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
			/>
		</svg>
		Home
	</a>
	<a
		href="/transactions"
		class:bg-gray-300={$page.url.pathname.startsWith('/transactions')}
		class="p-4 flex flex-row cursor-pointer"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5 mr-2"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
				clip-rule="evenodd"
			/>
		</svg>
		Transactions
	</a>
</div>
