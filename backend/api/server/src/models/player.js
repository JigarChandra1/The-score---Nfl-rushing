/* eslint-disable linebreak-style */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Player.init({
    Player: DataTypes.STRING,
    Team: DataTypes.STRING,
    Pos: DataTypes.STRING,
    Att: DataTypes.NUMBER,
    'Att/G': DataTypes.NUMBER,
    Yds: DataTypes.STRING,
    Avg: DataTypes.NUMBER,
    'Yds/G': DataTypes.NUMBER,
    TD: DataTypes.NUMBER,
    Lng: DataTypes.STRING,
    '1st': DataTypes.NUMBER,
    '1st%': DataTypes.NUMBER,
    '20+': DataTypes.NUMBER,
    '40+': DataTypes.NUMBER,
    FUM: DataTypes.NUMBER
  }, {
    sequelize,
    timestamps: false
  });
  return Player;
};
