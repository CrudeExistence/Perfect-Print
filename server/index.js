require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')


app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../temps.html'))
})

app.get('/css', (req,res) => {
    res.sendFile(path.join(__dirname, '..styles.css'))
})

app.get('/js', (req,res) => {
    res.sendFile(path.join(__dirname, '../main.js'))
})

app.get('/jsback', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.js'))
})


//? commented out because it's already in the database now
// app.post('/seed', seed)



app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))