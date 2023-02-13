'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('publications', 'image_url')
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('modifyPublications')
  }
}