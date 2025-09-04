import express from 'express'
import cors from 'cors'
import { getPool, migrate } from './db.js'
import { routes } from './routes.js'


const app = express()
app.use(cors())
app.use(express.json())


const port = process.env.PORT || 8080


const pool = await getPool()
await migrate(pool)


app.use('/api', routes(pool))


app.get('/', (req, res) => res.send('MicroShop API'))


app.listen(port, () => console.log(`API listening on ${port}`))