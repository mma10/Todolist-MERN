const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    console.log('middleware ran');

    const token = req.params.token;
    //console.log(token,'token');
    if(!token || token == 'null' || token == 'undefined') 
        return res.status(401).json({msg: 'No token, authorisation denied from middleware'});
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY || "myJWTSecret");  
        if(!decoded)
            res.status(401).json({ msg: "Authentication denied" });      
        req.user = decoded;  
        console.log(decoded,'this is decoded');                        
    }
    catch(err){
        res.status(401).json({msg: 'invalid token'});
    }    
    
    next();
}

module.exports = auth;