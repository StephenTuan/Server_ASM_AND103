const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Fruists = new Schema({
    name: {type: String, unique: true}, 
    id_category: {type: Schema.Types.ObjectId, ref: 'categories'},
    distributor: {type: String},
    price: {type: Number},
    rate: {type: Number},
    description: {type: String},
    imageFruist: {type: String} // URL ảnh từ online
}, {
    timestamps: true
})
module.exports = mongoose.model('fruist', Fruists)