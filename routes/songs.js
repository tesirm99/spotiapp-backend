const express = require('express');
const router = express.Router();
const songController = require('../controllers/songs');
const ensureAuthenticated = require('../middleware/auth').ensureAuthenticated;

router.get('/fetchSongsFromSpotify/:searchQ', ensureAuthenticated, songController.fetchSongsFromSpotify);

router.get('/', songController.getAllSongs);

router.get('/:id', songController.getSongById);

router.get('/searchByName/:name', songController.searchSongByName);

router.get('/searchByArtist/:artist', songController.searchSongByArtist);

router.get('/searchByAlbum/:album', songController.searchSongByAlbum);

router.get('/searchByDate/:date', songController.searchSongByDate);

router.post('/newsong', ensureAuthenticated, songController.postSong);

router.get('/:id/comments', songController.getCommentsBySongId);

router.post('/:id/comments', ensureAuthenticated, songController.postCommentToSong);

router.put('/:id', ensureAuthenticated, songController.updateSong);

router.delete('/:id', ensureAuthenticated, songController.deleteSong);

module.exports = router;