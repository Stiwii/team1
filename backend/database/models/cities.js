'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cities.hasMany(models.Publications, { as: 'publications', foreignKey: 'city_id' })
      Cities.belongsTo(models.States,{ as: 'state'})
    }
  }
  Cities.init({
    id: { // usando Serial
      primaryKey: true,
      type: DataTypes.BIGINT  // Puede ser Integer o BigInt -> BigInt es mejor
    },
    state_id: {
      type: DataTypes.BIGINT,
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Cities',
    tableName: 'cities',  // y la tabla en la DB para ser explicitos
    underscored: true,
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
    // y minimizar que se nos escape algo
    scopes: {
      public_view: {
        attributes: ['id', 'state_id', 'name']
      },
      get_city: {
        attributes: ['id','name']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  })
  return Cities
}