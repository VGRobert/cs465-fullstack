const mongoose = require('mongoose');
const Model = mongoose.model('trips');

// Get: /trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await Model.find({}).exec();
        if (!trips) {
            return res.status(404).json({ "message": "trips not found" });
        } else {
            return res.status(200).json(trips);
        }
    } catch (err) {
        return res.status(404).json(err);
    }
};

// Get: /trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Model.find({ 'code': req.params.tripCode }).exec();
        if (!trip) {
            return res.status(404).json({ "message": "trip not found" });
        } else {
            return res.status(200).json(trip);
        }
    } catch (err) {
        return res.status(404).json(err);
    }
};

const tripsAddTrip = async (req, res) => {
    try {
        const trip = await Model.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        return res.status(201).json(trip);
    } catch (err) {
        return res.status(400).json(err);
    }
}

const tripsUpdateTrip = async (req, res) => {
    try {
        const updatedTrip = await Model.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({ message: "Trip not found with code " + req.params.tripCode });
        }

        return res.status(200).json(updatedTrip);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Trip not found with code ' + req.params.tripCode });
        }
        return res.status(500).json(err);
    }
}

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};