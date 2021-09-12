'use strict';

const {nanoid} = require(`nanoid`);
const {UPLOAD_IMAGES_DIR} = require(`./constants`);
const path = require(`path`);
const multer = require(`multer`);

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_IMAGES_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (_, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

module.exports = storage;
