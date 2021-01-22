
const express = require ('express')
const { update } = require('../models/reporter')
const router = new express.Router()
const Reporter = require('../models/reporter')
const auth = require('../middleware/auth')
const multer = require('multer')

//////////////////////////////////////////////////////////////////////////

router.post('/reporters',async(req,res)=>{
    const user = new Reporter(req.body)
    try{
        await user.save()
        const token = await user.generateToken()
        res.status(200).send({user})
    }
    catch(e){
        res.status(400).send(e)
    }
})
//////////////////////////////////////////////////////////////////////////////////
router.post('/reporters/login',async(req,res)=>{
    try{
        const user = await Reporter.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateToken()
        res.status(200).send({user})
    }
    catch(e){
        res.status(400).send('unable to login')
    }
})

/////////////////////////////////////////////////////////////////////////
   router.get('/reporters',auth,async(req,res)=>{
          res.send(req.user)
     })
 ///////////////////////////////////////////////////////////////////    
 

 // logout
 router.post('/logout',auth,async(req,res)=>{
     try{
        req.user.tokens = req.user.tokens.filter((el)=>{
          
            return el.token !== req.token                   
        })
        await req.user.save()
        res.send('logout successfully')
     }
     catch(e){
        res.status(500).send('please login')

     }
     
 })
 ///////////////////////////////////////////////////////////////
  router.post('/logoutAll',auth,async(req,res)=>{
    try{
       req.user.tokens = []
       await req.user.save()
       res.send('logout from all successfully')
    }
    catch(e){
       res.status(500).send('please login')

    }
    
  })
 ///////////////////////////////////////////////////////////////
  router.patch('/profile',auth,async(req,res)=>{

    const updates = Object.keys(req.body)             
    //console.log(updates)

   try{
       updates.forEach((update)=> req.user[update]=req.body[update])
       await req.user.save()
       res.status(200).send(req.user)
       
  }catch(e){
       res.status(400).send(e)
    }
 })
 ////////////////////////////////////////////////////////////////

 router.delete('/profile',auth,async(req,res)=>{
    
    try{
       await req.user.remove()
        res.status(400).send(' deleted ')
    
      }
      catch(e){
       res.send(e)
      }
   
 })


////////////////////////////////////////////////////////////////////////////
module.exports = router