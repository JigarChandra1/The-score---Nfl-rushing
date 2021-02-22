/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Players', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Player: Sequelize.DataTypes.STRING,
      Team: Sequelize.DataTypes.STRING,
      Pos: Sequelize.DataTypes.STRING,
      Att: Sequelize.DataTypes.NUMBER,
      'Att/G': Sequelize.DataTypes.NUMBER,
      Yds: Sequelize.DataTypes.STRING,
      Avg: Sequelize.DataTypes.NUMBER,
      'Yds/G': Sequelize.DataTypes.NUMBER,
      TD: Sequelize.DataTypes.NUMBER,
      Lng: Sequelize.DataTypes.STRING,
      '1st': Sequelize.DataTypes.NUMBER,
      '1st%': Sequelize.DataTypes.NUMBER,
      '20+': Sequelize.DataTypes.NUMBER,
      '40+': Sequelize.DataTypes.NUMBER,
      FUM: Sequelize.DataTypes.NUMBER
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Players');
  }
};
