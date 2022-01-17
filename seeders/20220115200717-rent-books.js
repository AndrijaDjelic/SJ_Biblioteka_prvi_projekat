'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('RentBooks', [
      {
        available:true,
        bookId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        available:true,
        bookId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        available:true,
        bookId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        available:true,
        bookId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        available:true,
        bookId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('RentBooks', null, {});
  }
};
