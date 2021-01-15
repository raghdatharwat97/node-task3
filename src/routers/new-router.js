
const express = require ('express')
const router = new express.Router()

const New = require('../models/new')


///////////////////////////////////////////////////////////
router.post('/news',(req,res)=>{
    const user = new New(req.body)
     user.save().then(()=>{
         res.status(200).send(user)
       }).catch((e)=>{
           res.status(400).send(e)
       })
   })
/////////////////////////////////////////////////////
   


router.get('/news',(req,res)=>{
    New.find({}).then((user)=>{
      res.status(200).send(user)
    }).catch((e)=>{
        res.status(500).send('internal server error')
    })
})
/////////////////////////////////////////////////////////////

router.get('/news/:id',(req,res)=>{
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
//////////////////////////////////////////////////






router.delete('/news/:id',async(req,res)=>{
  
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

module.exports = router