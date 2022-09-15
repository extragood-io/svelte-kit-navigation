<script>
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { onDestroy, onMount } from 'svelte';
	import TransactionDetails from '$lib/Transaction/details.svelte';
	import { fetchTransactions } from '$lib/api';

	// This variable is set from the load function above
	export let transaction_id;

	// We use stores to reference the list of transactions as well as the transaction details
	// for the currently selected transaction.
	const transactions = writable([]);
	const selectedTxn = writable(undefined);

	// Track subscriptions to wrtable stores, to unsubscribe when the component is destroyed
	const unsubs = [];

	// Main function for setting the correct state on the page.
	// This idempotent function sets the selected transaction data
	// based on the transaction id from dynamic path.
	// It identifies the selected transaction from the list of all transactions loaded
	// when the component mounts.
	function setupPage(txn_id, txns = $transactions) {
		if (!txns) return;

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

	// Call the setupPage method reactively when the transaction_id is changed
	$: setupPage(transaction_id, $transactions);

	// Call the setupPage method reactively when the list of all transactions is changed
	unsubs[unsubs.length] = transactions.subscribe((ts) => setupPage(transaction_id, ts));

	// Fetch all transactions when this component mounts
	onMount(() => {
		fetchTransactions().then((ts) => {
			transactions.set(ts);
		});
	});

	// Unsubscribe from all subscriptions
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
			{#each $transactions as txn (txn.id)}
				<li
					class:active={txn.id == transaction_id}
					class="m-2 border border-green-900 rounded-sm p-2"
				>
					<a href={`/transactions/${txn.id}`} class="linklike">Transaction {txn.id}</a>
				</li>
			{:else}
				<li>No transactions</li>
			{/each}
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
