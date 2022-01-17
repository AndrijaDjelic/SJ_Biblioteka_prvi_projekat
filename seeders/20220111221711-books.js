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
    await queryInterface.bulkInsert('Books', [
      {
        //id: 1
        title: 'Metro 2033',
        author: 'Dmitry Glukhovsky',
        genre: 'Horror',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 2
        title: 'Blood of Elves',
        author: 'Andrzej Sapkowski',
        genre: 'Fantasy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 3
        title: 'Sword of Destiny',
        author: 'Andrzej Sapkowski',
        genre: 'Fantasy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 4
        title: 'Metro 2034',
        author: 'Dmitry Glukhovsky',
        genre: 'Horror',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        // id: 5
        title: 'Metro 2035',
        author: 'Dmitry Glukhovsky',
        genre: 'Horror',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Books', null, {});
  }
};
