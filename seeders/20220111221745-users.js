'use strict';
const bcrypt = require('bcrypt');
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
    await queryInterface.bulkInsert('Users', [
      {
        //id: 1
        username: 'Aleksa',
        password: bcrypt.hashSync('1234', 10),
        role: "moderator",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 1
        username: 'Pera',
        password: bcrypt.hashSync('1234', 10),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 1
        username: 'Nenad',
        password: bcrypt.hashSync('1234', 10),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 1
        username: 'Andrija',
        password: bcrypt.hashSync('1234', 10),
        role: "client",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        //id: 1
        username: 'Sloba',
        password: bcrypt.hashSync('1234', 10),
        role: "client",
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
     await queryInterface.bulkDelete('Users', null, {});
  }
};
