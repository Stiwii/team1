'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Publications_tags extends Model {

    static associate(models) {

      // Relations - Publications_tags
      Publications_tags.belongsTo(models.Publications, { as: 'publication' })
      Publications_tags.belongsTo(models.Tags, { as: 'tag'})
    }
  }
  Publications_tags.init({
    publication_id: {
      type: DataTypes.UUID
    },
    tag_id: {
      type: DataTypes.BIGINT
    }
  }, {
    sequelize,
    modelName: 'Publications_tags',  // Hacemos la diferencia del modelo
    tableName: 'publications_tags',  // y la tabla en la DB para ser explicitos
    underscored: true,
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
    // y minimizar que se nos escape algo
    scopes: {
      public_view: {
        attributes: ['tag_id', 'publication_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  })
  return Publications_tags
}