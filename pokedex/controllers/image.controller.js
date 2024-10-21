const path = require('path');

exports.uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No se ha subido ningún archivo.' });
        }
    
        // Guardar la imagen en la carpeta especificada
        const uploadPath = path.join(__dirname, '../public/img/', req.file.filename);
    
        try {
        // Mover la imagen al destino
        req.file.mv(uploadPath, (err) => {
            if (err) {
            return res.status(500).json({ msg: 'Error al subir la imagen', err });
            }
            res.status(201).json({
            message: 'Imagen subida con éxito',
            imageUrl: `/img/${req.file.filename}` // Devolver la ruta de la imagen
            });
        });
        } catch (err) {
        res.status(500).json({ msg: 'Error al subir la imagen', err });
        }
    };