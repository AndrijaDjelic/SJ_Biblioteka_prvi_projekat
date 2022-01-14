'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JoinRentsRentBooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Rents,RentBooks}) {
      // define association here
      this.belongsTo(Rents, {foreignKey: 'rentId', as: 'rent'});
      this.belongsTo(RentBooks, {foreignKey: 'rentBookId', as: 'rentBook'});
    }
  };
  JoinRentsRentBooks.init({
  }, {
    sequelize,
    modelName: 'JoinRentsRentBooks',
  });
  return JoinRentsRentBooks;
};