require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const MOVIES = require('./MOVIES.json')

const app = express()
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

function authorize(req, res, next){
    const authToken = req.get('Authorization').split(' ')[1]
    console.log(authToken)
    next()
}

app.get('/movie', authorize, (req, res) => {
    let response = MOVIES
    const genre = req.query.genre
    const country = req.query.country
    const avg_vote = req.query.avg_vote

    if(genre) {
        response = response.filter(response => 
            response.genre.toLowerCase().includes(genre.toLowerCase()))
    }

    if(country) {
        response = response.filter(response => 
            response.country.toLowerCase().includes(country.toLowerCase()))
    }

    if(avg_vote) {
        response = response.filter(response => 
            response.avg_vote >= Number(avg_vote))
    }


    res.json(response)
})

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})