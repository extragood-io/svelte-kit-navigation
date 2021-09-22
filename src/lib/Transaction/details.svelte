<script>
	import { page, navigating } from '$app/stores';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { onDestroy } from 'svelte';

	export let transaction_id;
	let transaction = writable(undefined);
	let showForm = false;
	const unsubs = [];

	// Show form based on url parameters
	// Svelte-kit page store contains an instance of URLSearchParams
	// https://kit.svelte.dev/docs#loading-input-page
	function setupPage(p) {
		if (p.query.get('new') == 't') {
			showForm = true;
		} else {
			showForm = false;
		}
	}

	// Subscribe to page and navigating stores to setup page when navigation changes
	// Note that, in our testing, the Svelte-kit load function does not fire on child modules
	// This is an alternative way to detect navigation changes without the component load function
	unsubs[unsubs.length] = page.subscribe(setupPage);
	unsubs[unsubs.length] = navigating.subscribe((n) => {
		if (n?.to) {
			setupPage(n.to);
		}
	});

	async function fetchTransactionDetails(txn_id) {
		if (!txn_id) return;

		// In normal circumstances, a call to an API would take place here
		// const api = fetchapi(`/api/transactions/${txn_id}`)
		// const res = await api.ready
		const res = await Promise.resolve({
			ok: true,
			json: () =>
				Promise.resolve({
					data: {
						id: txn_id,
						name: `Transaction ${txn_id}`,
						user: 'Not a person',
						amount: '1 million dollars'
					}
				})
		});

		if (!res.ok) throw new Error('Network error');

		const json = await res.json();
		transaction.set(json.data);
	}

	$: fetchTransactionDetails(transaction_id);

	onDestroy(() => unsubs.forEach((_) => _()));
</script>

{#if !showForm && $transaction}
	<div class="m-6 p-6 border border-gray-600 rounded">
		Details for {$transaction.name}
		<div class="grid grid-cols-2 pt-6">
			<div>Id: {$transaction.id}</div>
			<div>Name: {$transaction.name}</div>
			<div>User: {$transaction.user}</div>
			<div>Amount: {$transaction.amount}</div>
		</div>
	</div>
{/if}

{#if showForm}
	<div class="m-6 p-6 border border-gray-600 rounded">
		Create new transaction
		<form class="grid grid-cols-2">
			<label for="name">Name</label>
			<input type="text" name="name" value="" />
			<label for="user">User</label>
			<input type="text" name="user" value="" />
			<label for="amount">Amount</label>
			<input type="text" name="amount" value="" />
			<button
				name="cancel"
				class="border border-purple-800 bg-purple-100 rounded-md w-16 mt-2"
				on:click|preventDefault={() => {
					// Hide form by unsetting query param new
					$page.query.delete('new');
					goto(`${$page.path}?${$page.query.toString()}`, {
						noscroll: true,
						keepfocus: true
					});
				}}
			>
				Cancel
			</button>
			<button name="save" class="border border-purple-800 bg-purple-100 rounded-md w-12 mt-2"
				>Save</button
			>
		</form>
	</div>
{/if}
