// Pass the id parameter from the dynamic path slug corresponding to /transactions/[id]
// This gets set to the exported variable transaction_id
throw new Error("@migration task: Check if you need to migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export async function load({ params: { id } }) {
	return { transaction_id: id };
}
