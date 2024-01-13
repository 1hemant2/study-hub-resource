const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    topicName: {
        type: String,
        required: true
    },
    topicDetails: {
        type: String,
        required: true,
    },
    downloadResource: {
        type: String,
    }

}, {
    timestamps: true
})
const Post = mongoose.model("Post", postSchema);
module.exports = Post;