/* eslint-disable new-cap */
'use strict';

const {DataTypes} = require(`sequelize`);

module.exports = (sequelize) => sequelize.define(`Category`, {
  announce: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  img: DataTypes.STRING,
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
