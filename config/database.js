const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/sistemaUsuarios";

const db = mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("Conectado con la base de datos");
  })
  .catch((err) => {
    console.log("No se ha podido realizar la conexión con la base de datos");
  });

module.exports = db;