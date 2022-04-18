const router = require("express").Router();
const product = require("../model/product.js");
const Product = require('../model/product.js');
const {productValidation}=require('../validation');
const verify=require("./verify")

router.post('/',verify,async (req, res) => {
    const {error}=productValidation(req.body);
    if(error) return  res.status(400).send({
        success:false,
        message:error.details[0].message})  
 
    
        const product = new Product({
             title:req.body.title,
             price:req.body.price,
             description:req.body.description,    
             category: req.body.category,
             image: req.body.image,
           
        });
    
        try {
    
            await product.save();
            // res.json({success:true,
            //     message:"Product Inserted successfully", Product:req.Product,
            //     Products})
            return res.send({success:true,
                message:"Users Inserted successfully", product:req.product,
                product})
            
    
    
        } catch (err) {
    
            return res.status(400).send({
                success:false,
                message:err.details[0].message})
    
        }
 
    
    })

router.get('/',verify,async (req, res) => {
   await Product.find()
    
    .then(products=> {return res.json({success:true,
        message:"Users retrived successfully",
        products})}).catch(error=>res.status(400).json({
            success:false,
                message:error.details[0].message}))
    
  
        })
    
router.put('/:id',verify, async (req, res,next) => { 
      
            const {error}=productValidation(req.body);
            if(error) return  res.status(400).json({
                success:false,
                message:error.details[0].message})           

            Product.findOneAndUpdate({_id : req.params.id},
                
                {
                    $set:{
                        title:req.body.title,
                        price:req.body.price,
                        description:req.body.description,    
                        category: req.body.category,
                        image: req.body.image,
                        
                    }
                },{new:true})
                .then(product=> {
                   return res.json({success:true,
                        message:"Updated successfully", product:req.product,
                        product})
                }).catch(error=>{
                   return  res.json({
                        success:false,
                        message: "fail to update",
                       
                    })
                   })
            //res.send("PUT Request Called")
})
router.delete('/:id',verify,async (req, res) => {

    const user=await Product.findOne({_id: req.params.id});
    if(!user) return  res.status(400).send("product not Exist!!!")


            await Product.remove({_id:req.params.id}).then(Products=> res.json({success:true,
                message:"Users deleted successfully", Product:req.Product,
                Products})).catch(error=>res.json({success:false,
                    message:"Users deleted successfully", Product:req.Product,
                    Products}))
                
                })
    
module.exports = router;