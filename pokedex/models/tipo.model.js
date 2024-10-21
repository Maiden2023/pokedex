module.exports = (sequelize, DataTypes) => {
    const Tipo = sequelize.define("Tipo", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        });
    
        return Tipo;
    };
