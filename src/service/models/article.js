/* eslint-disable new-cap */
"use strict";

const {DataTypes} = require(`sequelize`);

module.exports = (sequelize) =>
  sequelize.define(`Article`, {
    announce: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    img: DataTypes.STRING,
    title: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    fullText: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
  });
