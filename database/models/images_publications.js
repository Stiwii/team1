'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images_publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Images_publications.belongsTo(models.Publications)
    }
  }
  Images_publications.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    key_s3:{
      type: DataTypes.STRING,
    },
    publication_id: {
      type: DataTypes.UUID,
    },
    image_url: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Images_publications',
    tableName: 'images_publications',  // y la tabla en la DB para ser explicitos
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'key_s3', 'publication_id','image_url']
      }
    },
  });
  return Images_publications;
};