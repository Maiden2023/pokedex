const db = require("../models");

exports.listTipos = async (req, res) => {
    const tipos = await db.tipos.findAll();
    res.json(tipos);
};

exports.getTipoById = async (req, res) => {
    const id = req.params.id;
    const tipo = await db.tipos.findByPk(id);
    if (!tipo) {
        res.status(404).json({ msg: 'Tipo no encontrado' });
        return;
    }
    res.json(tipo);
};

exports.createTipo = async (req, res) => {
    const tipo = {
        nombre: req.body.nombre
    };
    const tipoCreado = await db.tipos.create(tipo);
    res.status(201).json(tipoCreado);
};

exports.updateTipo = async (req, res) => {
    const id = req.params.id;

    try {
        const tipo = await db.tipos.findByPk(id);

        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo no encontrado' });
        }

        // Actualizar el nombre
        tipo.nombre = req.body.nombre;

        // Guardar los cambios
        await tipo.save();

        res.json(tipo);
    } catch (error) {
        console.error('Error al actualizar el tipo:', error);
        res.status(500).json({ msg: 'Error al actualizar el tipo' });
    }
};


exports.deleteTipo = async (req, res) => {
    const id = req.params.id;
    const tipo = await db.tipos.findByPk(id);
    if (!tipo) {
        res.status(404).json({ msg: 'Tipo no encontrado' });
        return;
    }
    await tipo.destroy();
    res.json({ msg: 'Tipo eliminado correctamente' });
};
