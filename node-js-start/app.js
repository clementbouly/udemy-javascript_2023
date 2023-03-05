// import http
const http = require("http")

// create server and a get request /users
http.createServer((req, res) => {
	let body = []
	req.on("data", (chunk) => {
		body.push(chunk)
	})

	let username = "Unknown User"

	req.on("end", () => {
		body = Buffer.concat(body).toString()

		if (body) {
			username = body.split("=")[1]
		}
		res.setHeader("Content-Type", "text/html")

		res.write(
			`<h1>${username}</h1><form action='/' method='POST'><input type='text' name='username'/><button type='submit'>Submit</button></form>`
		)
		res.end()
	})
}).listen(3000, () => {
	console.log("Server is running on port 3000")
})
