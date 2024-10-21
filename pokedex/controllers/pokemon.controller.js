const db = require("../models");

exports.listPokemons = async (req, res) => {
    const pokemons = await db.pokemons.findAll();
    res.json(pokemons);
};

exports.getPokemonById = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await db.pokemons.findByPk(id, {
            include: [
            { model: db.habilidades, as: "habilidad1" },
            { model: db.habilidades, as: "habilidad2" },
            { model: db.habilidades, as: "habilidad3" },
            { model: db.tipos, as: "tipo1" },
            { model: db.tipos, as: "tipo2" },
            { model: db.pokemons, as: "evolucionPrevia" },
            { model: db.pokemons, as: "evolucionSiguiente" }
            ]
        });
        if (!pokemon) {
            res.status(404).json({ msg: "Pokemon no encontrado" });
            return;
        }
        res.json(pokemon);
        } catch (error) {
        console.error("Error al obtener el Pokémon:", error);
        res.status(500).json({ msg: "Error al obtener el Pokémon" });
        }
    };
    const db = require("../models");

        exports.createPokemon = async (req, res) => {
        try {
            const pokemonData = {
            nombre: req.body.nombre,
            nroPokedex: req.body.nroPokedex,
            idHabilidad1: req.body.idHabilidad1 || null,
            idHabilidad2: req.body.idHabilidad2 || null,
            idHabilidad3: req.body.idHabilidad3 || null,
            idTipo1: req.body.idTipo1 || null,
            idTipo2: req.body.idTipo2 || null,
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            spattack: req.body.spattack,
            spdefense: req.body.spdefense,
            speed: req.body.speed,
            nivelEvolucion: req.body.nivelEvolucion,
            idEvPrevia: req.body.idEvPrevia || null,
            idEvSiguiente: req.body.idEvSiguiente || null,
            };
        
            // Si hay una imagen, añadimos la ruta de la imagen al objeto pokemon
            if (req.file) {
            pokemonData.imagen = `/public/img/${req.file.filename}`;
            }
        
            const newPokemon = await db.pokemons.create(pokemonData);
            res.status(201).json(newPokemon);
        } catch (error) {
            res.status(500).json({ msg: 'Error al crear el Pokémon', error });
        }
        };
        

exports.updatePokemon = async (req, res) => {
    const id = req.params.id;
    const pokemon = await db.pokemons.findByPk(id);
    if (!pokemon) {
        res.status(404).json({ msg: 'Pokemon no encontrado' });
        return;
    }

    Object.assign(pokemon, req.body);

    await db.pokemons.update(pokemon, {
        where: { id: id }
    });
    res.json(pokemon);
};

exports.deletePokemon = async (req, res) => {
    const id = req.params.id;
    const pokemon = await db.pokemons.findByPk(id);
    if (!pokemon) {
        res.status(404).json({ msg: 'Pokemon no encontrado' });
        return;
    }
    await pokemon.destroy();
    res.json({ msg: 'Pokemon eliminado correctamente' });
};

exports.searchPokemon = async (req, res) => {
    const searchQuery = req.query.q;
    if (!searchQuery) {
        return res.status(400).json({ msg: 'Parámetro de búsqueda faltante' });
    }

    try {
        const pokemons = await db.pokemons.findAll({
            where: {
                [db.Sequelize.Op.or]: [
                    { nombre: { [db.Sequelize.Op.like]: `%${searchQuery}%` } },
                    { nroPokedex: { [db.Sequelize.Op.eq]: searchQuery } }
                ]
            }
        });

        if (pokemons.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron Pokémon' });
        }

        res.json(pokemons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al buscar Pokémon' });
    }
};
