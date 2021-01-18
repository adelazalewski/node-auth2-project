const express = require("express");
const bcrypt = require("bcryptjs")
const users = require("./users-model")
const router = express.Router()

router.get("/users", async (req, res, next) => {
    try{
const usersList = await users.find()
res.json(usersList)
    }catch(err){
        next(err)
    }
})
router.post("/register", async(req, res, next) => {
    try{
const {username, password, department} = req.body
//check if user exsists
const user = await users.findByUsername(username)
if(user) {
    return res.status(409).json({
        message: "username already taken"
    })
}

const newUser = await users.add({
    username,
    //here hash the password before saving it to the db with a time complexity of 14
    password: await bcrypt.hash(password, 14),
    department
})

res.status(201).json(newUser)

    }catch(err){
        next(err)
    }
})

module.exports = router