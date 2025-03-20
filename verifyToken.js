const jsonwebtoken = require('jsonwebtoken')

function auth(req,res,next){
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({message:'Acess denied'})
    }
    
    try{
        const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET)
        req.user=verified._id
        next()
    }catch(err){
        res.status(401).send({message:'Acess denied'})
    }
}

module.exports=auth