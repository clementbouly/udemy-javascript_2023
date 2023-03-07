const express = require("express")
const { ObjectId } = require("mongodb")

const getDBCollection = require("../bdd/mongodb")

const router = express.Router()

router.post("/add-location", async (req, res, next) => {
	const newLocation = {
		address: req.body.address,
		coords: {
			lat: req.body.lat,
			lng: req.body.lng,
		},
	}
	try {
		const collection = await getDBCollection("user-locations")
		const result = await collection.insertOne(newLocation)
		console.log(result)
		res.json({ message: "Stored location!", locId: result.insertedId })
	} catch (err) {
		console.dir(err)
	}
})

router.get("/locations", async (req, res, next) => {
	const collection = await getDBCollection("user-locations")
	const locations = await collection.find().toArray()
	res.json({ locations: locations })
})

router.get("/locations/:lid", async (req, res, next) => {
	const collection = await getDBCollection("user-locations")
	// convert req.params.lid to ObjectId
	const id = new ObjectId(req.params.lid)
	const location = await collection.findOne({ _id: id })
	if (!location) {
		return res.status(404).json({ message: "Could not find location for the provided id." })
	}
	res.json({ location: location })
})

module.exports = router
