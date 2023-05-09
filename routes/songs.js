const express = require('express');
const router = express.Router();
const songController = require('../controllers/songs');

router.get('/fetchSongsFromSpotify', songController.fetchSongsFromSpotify);

router.get('/', songController.getAllSongs);

router.get('/songs/:id', songController.getSongById);

router.get('/songs/searchByName/:name', songController.searchSongByName);

router.get('/songs/searchByArtist/:artist', songController.searchSongByArtist);

router.get('/songs/searchByAlbum/:album', songController.searchSongByAlbum);

router.get('/songs/searchByDate/:date', songController.searchSongByDate);

router.post('/songs/newsong', songController.postSong);

router.get('/songs/:id/comments', songController.getCommentsBySongId);

router.post('/songs/:id/comments', songController.postCommentToSong);

router.put('/songs/:id', songController.updateSong);

router.delete('/songs/:id', songController.deleteSong);




module.exports = router;