const { mongoose } = require('mongoose');
const parcelModel = new mongoose.Schema({
    Item: {
        type: String, required: true, uppercase: true
    },

    attributes: {
        type: Map,
        of: String
    },

    updated: {
        type: Date, default: Date.now
    },
});

module.exports = mongoose.model('Parcels', parcelModel);