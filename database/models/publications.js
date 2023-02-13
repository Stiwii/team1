'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publications.belongsTo(models.Profiles, { as: 'profile', foreignKey: 'profile_id' })
      Publications.belongsTo(models.Publications_types, { as: 'publication_type', foreignKey: 'publication_type_id' })
      Publications.belongsTo(models.Cities, { as: 'city', foreignKey: 'city_id' })
      Publications.hasMany(models.Votes, { as: 'votes', foreignKey: 'publication_id' })
      Publications.hasMany(models.Images_publications, { as: 'images_publication', foreignKey: 'publication_id' })
      Publications.belongsToMany(models.Tags, {as: 'tags', through: models.Publications_tags, foreignKey: 'publication_id'})
    }
  }
  Publications.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    profile_id: {
      type: DataTypes.UUID
    },
    publication_type_id: {
      type: DataTypes.BIGINT
    },
    title: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:true
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate:{
        notEmpty:true
      }
    },
    content: {
      type: DataTypes.TEXT,
      validate:{
        notEmpty:true
      }
    },
    picture: {
      type: DataTypes.STRING,
    },
    city_id: {
      type: DataTypes.BIGINT,
      validate:{
        notEmpty:true
      }
    },
    image_url: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Publications',
    tableName: 'publications',  // y la tabla en la DB para ser explicitos
    underscored: true,
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
    // y minimizar que se nos escape algo
    scopes: {
      public_view: {
        attributes: ['id', 'profile_id', 'publication_type_id', 'title', 'description', 'content', 'picture', 'city_id', 'image_url']
      },
      get_publication: {
        attributes: ['id', 'profile_id', 'title', 'description', 'content', 'picture', 'image_url','created_at', 'updated_at']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  })
  return Publications
}