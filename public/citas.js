const mongoose = require('mongoose');


const CitasSchema = new mongoose.Schema({
    username: { type: String, required: true },
    agencia: { type: String, required: true },
    distrito: { type: String, required: true },
    direccion: { type: String, required: true },
    servicio: { type: String, required: true },
    fecha: { type: String, required: true }
});


CitasSchema.pre('save', function (next) {
    next();
});

module.exports = mongoose.model('Citas', CitasSchema);
