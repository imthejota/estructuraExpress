const { static } = require('express');
const statics = (folder) => static(folder);

module.exports = statics;