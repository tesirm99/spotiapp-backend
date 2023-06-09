const SongModel = require('../models/song');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
dotenv.config();

module.exports.getAllSongs = async function(req, res) {
    const songs = await SongModel.find();
    res.status(200).json(songs);
}

module.exports.getSongById = async function(req, res) {
    
    if(req.params.id == null || req.params.id == undefined) {
        res.status(400).send({ message: 'El id no puede ser nulo ni indefinido.' });
    }

    SongModel.findById(req.params.id)
    .then((song) => {
        if(song == null || song == undefined) {
            res.status(404).send({ message: 'La canción no existe.' });
        }

        res.status(200).json(song);
    })
    .catch((err) => {
        res.status(404).send({ message: `Error: la canción no se ha encontrado.\n ${err}` });
    });
    
}

module.exports.searchSongByName = async function(req, res) {

    if(req.params.name == null || req.params.name == undefined) {
        res.status(400).send({ message: 'El nombre no puede ser nulo ni indefinido.' });
    }

    SongModel.find({name: { $regex: req.params.name, $options: 'i' } } )
    .then((songs) => {
        if(songs == null || songs == undefined) {
            res.status(404).send({ message: 'La canción no existe.' });
        }

        res.status(200).json(songs);
    })
    .catch((err) => {
        res.status(404).send({ message: `Error: la canción no se ha encontrado.\n ${err}` });
    });

}

module.exports.searchSongByArtist = async function(req, res) {

    if(req.params.artist == null || req.params.artist == undefined) {
        res.status(400).send({ message: 'El artista no puede ser nulo ni indefinido.' });
    }

    SongModel.find({artist: { $regex: req.params.artist, $options: 'i' } })
    .then((songs) => {
        if(songs == null || songs == undefined) {
            res.status(404).send({ message: 'La canción no existe.' });
        }

        res.status(200).json(songs);
    })
    .catch((err) => {
        res.status(404).send({ message: `Error: la canción no se ha encontrado.\n ${err}` });
    });
    
}

module.exports.searchSongByAlbum = async function(req, res) {

    if(req.params.album == null || req.params.album == undefined) {
        res.status(400).send({ message: 'El album no puede ser nulo ni indefinido.' });
    }

    SongModel.find({album: req.params.album})
    .then((songs) => {
        if(songs == null || songs == undefined) {
            res.status(404).send({ message: 'La canción no existe.' });
        }

        res.status(200).json(songs);
    })
    .catch((err) => {
        res.status(404).send({ message: `Error: la canción no se ha encontrado.\n ${err}` });
    });
    
}

module.exports.searchSongByDate = async function(req, res) {

    if(req.params.date == null || req.params.date == undefined) {
        res.status(400).send({ message: 'La fecha no puede ser nula ni indefinida.' });
    }

    SongModel.find({releaseDate: req.params.date})
    .then((songs) => {
        if(songs == null || songs == undefined) {
            res.status(404).send({ message: 'La canción no existe.' });
        }

        res.status(200).json(songs);
    })
    .catch((err) => {
        res.status(404).send({ message: `Error: la canción no se ha encontrado.\n ${err}` });
    });

}

module.exports.getCommentsBySongId = async function(req, res) {

    if(req.params.id == null || req.params.id == undefined) {
        res.status(400).send({ message: 'El id no puede ser nulo ni indefinido.' });
    }

    SongModel.findById(req.params.id)
    .then((song) => {
        if(song == null || song == undefined) {
            res.status(404).send({ message: 'La canción no existe.' });
        }

        res.status(200).json(song.comments);
    })
    .catch((err) => {
        res.status(404).send({ message: `Error: la canción no se ha encontrado.\n ${err}` });
    });
    
}

