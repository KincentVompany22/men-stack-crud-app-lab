const express = require("express")

const router = express.Router()

const Player = require("../models/players.js")


/* --- ROUTES --- */

// GET ROUTES

// Index Route - Show All Players
router.get("/", async (req, res) => {
    const allPlayers = await Player.find() // need to define a constant here because we call it back when rendering the object
    console.log(allPlayers)
    res.render("index.ejs", { players: allPlayers })
})

// Show New Player Form
router.get("/new", (req, res) => {
    res.render("new.ejs")
})

// Show Player Details
router.get("/:playerId", async (req, res) => {
    const showPlayer = await Player.findById(req.params.playerId) // how does playerId here know to select the object Id?
    console.log(showPlayer)
    res.render("show.ejs", { player: showPlayer})
})

// Show Edit Player Form
router.get("/:playerId/edit", async (req, res) => {
    const showPlayer = await Player.findById(req.params.playerId) 
    console.log(showPlayer)
    res.render("edit.ejs", { player: showPlayer })
})


// POST ROUTES

// Create Player
router.post("/", async (req, res) => {
    // console.log(req.body) // just to test object is coming through
    if (req.body.isStarter === "on") {
        req.body.isStarter = true
    } else {
        req.body.isStarter = false
    }
    await Player.create(req.body) // here we dont need to create a constant for this because we are not passing along an object to a page / rendering
    res.redirect("/")
})

// PUT ROUTES

// Edit Player
router.put("/:playerId", async (req, res) => { // always a bit confused as to what to put for the URL, should review
    if (req.body.isStarter === "on") {
        req.body.isStarter = true
    } else {
        req.body.isStarter = false
    }
    await Player.findByIdAndUpdate(req.params.playerId, req.body) // find playerId and update the body
    res.redirect("/")
    // const showPlayer = await Player.findById(req.params.playerId) // trying to have it show the players/playerId page after editing
    // res.render("show.ejs", { player: showPlayer})
}) 

// DELETE ROUTES

// Delete Player
router.delete("/:playerId", async (req, res) => {
    await Player.findByIdAndDelete(req.params.playerId)
    res.redirect("/")
})

// Need to add delete button 
    // On edit?


module.exports = router