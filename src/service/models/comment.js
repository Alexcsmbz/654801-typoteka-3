'use strict';

const {DataTypes} = require(`sequelize`);

module.exports = (sequelize) => sequelize.define(`Comment`, {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
