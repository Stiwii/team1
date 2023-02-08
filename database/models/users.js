'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Profiles, { as: 'profile', foreignKey: 'user_id' })
    }
  }
  Users.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:true
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:true
      }
    },
    email_verified: {
      type: DataTypes.DATE
    },
    token: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Users',  // Hacemos la diferencia del modelo
    tableName: 'users',  // y la tabla en la DB para ser explicitos
    underscored: true,
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
    // y minimizar que se nos escape algo
    scopes: {
      public_view: {
        attributes: ['id', 'first_name', 'last_name', 'email', 'username']
      },
      user_info: {
        attributes: ['id', 'email', 'username']
      },
      set_token: {
        attributes: ['id', 'first_name', 'last_name', 'email', 'username','token']
      },
      check_user: {
        attributes: ['id', 'first_name', 'last_name', 'email', 'username', 'password']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  })
  return Users
}