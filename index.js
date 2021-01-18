require('dotenv').config()
const exppress = require("express");
const server = exppress()
const port = process.env.PORT || 5000;
const welcomeRputer = require("./users/welcomeRouter")
const userRouter = require("./users/usersRouter")
server.use(exppress.json());
server.use(welcomeRputer)
server.use(userRouter)

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})