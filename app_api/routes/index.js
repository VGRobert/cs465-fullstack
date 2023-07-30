const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlTrips = require('../controllers/trips'); // require the trips controller

/* GET home page. */
router.get('/', ctrlMain.index);

/* Trip routes. */
router.get('/trips', ctrlTrips.tripsList);
router.get('/trips/:tripCode', ctrlTrips.tripsFindByCode);

module.exports = router;
