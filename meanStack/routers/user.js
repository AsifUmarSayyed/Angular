const router = require("express").Router();
const bcrypt=require('bcryptjs')
const User = require('../model/user.js');
const {userValidation,loginValidation}=require('../validation');
const jwt=require("jsonwebtoken")
const verify=require("./verify")


router.post('/',async (req, res) => {
    const {error}=userValidation(req.body);
    if(error) return  res.status(400).send(error.details[0].message)  

    const isUser= await User.findOne({email:req.body.email})
    if(isUser) return  res.status(400).send(isUser) 

    const salt= await bcrypt.genSalt(10)
const hashedPassword= await bcrypt.hash(req.body.password,salt)
    
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            address:req.body.address, 
          contact: req.body.contact,
         image: req.body.image,
            
        });
    
        try {
    
            await user.save();
            // res.json({success:true,
            //     message:"user Inserted successfully", user:req.user,
            //     users})
            return res.send({success:true,
                message:"Users Inserted successfully", user:req.user,
                user})
            
    
    
        } catch (err) {
    
            return res.status(400).send(err)
    
        }
 
    
    })

    router.post('/login',async (req, res) => {
        const {error}=loginValidation(req.body);
        if(error) return  res.status(400).send(error.details[0].message)  
    
        const user= await User.findOne({email:req.body.email})
        if(!user) return  res.status(400).send("user not Found") 

        const passwordExist= await bcrypt.compare(req.body.password, user.password)
        if(!passwordExist) return  res.status(400).send("Password not Exist!!!")
     
                    
        
   //const token= jwt.sign({exp: Math.floor(Date.now() / 1000) + (60*60),_id:user._id},process.env.TOKEN_SECRET)
const token= jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{ expiresIn:"1hr"})
res.setHeader("auth-token", token)
        
               
                return res.send({success:true,
                    message:"Users Login successfully", user:req.user,
                    user,
                    token})
                
        
        
          
     
        
        })

router.get('/',verify,async (req, res) => {
   await User.find()
    
    .then(users=> {return res.json({success:true,
        message:"Users retrived successfully",
        users})}).catch(error=>res.status(400).json(error))
    
  
        })
    
router.put('/:id',verify, async (req, res,next) => { 
    console.log(req.params.id);
      
            const {error}=userValidation(req.body);
            if(error) return  res.status(400).send(error.details[0].message) 

            const salt= await bcrypt.genSalt(10)
            const hashedPassword= await bcrypt.hash(req.body.password,salt)          

            User.findOneAndUpdate({_id : req.params.id},
                
                {
                    $set:{
                        name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            address:req.body.address, 
          contact: req.body.contact,
         image: req.body.image
              
                    }
                }
                ,{new:true})
                .then(user=> {
                   return res.json({success:true,
                        message:"Updated successfully", user:req.user,
                        user})
                }).catch(error=>{
                   return  res.json({
                        success:false,
                        message: "fail to update",
                       
                    })
                   })
            //res.send("PUT Request Called")
})
router.delete('/:id',verify,async (req, res) => {

    const user=await User.findOne({_id: req.params.id});
    if(!user) return  res.status(400).send("user not Exist!!!")


            await User.remove({_id:req.params.id}).then(users=> res.json({success:true,
                message:"Users deleted successfully", user:req.user,
                users})).catch(error=>res.json({success:false,
                    message:"Users deleted successfully", user:req.user,
                    users}))
                
                })
    
module.exports = router;