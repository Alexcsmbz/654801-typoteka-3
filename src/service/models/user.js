/* eslint-disable new-cap */
"use strict";

const {DataTypes} = require(`sequelize`);

module.exports = (sequelize) =>
  sequelize.define(`User`, {
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    avatar: DataTypes.STRING(50),
  });
