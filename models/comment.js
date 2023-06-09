const mongoose = require('../db/mongo');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    author: { type: String, required: true },
    commentText: { type: String, required: true },
    date: { type: Date, default: Date.now },
    stars: { type: Number, required: true },
    geolocation: { type: [Number], required: false },
    author_id: { type: String, required: true }
});

module.exports = {
    cmtModel: mongoose.model('Comment', CommentSchema),
    cmtSchema: CommentSchema
};