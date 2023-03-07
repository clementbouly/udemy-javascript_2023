const { MongoClient, ServerApiVersion } = require("mongodb")
const express = require("express")

const username = encodeURIComponent("clementbouly")
const password = encodeURIComponent("**************")
const dbName = "locations"

const uri = `mongodb+srv://${username}:${password}@learningcluster.kafftwi.mongodb.net/${dbName}?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
})

const getDBCollection = async (collectionName) => {
    await client.connect()
    const database = client.db(dbName)
    const collection = database.collection(collectionName)
    return collection
}

// export the getDBCollection function
module.exports = getDBCollection