"use strict";

const {nanoid} = require(`nanoid`);
const {ID_LENGTH} = require(`../cli/constants`);

class AdService {
  constructor(offers) {
    this._offers = offers;
  }

  create(offer) {
    const newOffer = Object
      .assign({id: nanoid(ID_LENGTH), comments: []}, offer);

    this._offers.push(newOffer);
    return newOffer;
  }

  drop(id) {
    const offer = this._offers.find((item) => item.id === id);

    if (!offer) {
      return null;
    }

    this._offers = this._offers.filter((item) => item.id !== id);
    return offer;
  }

  findAll() {
    return this._offers;
  }

  findOne(id) {
    return this._offers.find((item) => item.id === id);
  }

  update(id, offer) {
    const oldOffer = this._offers
      .find((item) => item.id === id);

    return Object.assign(oldOffer, offer);
  }

}

module.exports = AdService;
