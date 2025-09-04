export const api = {
async health() {
const res = await fetch('/api/health')
return res.json()
},
async listItems() {
const res = await fetch('/api/items')
return res.json()
},
async addItem(name) {
const res = await fetch('/api/items', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name })
})
return res.json()
},
async deleteItem(id) {
const res = await fetch(`/api/items/${id}`, { method: 'DELETE' })
return res.json()
}
}