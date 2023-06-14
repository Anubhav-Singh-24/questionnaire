const jwt = require('jsonwebtoken')
const jwtSecret = 'f4$d64df#J%tj'

const fetchuser = (req,res,next)=>{
    // Get the user from the token and add id to req object
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Please use a valid token"})
    }
    try {
        const data = jwt.verify(token,jwtSecret);
        req.user = data.user
        next();
    } catch (error) {
        res.status(401).send({error:"Please use a valid token"})
    }
}

module.exports = fetchuser