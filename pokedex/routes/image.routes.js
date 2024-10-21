module.exports = app => {
    let router = require("express").Router();
    const upload = require('../config/multerConfig');
    const controller = require("../controllers/image.controller");

    // Ruta para subir la imagen
    router.post('/upload', upload.single('image'), controller.uploadImage);

    // Agregar la ruta al app
    app.use(router);
};
