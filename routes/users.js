const express = require('express');
const app = express();
const router = express.Router();
const users = require('../models/users');
//const router = express();


/*
router.get('/', (req, res) => {
    //res.send("Hola mundo JS");
    res.status(200).json({isConnected: true})
    console.dir(req.hostname);
});
*/

/*
app.route('/', (req, res) => {
    res.status(200).json({isConnected: true})
});*/


router.route('/').get((req, res) => {
    //res.status(200).json({isConnected: true});
    res.render('index');
});

router.route('/signin').get((req, res) => {

    //res.status(200).json({isConnected: true});
    res.render('signin');
    
}).post((req, res) => {

    
    const persona = {
        usuario: 'admin.mongodb@mirgo.local',
        password: 'P@$$w0rd'
    }
    

/*
    if (req.query.user == 'edulucho' && req.query.pass == '12345678') {
        res.status(200).json({isValidated: true});
        console.log('Validado');
    } else {
        console.log('Error en la validación');
    }
*/
    console.log(req.body.email);
    console.log(req.body.pass);


    const email = req.body.email;
    const pass = req.body.pass;

    if (email && pass) {
        users.getAuthenticated(email, pass, (err, user) => {
            if (err || !user) {
                console.log('Error');
            } else {
                if (email == "admin.mongodb@mirgo.local") {
                    console.log('Eres el Admin');
                }
            }
        });
    } else {
        console.log('Usuario y contraseña requeridos');
    }
    
    
    

    if (email == persona.usuario && pass == persona.password) {
        res.status(200).json({isValidated: true});
        console.log('Validado');
    } else {
        res.status(401).json({isValidated: false});
        console.log('Error en la validación');
    }
    

});


router.route('/signup').get((req, res) => {

    //res.status(200).json({isConnected: true});
    res.render('signup');

}).post((req, res) => {



    const user = req.body.user;
    const pass = req.body.pass;

    if (user && pass) {
        res.status(201).json({isRegistered: true});
        console.log('Usuario registrado');
    } else {
        res.status(201).json({isRegistered: false});
    }

});

module.exports = router;