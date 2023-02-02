'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('publications_tags', {
        publication_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'publications',
            key: 'id'
          },
          onUpdate: 'CASCADE', // Casi siempre elegimos CASCADE
          onDelete: 'CASCADE' // Elijan como quieren que se comporte la DB
        },
        tag_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'tags',
            key: 'id'
          },
          onUpdate: 'CASCADE', // Casi siempre elegimos CASCADE
          onDelete: 'CASCADE' // Elijan como quieren que se comporte la DB
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'created_at' // --> Asegurense de establecer el campo en snake_case aquí
          // o usando created_at en vez de createdAt en el Key
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at'
        }
      }, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, /*Sequelize*/) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('publications_tags', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}