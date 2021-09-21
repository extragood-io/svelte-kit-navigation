<script context="module">
	export async function load({ page: { params } }) {
		const { id } = params;
		return { props: { transaction_id: id } };
	}
</script>

<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { onDestroy, onMount } from 'svelte';
	import TransactionDetails from '$lib/Transaction/details.svelte';
	import { fetchTransactions } from '$lib/api';

	export let transaction_id;
	const transactions = writable([]);
	const selectedTxn = writable(undefined);
	const unsubs = [];

	function setupPage(txn_id, txns = $transactions) {
		if (!txns) return;

		console.log('SETUP PAGE', txn_id, txns);

		if (txn_id === '' && txns.length > 0) {
			goto(`/transactions/${txns[0].id}`);
			return;
		}

		if ($selectedTxn?.id != txn_id) {
			const txn = txns.find((f) => f.id == txn_id);
			if (!txn) return;
			$selectedTxn = txn;
		}
	}

	$: setupPage(transaction_id, $transactions);

	unsubs[unsubs.length] = transactions.subscribe((ts) => setupPage(transaction_id, ts));

	onMount(() => {
		fetchTransactions().then((ts) => {
			transactions.set(ts);
		});
	});

	onDestroy(() => unsubs.forEach((_) => _()));
</script>

<div class="flex flex-row">
	<div class="w-1/4">
		<div class="flex flex-row m-2 mt-6 justify-between">
			Transactions
			<a href="?new=t">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 text-purple-900"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</a>
		</div>
		<ul class="flex flex-col">
			{#if $transactions.length > 0}
				{#each $transactions as txn (txn.id)}
					<li
						class:active={txn.id == transaction_id}
						class="m-2 border border-green-900 rounded-sm p-2"
					>
						<a href={`/transactions/${txn.id}`} class="linklike">Transaction {txn.id}</a>
					</li>
				{/each}
			{:else}
				<li>No transactions</li>
			{/if}
		</ul>
	</div>
	<div class="w-3/4">
		{#if !$selectedTxn && $transactions?.length == 0}
			<div>Create transaction</div>
		{:else if $selectedTxn}
			<TransactionDetails {transaction_id} />
		{:else if transaction_id}
			<div>Transaction {transaction_id} not found</div>
		{/if}
	</div>
</div>

<style>
	li.active {
		@apply bg-gray-300 font-bold;
	}
</style>
