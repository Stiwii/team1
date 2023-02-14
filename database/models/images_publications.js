'use strict';
const {
  Model
} = require('sequelize');
const { getObjectSignedUrl } = require('../../libs/s3')
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
    key_s3: {
      type: DataTypes.STRING,
    },
    publication_id: {
      type: DataTypes.UUID,
    },
    image_url: {
      type: DataTypes.TEXT
    }
  }, {
  sequelize,
    modelName: 'Images_publications',
      tableName: 'images_publications',  // y la tabla en la DB para ser explicitos
        underscored: true,
          timestamps: true,
            scopes: {
    public_view: {
      attributes: ['id', 'key_s3', 'publication_id', 'image_url']
    },
    images_publication: {
      attributes: ['id', 'key_s3','image_url']
    },
    virtual: {
      attributes: ['id', 'key_s3', 'singedURL']
    }
  },
});
return Images_publications;
};