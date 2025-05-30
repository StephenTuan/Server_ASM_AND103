const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Fruists = new Schema({
    name: {type: String, unique: true},
    category: {type: String}, 
    distributor: {type: String},
    price: {type: Number},
    rate: {type: Number},
    description: {type: String}
}, {
    timestamps: true
})
module.exports = mongoose.model('fruist', Fruists)