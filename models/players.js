// Creating database model
    // Soccer Players

const mongoose = require("mongoose")

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
    }, 
    position: {
        type: String,
        enum: ["GK", "LB", "CB", "RB", "CDM", "CM", "CAM", "LW", "RW", "CF", "ST"]
    },
    number: {
        type: Number
    },
    isStarter: {
        type: Boolean
    },
})

const Player = mongoose.model("Player", playerSchema)

module.exports = Player