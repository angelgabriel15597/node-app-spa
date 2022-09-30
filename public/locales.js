const mongoose = require('mongoose');


const SedesSchema = new mongoose.Schema({
    agencia: { type: String, unique: true },
    distrito: { type: String },
    direccion: { type: String },
    lat: { type: Number },
    lon: { type: Number }
});


SedesSchema.pre('save', function (next) {
    next();

});

module.exports = mongoose.model('Sedes', SedesSchema);
