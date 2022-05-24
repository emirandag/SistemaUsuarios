const express = require('express');
const app = express();
const mongodb = require('./config/database');
const bodyParser = require('body-parser');
const expressLayouts = require("express-ejs-layouts");



app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayouts);  // Tiene que ir antes del body-parser


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', require('./routes/users'));

app.use(function(req, res) {
	//res.status(404).render('errors/404', {title: '404: Page Not Found'});

    res.status(404).json({notFound: 'Página no encontrada'});
});

/**
 * Configuración del puerto
 */
 
const port = 80;

app.set('port', process.env.PORT || port);

app.listen(app.get('port'), (err) => {

    if (err) {
        console.log('No se ha podido iniciar el servidor');
    } else {
        console.log('Se ha iniciado el servidor en el puerto ' + port);
    }
});