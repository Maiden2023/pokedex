const db = require("../models");

exports.listHabilidades = async (req, res) => {
    const habilidades = await db.habilidades.findAll();
    res.json(habilidades);
};

exports.getHabilidadById = async (req, res) => {
    const id = req.params.id;
    const habilidad = await db.habilidades.findByPk(id);
    if (!habilidad) {
        res.status(404).json({ msg: 'Habilidad no encontrada' });
        return;
    }
    res.json(habilidad);
};

exports.createHabilidad = async (req, res) => {
    const habilidad = {
        nombre: req.body.nombre
    };
    const habilidadCreada = await db.habilidades.create(habilidad);
    res.status(201).json(habilidadCreada);
};

exports.updateHabilidad = async (req, res) => {
    const id = req.params.id;

    try {
        const habilidad = await db.habilidades.findByPk(id);

        if (!habilidad) {
            return res.status(404).json({ msg: 'Habilidad no encontrada' });
        }

        // Actualizar el nombre de la habilidad
        habilidad.nombre = req.body.nombre;

        // Guardar los cambios
        await habilidad.save();

        res.json(habilidad);
    } catch (error) {
        console.error('Error al actualizar la habilidad:', error);
        res.status(500).json({ msg: 'Error al actualizar la habilidad' });
    }
};


exports.deleteHabilidad = async (req, res) => {
    const id = req.params.id;
    const habilidad = await db.habilidades.findByPk(id);
    if (!habilidad) {
        res.status(404).json({ msg: 'Habilidad no encontrada' });
        return;
    }
    await habilidad.destroy();
    res.json({ msg: 'Habilidad eliminada correctamente' });
};
