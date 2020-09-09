const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
    createToken : (data) => {
        const token = jwt.sign({...data}, 'eventfinder');

        return token;
    },

    validateToken : (req, res, next) => {
        try {
        const bearerToken = req.headers.authorization
        if(!bearerToken){
            res.status(401).json({
                message: "Unauthorized"
            })
        } 
            const token = bearerToken.split(' ')[1]
            const decoded = jwt.verify(token, 'eventfinder');
            if(decoded){
                next()
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                message: "Invalid Signature"
            })
        }
    },
    
}