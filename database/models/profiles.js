'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
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
      // Relations - PROFILES

      Profiles.belongsTo(models.Users, { as: 'user' })
      // Profiles.belongsTo(models.Users, {as: 'user', foreignKey: 'profile_id'})
      Profiles.belongsTo(models.Roles, { as: 'role', foreignKey: 'role_id' })
      Profiles.belongsTo(models.Countries)
      Profiles.hasMany(models.Votes, { as: 'votes', foreignKey: 'profile_id' })
      Profiles.hasMany(models.Publications, { as: 'publications', foreignKey: 'profile_id' })

      // Consejo avanzado, esta aquí por si más adelante hay una lección.
      // Algunas veces, el scope tendrá includes
      // para evitar errores es usual usarlo así
      // Profiles.addScope('scope_name', {})
    }
  }
  Profiles.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID
    },
    role_id: {
      type: DataTypes.BIGINT,
      defaultValue: '1'
    },
    country_id: {
      type: DataTypes.BIGINT,
      defaultValue: '1'
    },
    image_url: {
      type: DataTypes.STRING
    },
    code_phone: {
      type: DataTypes.INTEGER
    },
    phone: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Profiles',  // Hacemos la diferencia del modelo
    tableName: 'profiles',  // y la tabla en la DB para ser explicitos
    underscored: true,
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
    // y minimizar que se nos escape algo
    scopes: {
      public_view: {
        attributes: ['image_url', 'code_phone', 'phone']
      },
      new_profile: {
        attributes: ['id', 'image_url', 'code_phone', 'phone']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  })
  return Profiles
}