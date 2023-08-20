const authController = require('../controllers/authentication');
const express = require('express');
const router = express.Router();
//const ctrlMain = require('../controllers/main');
const tripsController = require('../controllers/trips'); // require the trips controller
const { expressjwt: expressJwt } = require('express-jwt');

const auth = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['SHA512']
});

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;
