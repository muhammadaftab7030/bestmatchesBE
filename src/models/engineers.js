require('dotenv').config()
const mongoose = require('mongoose');
const engineersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    profileDetails:[],
})


const engineersListModel = new mongoose.model("Engineers_list", engineersSchema)

module.exports = engineersListModel