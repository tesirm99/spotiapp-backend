const express = require('express');
const router = express.Router();
const songController = require('../controllers/songs');
const ensureAuthenticated = require('../middleware/auth').ensureAuthenticated;

/**
 * @swagger
 * /songs/fetchSongsFromSpotify/{searchQ}:
 *  get:
 *   description: Use to request songs from Spotify API
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: searchQ
 *      description: The search query
 *      schema:
 *          type: string
 *      required: true
 *   responses:
 *    200:
 *     description: A successful response
 *     schema:
 *     type: array
 * 
 */
router.get('/fetchSongsFromSpotify/:searchQ', ensureAuthenticated, songController.fetchSongsFromSpotify);

/**
 * @swagger
 * /songs:
 *  get:
 *      description: Use to request all songs
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: A successful response
 *              schema:
 *                  type: array
 * 
 */
router.get('/', songController.getAllSongs);

/**
 * @swagger
 * /songs/{id}:
 *  get:
 *    summary: Obtener una canción por su ID
 *    description: Permite solicitar una canción por su ID.
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID de la canción
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Song'
 */
router.get('/:id', songController.getSongById);

/**
 * @swagger
 * /songs/searchByName/{name}:
 *  get:
 *    summary: Buscar canciones por nombre
 *    description: Permite buscar canciones por nombre.
 *    parameters:
 *      - in: path
 *        name: name
 *        description: Nombre de la canción
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Song'
 */
router.get('/searchByName/:name', songController.searchSongByName);

/**
 * @swagger
 * /songs/searchByArtist/{artist}:
 *  get:
 *    summary: Buscar canciones por artista
 *    description: Permite buscar canciones por artista.
 *    parameters:
 *      - in: path
 *        name: artist
 *        description: Artista de la canción
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Song'
 */
router.get('/searchByArtist/:artist', songController.searchSongByArtist);


/**
 * @swagger
 * /songs/searchByAlbum/{album}:
 *  get:
 *    summary: Buscar canciones por álbum
 *    description: Permite buscar canciones por álbum.
 *    parameters:
 *      - in: path
 *        name: album
 *        description: Álbum de la canción
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Song'
 */ 
router.get('/searchByAlbum/:album', songController.searchSongByAlbum);

/**
 * @swagger
 * /songs/searchByDate/{date}:
 *  get:
 *    summary: Buscar canciones por fecha
 *    description: Permite buscar canciones por fecha.
 *    parameters:
 *      - in: path
 *        name: date
 *        description: Fecha de la canción
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Song'
 */
router.get('/searchByDate/:date', songController.searchSongByDate);


/**
 * @swagger
 * /songs/newSong:
 *  post:
 *    summary: Crear una nueva canción
 *    description: Permite crear una nueva canción.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Song'
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Song'
 */
router.post('/newsong', ensureAuthenticated, songController.postSong);

/**
 * @swagger
 * /songs/{id}/comments:
 *  get:
 *    summary: Obtener comentarios de una canción
 *    description: Permite obtener los comentarios de una canción por su ID.
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID de la canción
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Comment'
 */
router.get('/:id/comments', songController.getCommentsBySongId);
/**
 * @swagger
 * /songs/{id}/comments:
 *  post:
 *    summary: Publicar un comentario en una canción
 *    description: Permite publicar un comentario en una canción por su ID.
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID de la canción
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Comment'
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 */
router.post('/:id/comments', songController.postCommentToSong);
/**
 * @swagger
 * /songs/{id}/comments/{commentId}:
 *  delete:
 *    summary: Eliminar un comentario de una canción
 *    description: Permite eliminar un comentario de una canción por su ID y el ID del comentario.
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID de la canción
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: commentId
 *        description: ID del comentario
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 */
router.delete('/:id/comments/:commentId', ensureAuthenticated, songController.deleteCommentFromSong);
/**
 * @swagger
 * /songs/{id}:
 *  put:
 *    summary: Actualizar una canción
 *    description: Permite actualizar una canción por su ID.
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID de la canción
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Song'
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Song'
 */
router.put('/:id', ensureAuthenticated, songController.updateSong);
/**
 * @swagger
 * /songs/{id}:
 *  delete:
 *    summary: Eliminar una canción
 *    description: Permite eliminar una canción por su ID.
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID de la canción
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Song'
 */
router.delete('/:id', ensureAuthenticated, songController.deleteSong);

module.exports = router;