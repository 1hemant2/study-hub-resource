const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    topicName: {
        type: String,
        // unique: true,
        required: true
    },
    topicDetails: {
        type: String,
        required: true,
    },
    downloadResource: {
        type: String,
    },
    code: {
        type: String
    },
    subtopics: [
        {
            name: String,
            details: String,
            code: String
        }
    ]

}, {
    timestamps: true
})
const Post = mongoose.model("Post", postSchema);
module.exports = Post;