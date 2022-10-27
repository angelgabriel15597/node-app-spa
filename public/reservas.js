const mongoose = require('mongoose');


const ReservasSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    area: { type: String, required: true },
    hour: { type: String, required: true },
    date: { type: String, required: true },
});


ReservasSchema.pre('save', function (next) {
    next();
});

module.exports = mongoose.model('Reservas', ReservasSchema);
