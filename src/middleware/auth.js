
const jwt= require('jsonwebtoken')
const Reporter = require('../models/reporter')
const auth = async(req,res,next)=>{
    try{
        const token= req.header('Authorization').replace('Bearer ','')
        const decode =jwt.verify(token,'node-course')
        const user = await Reporter.findOne({_id:decode._id , 'tokens.token':token})
       // console.log(user)
        //next()
        if (!user){
            throw new error()
        }
        req.user = user
        req.token = token
        next()
    }
    catch(e){
        res.status(401).send({error:'please authorization'})
    }
}
///////////////////////////////////////////////////////////////////////////


module.exports= auth