import { fetchTransactions } from '$lib/api'

export async function load({ params: { id } }) {
    const transactions = await fetchTransactions()
    return { transaction_id: id, transactions }
}

export const ssr = false
