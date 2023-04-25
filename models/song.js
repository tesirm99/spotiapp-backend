const mongoose = require('../db/mongo');
const { Schema } = mongoose;

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
    comments: [
        {
            author: { type: String, required: true },
            comment: { type: String, required: true },
            date: { type: Date, default: Date.now },
            stars: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model('Song', SongSchema);