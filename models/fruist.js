const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Fruists = new Schema({
    nameFruist: {type: String, unique: true}, 
    id_category: {type: Schema.Types.ObjectId, ref: 'categories'},
    distributorFruist: {type: String},
    priceFruist: {type: Number},
    rateFruist: {type: Number},
    descriptionFruist: {type: String}
}, {
    timestamps: true
})
module.exports = mongoose.model('fruist', Fruists)