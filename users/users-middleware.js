const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const users = require("./users-model")
function restrict() {
return async(req, res, next)=>{
    try{
        //if you recieve the token form client store it in headers
        const token = req.headers.authorization
        if(!token) {
            return res.status(401).json({
                message: "invalid credentials"
            })
        }
        //else verify the token is correct and that it has the write secret
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                return res.status(401).json({
                    message: "invalid credentials"
                })
            }

            //attach the decoded payload to the request so we can use the data later
             req.token = decoded
	        //token has been verified
            next()
        })

        
    }catch(err){
        next(err)
    }
}
}

function validateUser() {
    return async (req, res, next) => {
    try{
        const {username, password, department} = req.body
        const user = await users.findByUsername(username)
        const passwordValid = await bcrypt.compare(password, user.password)
        const validateDepartment = await users.findByDepartment(user.department)
if(!user || !passwordValid || !validateDepartment){
    res.status(401).json({
        message: "invalide credentials"
    })
}
// else if(department !== validateDepartment) {
//      res.status(401).json({
//         message: "invalid credentials"
//     })
else{
    next()
}
}catch(err){
            next(err)
        }
}
}

function signToken() {
    return async (req, res, next) => {
        try{
        const {username} = req.body
        const user = await users.findByUsername(username)

        const token = jwt.sign({
            //this is the payload objet of the token === the data that we want encrypted in the token
            userID: user.id,
        }, process.env.JWT_SECRET)
        
        req.token = token
        //console.log(req)
        next()
    }catch(err){
            next(err)
        }
    }
}

module.exports = {
    restrict,
    validateUser,
    signToken
}