module.exports.postSong = async function(req, res) {

    console.log("req.body: ", req.body);
    if(req.body.name == null || req.body.name == undefined) {
        res.status(400).send({ message: 'El nombre no puede ser nulo ni indefinido.' });
    }

    if(req.body.artist == null || req.body.artist == undefined) {
        res.status(400).send({ message: 'El artista no puede ser nulo ni indefinido.' });
    }

    if(req.body.album == null || req.body.album == undefined) {
        res.status(400).send({ message: 'El album no puede ser nulo ni indefinido.' });
    }

    if(req.body.releaseDate == null || req.body.releaseDate == undefined) {
        res.status(400).send({ message: 'La fecha de lanzamiento no puede ser nula ni indefinida.' });
    }

    if(req.body.duration == null || req.body.duration == undefined) {
        res.status(400).send({ message: 'La duración no puede ser nula ni indefinida.' });
    }

    if(req.body.image == null || req.body.image == undefined) {
        res.status(400).send({ message: 'Las imágenes no pueden ser nulas ni indefinidas.' });
    }

    if(req.body.href == null || req.body.href == undefined) {
        res.status(400).send({ message: 'El href no puede ser nulo ni indefinido.' });
    }

    if(req.body.popularity == null || req.body.popularity == undefined) {
        res.status(400).send({ message: 'La popularidad no puede ser nula ni indefinida.' });
    }

    let duration = parseFloat(req.body.duration).toFixed(2);

    const song = new SongModel({
        name: req.body.name,
        artist: req.body.artist,
        album: req.body.album,
        releaseDate: req.body.releaseDate,
        genre: req.body.genre,
        duration: duration,
        image: req.body.image,
        href: req.body.href,
        popularity: 0,
        geolocation: req.body.geolocation || [],
        
    });

    console.log("song: ", song);

    song.save()
    .then((song) => {
        res.status(201).json(song);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({ message: `Error: la canción no se ha creado.\n ${err}` });
    });
    
}

module.exports.updateSong = async function(req, res) {
    // Verificar errores de validación

    const { id } = req.params;
    const { name, artist, album, genre, releaseDate, href, duration, image } = req.body;

    try {
        // Verificar si la canción existe en la base de datos
        let song = await SongModel.findById(id);
        if (!song) {
            return res.status(404).json({ msg: 'Song not found' });
        }

        // Actualizar los campos de la canción
        song.name = name || song.name;
        song.artist = artist || song.artist;
        song.album = album || song.album;
        song.genre = genre || song.genre;
        song.href = href || song.href;
        song.duration = duration || song.duration;
        song.image = image || song.image;
        song.releaseDate = releaseDate || song.releaseDate;

        // Guardar los cambios en la base de datos
        await song.save();

        res.json({ msg: 'Song updated successfully', song });
    } catch (error) {
        console.error('Error updating the song', error);
        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports.deleteSong = async function(req, res) {

    if(req.params.id == null || req.params.id == undefined) {
        res.status(400).send({ message: 'El id no puede ser nulo ni indefinido.' });
    }

    SongModel.findByIdAndDelete(req.params.id)
    .then((song) => {
        console.log("delete song: ", song);
        if(song == null || song == undefined) {
            res.status(404).send({ message: 'La canción no existe.' }); 
        }

        res.status(202).json("La canción se ha borrado correctamente.");
    })
    .catch((err) => {
        res.status(404).send({ message: `Error: la canción no se ha encontrado.\n ${err}` });
    });

}

module.exports.postCommentToSong = async function(req, res) {

    if(req.params.id == null || req.params.id == undefined) {
        res.status(400).send({ message: 'El id no puede ser nulo ni indefinido.' });
    }

    if(req.body.author == null || req.body.author == undefined) {
        res.status(400).send({ message: 'El nombre de usuario no puede ser nulo ni indefinido.' });
    }

    if(req.body.commentText == null || req.body.commentText == undefined) {
        res.status(400).send({ message: 'El comentario no puede ser nulo ni indefinido.' });
    }

    if(req.body.stars == null || req.body.stars == undefined) {
        res.status(400).send({ message: 'La valoración no puede ser nula ni indefinida.' });
    }

    SongModel.findById(req.params.id)
    .then((song) => {
        if(song == null || song == undefined) {
            res.status(404).send({ message: 'La canción no existe.' });
        }
        console.log("found song: ", song);

        console.log("req.body: ", req.body);
        song.comments.push({
            author: req.body.author,
            commentText: req.body.commentText,
            stars: req.body.stars,
            date: req.body.date,
            geolocation: req.body.geolocation,
            author_id: req.body.author_id,
            _id: uuidv4()
        });

        let pop = 0
        song.comments.forEach((comment) => {
            pop += comment.stars;    
        });

        song.popularity = pop / song.comments.length;

        song.save()
        .then((song) => {
            res.status(201).json(song.comments);
        })
        .catch((err) => {
            res.status(400).send({ message: `Error: el comentario no se ha creado.\n ${err}` });
        });
    })
    .catch((err) => {
        res.status(404).send({ message: `Error: la canción no se ha encontrado.\n ${err}` });
    });
    
}

module.exports.deleteCommentFromSong = async function(req, res) {
    const song = await SongModel.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { comments: { _id: req.params.commentId } } },
        { new: true }
    );
    
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

    let songs = await fetch('https://api.spotify.com/v1/search?q=' + req.params.searchQ + '&type=track&limit=50&offset=5', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenJson.access_token,
            'Content-Type': 'application/json',
        },
    })

    let songsJson = await songs.json();

    console.log(songsJson);

    res.status(200).json(songsJson);
}