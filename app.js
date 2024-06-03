require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const  database = require('./config/database')
const todo = require('./routes/todoRoute')
const ResponseService = require('./helper/response.service')

database()
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:  false}))
app.use('/todo' , todo)
app.use((req, res, next) => {
    // Attach ResponseService to the response object
    res.responseService = ResponseService;
    next();
});
app.listen(port, () => console.log(`Server Running on on port ${port}!`))