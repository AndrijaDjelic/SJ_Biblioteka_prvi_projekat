'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,JoinRentsRentBooks}) {
      // define association here
      this.belongsTo(Users, {foreignKey: 'userId', as: 'user'});
      this.hasMany(JoinRentsRentBooks, {foreignKey: 'rentId', as:'joinTable', onDelete: 'cascade', hooks: true})
    }
  };
  Rents.init({
    startDate:{
      type:DataTypes.DATE,
      allowNull: false
    },
    endDate:{
      type:DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Rents',
  });
  return Rents;
};