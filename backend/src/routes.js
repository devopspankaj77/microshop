import express from 'express'
export function routes(pool) {
const r = express.Router()


r.get('/health', async (req, res) => {
try {
await pool.query('SELECT 1')
res.json({ status: 'ok', db: 'up' })
} catch (e) {
res.status(500).json({ status: 'error', db: 'down', error: String(e) })
}
})


r.get('/items', async (req, res) => {
const [rows] = await pool.query('SELECT id, name FROM items ORDER BY id DESC')
res.json(rows)
})


r.post('/items', async (req, res) => {
const { name } = req.body
if (!name || !name.trim()) return res.status(400).json({ error: 'name required' })
const [result] = await pool.query('INSERT INTO items (name) VALUES (?)', [name.trim()])
res.json({ id: result.insertId, name: name.trim() })
})


r.delete('/items/:id', async (req, res) => {
const id = Number(req.params.id)
await pool.query('DELETE FROM items WHERE id = ?', [id])
res.json({ ok: true })
})


return r
}