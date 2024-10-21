    module.exports = (sequelize, Sequelize) => {
        const Pokemon = sequelize.define("pokemon", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nroPokedex: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idHabilidad1: {
            type: Sequelize.INTEGER
        },
        idHabilidad2: {
            type: Sequelize.INTEGER
        },
        idHabilidad3: {
            type: Sequelize.INTEGER
        },
        idTipo1: {
            type: Sequelize.INTEGER
        },
        idTipo2: {
            type: Sequelize.INTEGER
        },
        hp: {
            type: Sequelize.INTEGER
        },
        attack: {
            type: Sequelize.INTEGER
        },
        defense: {
            type: Sequelize.INTEGER
        },
        spattack: {
            type: Sequelize.INTEGER
        },
        spdefense: {
            type: Sequelize.INTEGER
        },
        speed: {
            type: Sequelize.INTEGER
        },
        nivelEvolucion: {
            type: Sequelize.INTEGER
        },
        idEvPrevia: {
            type: Sequelize.INTEGER
        },
        idEvSiguiente: {
            type: Sequelize.INTEGER
        }
        });
    
        return Pokemon;
    };
    