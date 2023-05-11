const SongModel = require('../models/song');
const dotenv = require('dotenv');
dotenv.config();

module.exports.getAllSongs = async function(req, res) {
    const songs = await SongModel.find();
    res.json(songs);
}

module.exports.getSongById = async function(req, res) {
    const song = await SongModel.findById(req.params.id);
    res.json(song);
}

module.exports.searchSongByName = async function(req, res) {
    const songs = await SongModel.find({name: req.params.name});
    res.json(songs);
}

module.exports.searchSongByArtist = async function(req, res) {
    const songs = await SongModel.find({artist: req.params.artist});
    res.json(songs);
}

module.exports.searchSongByAlbum = async function(req, res) {
    const songs = await SongModel.find({album: req.params.album});
    res.json(songs);
}

module.exports.searchSongByDate = async function(req, res) {
    const songs = await SongModel.find({releaseDate: req.params.date});
    res.json(songs);
}

module.exports.getCommentsBySongId = async function(req, res) {
    const song = await SongModel.findById(req.params.id);
    res.json(song.comments);
}

module.exports.postSong = async function(req, res) {
    const song = new SongModel(req.body);
    await song.save();
    res.json(song);
}

module.exports.updateSong = async function(req, res) {
}

module.exports.deleteSong = async function(req, res) {
    await SongModel.findByIdAndDelete(req.params.id);
    res.json({message: 'Song deleted'});
}

module.exports.postCommentToSong = async function(req, res) {
    const song = await SongModel.findById(req.params.id);
    song.comments.set(req.body.username, req.body.comment);
    await song.save();
    res.json(song.comments);
}

module.exports.deleteCommentFromSong = async function(req, res) {
    const song = await SongModel.findById(req.params.id);
    song.comments.delete(req.params.commentId);
    await song.save();
    res.json(song.comments);
}

module.exports.fetchSongsFromSpotify = async function(req, res) {
    //Recuperar las cansiones de spotify
    let token = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': process.env.SPOTIFY_ID,
            'client_secret': process.env.SPOTIFY_SECRET
        })
    })

    let tokenJson = await token.json();

    
    console.log(tokenJson);

    let songs = await fetch('https://api.spotify.com/v1/search?q=' + req.params.searchQ + '&type=track&limit=10&offset=5', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenJson.access_token,
            'Content-Type': 'application/json',
        },
    })

    let songsJson = await songs.json();

    console.log(songsJson);

    res.json(songsJson);
}