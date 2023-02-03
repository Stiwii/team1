'use strict'
const { Op } = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, /*Sequelize*/) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('publications_types', [
        {
          id: '1',
          name: 'Marcas y tiendas',
          description: 'Marcas y tiendas',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '2',
          name: 'Artistas y conciertos',
          description: 'concert',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '3',
          name: 'Torneos',
          description: 'Torneos',
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

  async down(queryInterface, /*Sequelize*/) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('publications_types', {
        name: {
          [Op.or]: ['event', 'concert', 'tournament']
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
