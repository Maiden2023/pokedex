module.exports = (sequelize, DataTypes) => {
    const Habilidad = sequelize.define("Habilidad", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        });
    
        return Habilidad;
    };