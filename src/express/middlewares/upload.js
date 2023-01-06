"use strict";

const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const {UPLOAD_IMAGES_DIR} = require(`../constants`);

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_IMAGES_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (_, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const upload = multer({storage});

module.exports = upload;
