const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let sangreSchema = new Schema({
    code: {
        type: Number,
    },
    name: {
        type: String,
    },
    grupo:{
        type: String,
    },
    factor_rh:{
        type: String,
    },
    genero:{
        type: String,
    },
    globulos_rojos:{
        type: Number,
    },
    hemoglobina:{
        type: Number,
    },
    hematocrito:{
        type: Number,
    },
    globulos_blancos:{
        type: Number,
    },
    plaquetas:{
        type: Number,
    },
    type:{
        type: String,
    },
    date_donor:{
        type: Date,
    },
    date_due:{
        type: Date,
    },
    level:{
        type: String,
    },
    id_user:{
        type: String,
    },
    content: {
        type: String,
    },
    createBy: {
        type: String,
    }
});

module.exports = mongoose.model('Sangre', sangreSchema)