'use strict';

class CategoriesService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
  }

  async findAll() {
    return this._Category.findAll({raw: true});
  }
}

module.exports = CategoriesService;
