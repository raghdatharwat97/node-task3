
const express = require ('express')
const router = new express.Router()

const New = require('../models/new')
const auth = require('../middleware/auth')
const multer = require('multer')

///////////////////////////////////////////////////////////
router.post('/news',auth,async(req,res)=>{
    const document = new New({
        ...req.body,
        owner:req.user._id
    })
    try{
            await document.save()
            res.status(200).send({document})
    }
     
       catch(e){
           res.status(400).send(e)
       }
   })
/////////////////////////////////////////////////////
   


// router.get('/news',auth,(req,res)=>{
//     New.find({}).then((user)=>{
//       res.status(200).send(user)
//     }).catch((e)=>{
//         res.status(500).send('internal server error')
//     })
// })
router.get('/news',auth,async (req,res)=>{
    try{
         await req.user.populate('news').execPopulate()
         res.send(req.user.news)
    }
    catch(e){
     res.status(500).send('Server Error')
    }
 })
/////////////////////////////////////////////////////////////

router.get('/news/:id',auth,(req,res)=>{
    const _id=req.params.id
    New.findById(_id).then((user)=>{
       if(!user){
           return res.status(400).send('unable to find new')
       }
       res.status(200).send(user)
    }).catch((e)=>{
       res.status(500).send('internal server error')
    })
   
})
/////////////////////////////////////////////////////////////

router.patch('/news/:id',auth,async(req,res)=>{
    const _id=req.params.id
    const updates = Object.keys(req.body)              
    
   try{
       const user = await New.findOne({_id, owner: req.user._id})
       await user.save()

       if(!user){
           return res.send('no user is found')
       }
       updates.forEach((update)=> user[update]=req.body[update])
       await task.save()
       res.send(user)

   } catch(e){
       res.status(400).send('error has occured')
    }
})



///////////////////////////////////////////////////////////////
router.delete('/news/:id',auth,async(req,res)=>{
  
    const _id=req.params.id
    try{
    const user = await  New.findByIdAndDelete(_id)
            if(!user){
                return res.status(400).send('unable to delete new')
            }
            res.status(200).send(user)
    
}
   catch(e){
       res.status(500).send(e)
    }
   
})
////////////////////////////////////////////////////////////////
const uploads = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
            return cb(new Error ('please upload an image'))
        }
        cb(undefined,true)
    }
})
 
router.post('/profile/avatar/:id',auth,uploads.single('avatar'),async(req,res)=>{
    const _id= req.params.id
  try{
      const user = await New.findOne({_id,owner:req.user._id})
      if(!user){
        res.status(400).send('unable to find file')

      }
    user.avatar = req.file.buffer
    await user.save()
    res.send('saved')
  }
  catch(e){
      res.send(e)
  }
    
})

module.exports = router