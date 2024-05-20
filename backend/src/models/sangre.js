const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productSchema = new Schema({
    code: {
        type: Number,
    },
    name:{
        type: String,
    },
    level:{
        type: String,
    },
    type:{
        type: String,
    },
    content: {
        type: String,
    },
    createBy: {
        type: String,
    }
});

module.exports = mongoose.model('Product', productSchema)