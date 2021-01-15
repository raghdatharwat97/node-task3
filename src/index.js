

const express = require ('express')

const New = require('./models/new')

const newRouter = require('./routers/new-router')
require('./db/mongoose')


const app = express()
app.use(express.json())

app.use(newRouter)

const port = 3000





app.listen(port,()=>console.log('server is running'))