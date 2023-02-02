'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /*
        Siempre empezaremos definiendo el modelo Js a referenciar
        Seguido de los datos: 
        as: que servirá de alias en las consultas y mixins
      	
        foreignKey: Aquí especificamos de acuerdo con la función.
          1.- belongsTo: 'El campo en esta tabla que es FK es:'
          2.- hasOne, hasMany, belongsToMany: 'El campo en la otra tabla que es FK es:'
  
        through: Solo funciona en belongsToMany, especiifica la tabla pivote usando el modelo js
      */
      // Relations - VOTES

      Votes.belongsTo(models.Profiles)
      Votes.belongsTo(models.Publications)

      // Consejo avanzado, esta aquí por si más adelante hay una lección.
      // Algunas veces, el scope tendrá includes
      // para evitar errores es usual usarlo así
      // Votes.addScope('scope_name', {})
    }
  }
  Votes.init({
    publication_id: {
      type: DataTypes.UUIDV4,
      primaryKey:true
    },
    profile_id: {
      type: DataTypes.UUIDV4,
      primaryKey:true
    }
  }, {
    sequelize,
    modelName: 'Votes',  // Hacemos la diferencia del modelo
    tableName: 'votes',  // y la tabla en la DB para ser explicitos
    underscored: true,
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
    // y minimizar que se nos escape algo
    scopes: {
      public_view: {
        attributes: ['publication_id','profile_id','created_at', 'updated_at']
      },
      my_votes: {
        attributes: ['profile_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  })
  Votes.removeAttribute('id')
  return Votes
}