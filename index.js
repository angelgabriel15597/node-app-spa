const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./public/user');
const Sedes = require('./public/locales');
const Citas = require('./public/citas');
const Reservas = require('./public/reservas');

const port = 3000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const mongo_uri = 'mongodb+srv://AngelQR:angelgabriel15597@angelqr.ig7edln.mongodb.net/project';

mongoose.connect(mongo_uri, function (err) {
    if (err) {
        throw err
    } else {
        console.log('Base de datos conectado')
    }
})

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    user.save(err => {
        if (err) {

            res.status(500).send('ERROR AL REGISTRAR AL USUARIO')
        } else {
            res.status(200).send('USUARIO REGISTRADO')

        }
    })
});

app.post('/sedes', (req, res) => {
    const { agencia, distrito, direccion, lat, lon } = req.body;
    const sedes = new Sedes({ agencia, distrito, direccion, lat, lon });
    sedes.save(err => {
        if (err) {
            res.status(500).send('ERROR AL REGISTRAR AL USUARIO')
        } else {
            res.status(200).send('USUARIO REGISTRADO')

        }
    })
});
app.post('/reservas', (req, res) => {
    // fullname: { type: String, required: true },
    // phone: { type: String, required: true },
    // area: { type: String, required: true },
    // hour: { type: String, required: true },
    // date: { type: String, required: true },
    const { fullname, phone, area, hour, date } = req.body;
    const citas = new Reservas({ fullname, phone, area, hour, date });
    citas.save(err => {
        if (err) {
            res.status(500).send('ERROR AL REGISTRAR LA CITA')
        } else {
            res.status(200).send('CITA REGISTRADA')

        }
    })
});
app.post('/saveDate', (req, res) => {
    const { agencia, distrito, direccion, fecha, username, servicio } = req.body;
    const citas = new Citas({ agencia, distrito, direccion, fecha, username, servicio });
    citas.save(err => {
        if (err) {
            res.status(500).send('ERROR AL REGISTRAR LA CITA')
        } else {
            res.status(200).send('CITA REGISTRADA')

        }
    })
});

app.post('/getCitas', (req, res) => {
    const { username } = req.body;
    Citas.find({ username }, (err, citas) => {
        if (err) {
            res.status(500).send('ERROR AL OBTENER LAS CITAS')
        } else {
            res.status(200).send(citas)

        }
    })

});
app.post('/authenticate', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(500).send('ERROR AL AUTENTICAR AL USUARIO')
        } else if (!user) {
            res.status(500).send('USUARIO NO EXISTE')

        } else {
            user.isCorrectPassword(password, (err, result) => {
                if (err) {
                    res.status(500).send('ERROR AL AUTENTICAR')
                } else if (result) {

                    res.status(200).send('USUARIO AUTENTICADO CORRECTAMENTE')
                } else {
                    res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA')
                }
            })
        }
    })

});
app.get('/listsedes', (req, res) => {
    // const { username, password } = req.body;
    Sedes.find({}, (err, sedes) => {
        if (err) {
            res.status(500).send('ERROR AL OBTENER LAS SEDES')
        } else {
            res.status(200).send(sedes)

        }
    })

});
app.get('/', (req, res) => {

});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;