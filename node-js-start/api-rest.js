const express = require("express")
const bodyParser = require("body-parser")
// import router location.js
const locationRoutes = require("./routes/location")

const app = express()

app.use(bodyParser.json())

// handle CORS
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
	next()
})

app.use(locationRoutes)

app.listen(3000, () => {
	console.log("Server is running on port 3000")
})
