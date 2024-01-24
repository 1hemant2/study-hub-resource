const mongoose = require('mongoose');
const elasticlunr = require('elasticlunr');
const postSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    topicName: {
        type: String,
        unique: true,
        required: true
    },
    topicDetails: {
        type: String,
    },
    downloadResource: {
        type: String,
    },
    code: {
        type: String
    },
    output: {
        type: String
    },
    subtopics: [
        {
            name: String,
            details: String,
            code: String,
            output: String
        }
    ]

}, {
    timestamps: true
})
postSchema.index({
    topicName: 'text',
});
const Post = mongoose.model("Post", postSchema);

// Create Elasticlunr.js index for topicName field only
const index = elasticlunr(function () {
    this.addField('topicName');
    this.setRef('id');
});

// Index existing data
Post.find().then(posts => {
    posts.forEach(post => {
        index.addDoc({ id: post._id, topicName: post.topicName });
    });
})
    .catch(err => {
        console.error('Error indexing data:', err);
    });

// Function to search topics by topicName using Elasticlunr.js
function searchTopics(query) {
    const searchResult = index.search(query, { expand: true });
    return searchResult;
}

module.exports = { Post, searchTopics };