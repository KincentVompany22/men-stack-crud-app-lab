const express = require("express")

const router = express.Router()

const Player = require("../models/players.js")


/* --- ROUTES --- */

// GET ROUTES

// Index Route
router.get("/", async (req, res) => {
    const allPlayers = await Player.find()
    console.log(allPlayers)
    res.render("index.ejs", { players: allPlayers })
})

// New Route
router.get("/new", (req, res) => {
    res.render("new.ejs")
})

// Show Route
router.get("/:playerId", async (req, res) => {
    const showPlayer = await Player.findById(req.params.playerId) // how does playerId here know to select the object Id?
    console.log(showPlayer)
    res.render("show.ejs", { player: showPlayer})
})



// POST ROUTES

// Create Route
router.post("/", async (req, res) => {
    // console.log(req.body) // just to test object is coming through
    if (req.body.isStarter === "on") {
        req.body.isStarter = true
    } else {
        req.body.isStarter = false
    }
    const newPlayer = await Player.create(req.body)
    console.log(newPlayer) // just to test data was added
    res.redirect("/")

})



module.exports = router