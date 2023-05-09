const mongoose = require('../db/mongo');
const { Schema } = mongoose;
const { cmtSchema } = require('./comment').cmtSchema;

const SongSchema = new Schema({
    name: { type: String, required: true },
    artist: { type: [String], required: true },
    album: { type: String, required: true },
    releaseDate: { type: Number, required: true },
    genres: { type: [String], required: true },
    duration: { type: Number, required: true },
    images: { type: [String], required: true },
    href: { type: String, required: true },
    popularity: { type: Number, required: true },
    comments: { type: Map, of: cmtSchema, required: true },
});

module.exports = mongoose.model('Song', SongSchema);