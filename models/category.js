const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Categories = new Schema({
    nameCate: {type: String, unique: true},
}, {
    timestamps: true
})
module.exports = mongoose.model('category', Categories)