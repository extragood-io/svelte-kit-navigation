import { writable } from "svelte/store";

export const token = writable('');
export const loading = writable(true);
export const isAuthenticated = writable(false);

let realToken = undefined
token.subscribe(value => {
	realToken = value
})

export function fetchapi(path, opts = {}) {
  const controller = new AbortController();
  const signal = controller.signal;

  const promise = fetch(`API_HOST${path}`, 
    { ...opts, 
      signal, 
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${realToken}` 
      }
    })

  promise
    .then((res) => {
      if(res.status === 401) {
        console.warn(`Unauthorized call to ${path}`)
      }
      return res
    })
    .catch((err) => console.debug(`Error calling ${path}`, err))

  return {
    abort: () => controller.abort(),
    ready: promise
  };
}

const faker_transactions = [
  {id: '1'},
  {id: '2'},
  {id: '3'},
  {id: '4'},
  {id: '5'},
  {id: '6'},
  {id: '7'},
  {id: '8'}
]
export const fetchTransactions = async () => {
    /**
     * In normal circumstances, a call to an API would take place here
     */
    // const api = fetchapi('/api/transactions')
    // const res = await api.ready
    // const result = await res.json()
    const res = await Promise.resolve({ ok: 200 })
    const result = await Promise.resolve({ data: faker_transactions })

    if (!res.ok) throw new Error(`Failed to fetch transactions: ${JSON.stringify(result)}`)

    return result.data
}


