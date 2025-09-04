// Creating database model
    // Soccer Players

const mongoose = require("mongoose")

const playerSchema = new mongoose.Schema({
    name: String,
    position: String,
    number: Number,
    isStarter: Boolean,
})

const Player = mongoose.model("Player", playerSchema)

module.exports = Player