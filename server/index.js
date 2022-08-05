require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')




app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../temps.html'))
})

app.get('/css', (req,res) => {
    res.sendFile(path.join(__dirname, '../styles.css'))
})

app.get('/js', (req,res) => {
    res.sendFile(path.join(__dirname, '../main.js'))
})

app.get('/jsback', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.js'))
})

const { 
    getTempInfo,
    addNew,
    modifyEntry,
    deleteEntry
} = require('./controller')

app.get('/getTemps', getTempInfo)
app.post('/getTemps', addNew)
app.put(`/getTemps/:id`, modifyEntry)
app.delete(`/getTemps/:id`, deleteEntry)

//? commented out because it's already in the database now
// app.post('/seed', seed)

const port = process.env.PORT || 4004

app.listen(port, () => console.log(`up on ${port}`))