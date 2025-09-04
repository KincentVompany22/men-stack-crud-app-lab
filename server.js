// Imported Modules
const express = require("express")
const app = express() // importing express

require("dotenv").config() // importing dotenv
const PORT = process.env.PORT // setting port defined in .env file

const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI) // connecting to MongoDB database
const db = mongoose.connection
db.on("error", (err) => {console.log("ERROR: ", err)}) // connection message that will print to our terminal when there is an error
db.on("connected", () => {console.log(`Conntected to MongoDB ${mongoose.connection.name}.`)}) // connection message that will print to our terminal when we’ve connected to the database
db.on("disconnected", () => {console.log("mongo disconnected")}) // connection message that will print to our terminal when we’ve disconnected


const methodOverride = require("method-override") // to override form methods

const morgan = require("morgan") // for logging styling

const playersController = require("./controllers/players.js")


// Middleware
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use("/players", playersController) // when you see the URL that starts with /players - use this router
app.use(express.static("public")) // Importing Public Directory - to use CSS

// INITIAL GET ROUTE
app.get("/", async (req, res) => {
    res.redirect("/players") // redirects anyone who lands on "localhost:3000" automatically to "localhost:3000/players". So essentially making that my home page.
})



// Listener
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})