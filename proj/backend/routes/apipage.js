//where to call the api page

const router = require('express').Router();
const { api } = require('../db/api.js');

//api extension
router.get('/api_country', api);

module.exports = router