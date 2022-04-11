const Joi= require("@hapi/joi");

const productValidation=(data)=>{
const schema=Joi.object({ 
  
  

    title:Joi.string().min(6).required(),
    price:Joi.number().min(6).required(),
    description:Joi.string().min(6).required(),    
  category: Joi.string().required(),
 image: Joi.string().required(),
    
})

    return schema.validate(data)
    
}

module.exports.productValidation=productValidation;
