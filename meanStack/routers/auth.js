const router = require("express").Router();
const Product = require('../model/product.js');
const {productValidation}=require('../validation');


router.post('/',async (req, res) => {
    const {error}=productValidation(req.body);
    if(error) return  res.status(400).send(error.details[0].message)  
 
    
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
            res.json({success:true,
                message:"Users Inserted successfully", product:req.product,
                product})
            res.send("added")
    
    
        } catch (err) {
    
            res.status(400).send(err)
    
        }
 
    
    })

router.get('/',async (req, res) => {
    await Product.find(req.query).then(Products=> res.json({success:true,
        message:"Users retrived successfully", Product:req.Product,
        Products})).catch(error=>res.json(error))
        
        })
    
router.put('/:id', async (req, res,next) => { 
            const {error}=productValidation(req.body);
            if(error) return  res.status(400).send(error.details[0].message)


           

            Product.findOneAndUpdate({_id : req.params.id},
                
                {
                    $set:{
                        title:req.body.title,
                        price:req.body.price,
                        description:req.body.description,    
                        category: req.body.category,
                        image: req.body.image,
                        
                    }
                })

                .then(model=> {
                    res.json({success:true,
                        message:"Users deleted successfully", Product:req.Product,
                        Products})
                }).catch(error=>{
                    res.json({
                        message: "user doesn't Exist!!",
                       
                    })
                   })
            //res.send("PUT Request Called")
})
router.delete('/:id',async (req, res) => {

    const user=await Product.findOne({_id: req.params.id});
    if(!user) return  res.status(400).send("product not Exist!!!")


            await Product.remove({_id:req.params.id}).then(Products=> res.json({success:true,
                message:"Users deleted successfully", Product:req.Product,
                Products})).catch(error=>res.json({success:false,
                    message:"Users deleted successfully", Product:req.Product,
                    Products}))
                
                })
    
module.exports = router;