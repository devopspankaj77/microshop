import React, { useEffect, useState } from 'react'
import { api } from './api'


export default function App() {
const [status, setStatus] = useState('checking...')
const [items, setItems] = useState([])
const [name, setName] = useState('')


useEffect(() => {
api.health().then(h => setStatus(`${h.status} - DB: ${h.db}`))
api.listItems().then(setItems)
}, [])


async function add(e) {
e.preventDefault()
if (!name.trim()) return
await api.addItem(name.trim())
setName('')
setItems(await api.listItems())
}


async function remove(id) {
await api.deleteItem(id)
setItems(await api.listItems())
}


return (
<div className="container">
<h1>MicroShop</h1>
<p>API status: {status}</p>


<form onSubmit={add} className="row">
<input value={name} onChange={e => setName(e.target.value)} placeholder="Item name" />
<button type="submit">Add</button>
</form>


<ul>
{items.map(i => (
<li key={i.id}>
{i.name}
<button onClick={() => remove(i.id)}>✕</button>
</li>
))}
</ul>
</div>
)
}