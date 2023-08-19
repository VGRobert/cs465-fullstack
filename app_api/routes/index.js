const express = require('express');
const router = express.Router();
//const ctrlMain = require('../controllers/main');
const tripsController = require('../controllers/trips'); // require the trips controller

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;
