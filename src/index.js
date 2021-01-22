

const express = require ('express')

const New = require('./models/new')
const Reporter = require('./models/reporter')

const newRouter = require('./routers/new-router')
const reporterRouter = require('./routers/reporter-router')
require('./db/mongoose')


const app = express()
app.use(express.json())

app.use(newRouter)
app.use(reporterRouter)
const port = 3000


const jwt = require('jsonwebtoken')

// const myToken = async()=>{
//     const token = jwt.sign({_id:'123'},'node-course',{expiresIn:'7 days'})
//     //console.log(token)
//     const tokenVerify = jwt.verify(token,'node-course')
//     //console.log(tokenVerify)
// }

 
   myToken()



app.listen(port,()=>console.log('server is running'))