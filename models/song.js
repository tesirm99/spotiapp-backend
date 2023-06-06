const mongoose = require('../db/mongo');
const { Schema } = mongoose;
const { cmtSchema } = require('./comment').cmtSchema;

const SongSchema = new Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    releaseDate: { type: String, required: true },
    genre: { type: String, required: true },
    duration: { type: Number, required: true },
    image: { type: String, required: true },
    href: { type: String, required: true },
    popularity: { type: Number, required: true },
    geolocation: { type: [Number], required: false },
    comments: { type: [ cmtSchema ], required: false },
});

module.exports = mongoose.model('Song', SongSchema);