'use strict'

import 'dotenv/config'
import express from "express"

const app = express();
const PORT = process.env.PORT

app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'));

app.get('/', (req, res) => {
    return res.send('hello')
})

app.listen(PORT, () => {
    console.log(`Listening on port #${PORT}`)
})