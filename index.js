const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./public/user');

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

const mongo_uri = 'mongodb+srv://AngelQR:angelgabriel15597@angelqr.ig7edln.mongodb.net/login';

mongoose.connect(mongo_uri, function (err) {
    if (err) {
        throw err
    } else {
        console.log('Base de datos conectado')
    }
})

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    user.save(err => {
        if (err) {

            res.status(500).send('ERROR AL REGISTRAR AL USUARIO')
        } else {
            res.status(200).send('USUARIO REGISTRADO')

        }
    })
});
app.post('/authenticate', (req, res) => {
    const { username, password } = req.body;
    // console.log('USERNAME', username)
    User.find(({ username, password }, (err, user) => {
        console.log('USER', user)
        const item = user.find((item) => item.username === username);
        console.log(item)
        if (err) {
            res.status(500).send('ERROR AL AUTENTICAR AL USUARIO')
        } else if (!user) {
            res.status(200).send('USUARIO NO EXISTE')

        } else {
            console.log('else')
            let userFind;
            if (item) {
                userFind = item;
                userFind.isCorrectPassword(password, (err, result) => {
                    if (err) {
                        res.status(500).send('ERROR AL AUTENTICAR')
                    } else if (result) {

                        res.status(200).send('USUARIO AUTENTICADO CORRECTAMENTE')
                    } else {
                        console.log('asdas', result)
                        res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA')
                    }
                })
            } else {
                res.status(200).send('USUARIO NO EXISTE')
            }

        }
    }))

});
app.get('/', (req, res) => {

});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;