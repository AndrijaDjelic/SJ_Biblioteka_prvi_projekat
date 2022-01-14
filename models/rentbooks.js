'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentBooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Books, JoinRentsRentBooks}) {
      // define association here
      this.belongsTo(Books, {foreignKey: 'bookId', as: 'book'});
      this.hasMany(JoinRentsRentBooks,{foreignKey:'rentBookId', as:'joinTable', onDelete: 'cascade', hooks: true})
    }
  };
  RentBooks.init({
    available: {
      type:DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'RentBooks',
  });
  return RentBooks;
};