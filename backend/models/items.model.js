const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    name: {type: String, required: true},
    field: {type: String, required: true},
    price:{type: Number, required: true},
    count: {type: Number, required: true},
    date:{type: Date, required: true}
},{
    timestamps: true,
});

const items  = mongoose.model('Items', itemsSchema);
module.exports = items;