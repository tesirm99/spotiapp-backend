const SongModel = require('../models/song');

module.exports.getAllSongs = async function(req, res) {
    const songs = await SongModel.find();
    res.json(songs);
}