const Joi= require("@hapi/joi");

const productValidation=(data)=>{
const schema=Joi.object({ 
       title:Joi.string().min(0).required(),
    price:Joi.number().min(0).required(),
    description:Joi.string().min(0).required(),    
  category: Joi.string().required(),
 image: Joi.string().required(),
    
})

    return schema.validate(data)
    
}
const userValidation=(data)=>{
    const schema=Joi.object({ 
           name:Joi.string().min(6).required(),
        email:Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
        address:Joi.string().min(6).required(),    
      contact: Joi.number().required(),
     image: Joi.string().required(),
        
    })
    
        return schema.validate(data)
        
    }

    const loginValidation=(data)=>{
        const schema=Joi.object({ 
              
            email:Joi.string().email().min(6).required(),
            password: Joi.string().min(6).required(),
            
            
        })
        
            return schema.validate(data)
            
        }
module.exports.loginValidation=loginValidation;
module.exports.productValidation=productValidation;
module.exports.userValidation=userValidation;

