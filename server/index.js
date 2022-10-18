require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlerMiddleWare')
const path =require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api',router)

//Останній Middleware
app.use(errorHandler)
const start = async () => {
    try {
        await sequelize.authenticate();
       // await sequelize.sync()
        console.log('Connection has been established successfully.');
        app.listen(PORT, () => console.log('Start on ' + PORT))
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}

start()