const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        message: "welcome to my api with token 2021"
    })
})

module.exports = router;