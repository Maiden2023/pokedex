const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const multer = require('multer');
const path = require('path');
const fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors({
  origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Servir archivos estáticos desde la carpeta 'public/img'
app.use('/img', express.static(path.join(__dirname, 'public/img')));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

const db = require("./models");
db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});

require('./routes')(app);

app.listen(3000, function () {
    console.log('Ingrese a http://localhost:3000')
})