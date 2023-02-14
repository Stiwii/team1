'use strict'
const { Op } = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, /*Sequelize*/) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('tags', [
        {
          // id: '1',
          name: 'Ropa y accesorios',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          // id: '2',
          name: 'Deportes',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          // id: '3',
          name: 'Conciertos',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          // id: '4',
          name: 'Meet & Greet',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          // id: '5',
          name: 'E-sport',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          // id: '6',
          name: 'Pop / Rock',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          // id: '7',
          name: 'Tecnologia',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          // id: '8',
          name: 'Hogar y Decoracion',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          // id: '9',
          name: 'Abastecimiento',
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, /*Sequelize*/) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('tags', {
        name: {
          [Op.or]: ['']
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
