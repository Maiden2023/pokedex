const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.pokemons = require("./pokemon.model.js")(sequelize, Sequelize);
db.tipos = require("./tipo.model.js")(sequelize, Sequelize);
db.habilidades = require("./habilidad.model.js")(sequelize, Sequelize);

// Relaciones
// Relación uno a muchos (un Pokémon puede tener hasta 2 tipos)
db.pokemons.belongsTo(db.tipos, { as: "tipo1", foreignKey: "idTipo1" });
db.pokemons.belongsTo(db.tipos, { as: "tipo2", foreignKey: "idTipo2" });

// Relación uno a muchos (un Pokémon puede tener hasta 3 habilidades)
db.pokemons.belongsTo(db.habilidades, { as: "habilidad1", foreignKey: "idHabilidad1" });
db.pokemons.belongsTo(db.habilidades, { as: "habilidad2", foreignKey: "idHabilidad2" });
db.pokemons.belongsTo(db.habilidades, { as: "habilidad3", foreignKey: "idHabilidad3" });

// Relación de autoasociación para la evolución de los Pokémon
db.pokemons.belongsTo(db.pokemons, { as: "evolucionPrevia", foreignKey: "idEvPrevia" });
db.pokemons.belongsTo(db.pokemons, { as: "evolucionSiguiente", foreignKey: "idEvSiguiente" });

module.exports = db;
