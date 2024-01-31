const { Post, searchTopics } = require('../model/Post');

exports.createPost = async (req, res) => {
    try {
        const { initialData, subtopics } = req.body;
        const { subject, topicDetails, topicName, downloadResource, code, output } = initialData;
        // console.log(code);
        const posts = new Post({
            subject,
            topicDetails,
            topicName,
            downloadResource,
            code,
            output,
            subtopics
        })
        posts.save();
        res.send({
            success: true,
            message: "post created succesfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

//this api used to get the all topic of the subject 
exports.getSubject = async (req, res) => {
    try {
        const parameter = {};
        const subject = req.query.subject;
        // console.log(subject);
        if (subject) {
            parameter.subject = subject;
        }
        const data = await Post.find(parameter);
        const topics = [];
        data.forEach(d => {
            topics.push(d.topicName);
        })
        // console.log(data);
        // console.log(data);
        res.send({
            data: topics,
            success: true,
        })
    } catch (error) {
        res.send(error.message)
    }
}

//this api is used to get the details of the topic 
exports.getTopicDetials = async (req, res) => {
    try {
        const subject = req.query.subject;
        const topic = req.query.topic;

        const data = await Post.find({ subject: subject, topicName: topic });
        const topicDetails = data[0];

        res.send({
            data: topicDetails,
            success: true
        })
    } catch (error) {
        res.send(error.message);
    }
}

exports.getSearch = async (req, res) => {
    try {
        const topic = req.query.topic;
        // console.log(topic);
        const searchResults = searchTopics(topic);
        const topicNamePromise = searchResults.map(async t => {
            const post = await Post.findById(t.ref);
            return {
                subject: post.subject,
                topicName: post.topicName
            };
        })
        const posts = await Promise.all(topicNamePromise);
        // console.log(topicName)
        res.send({
            data: posts,
            success: true,
        })
    } catch (error) {
        res.send(error.message);
    }
}

exports.editPost = async (req, res) => {
    try {
        const {
            topicName,
            topicDetails,
            downloadResource,
            codes,
            output,
            subtopics,
            postId } = req.body;
        // console.log(codes);
        // console.log(subtopics);
        // console.log(postId);
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('post not found');
        }
        if (topicName) {
            post.topicName = topicName;
        }
        if (topicDetails) {
            post.topicDetails = topicDetails;
        }
        if (downloadResource) {
            post.downloadResource = downloadResource;
        }
        if (codes) {
            post.code = codes;
        }
        if (output) {
            post.output = output;
        }
        if (subtopics) {
            post.subtopics = subtopics;
        }
        await post.save();
        res.send("post updated successfully")
    } catch (error) {
        res.send(error.message);
    }
}

exports.deleteSubtopics = async (req, res) => {
    try {
        const { index, postId } = req.body;
        // console.log(index, postId);
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error("post not found");
        }
        const updatedSubtopic = post.subtopics;
        updatedSubtopic.splice(index, 1);
        post.subtopics = updatedSubtopic;
        await post.save();
        res.send({
            success: true,
            data: "subtopic delete successfully"
        });
    } catch (error) {
        res.send({
            success: false,
            data: error.message
        })
    }

}

exports.deletePost = async (req, res) => {
    try {
        // console.log('hi')
        const postId = req.body.postId;
        // console.log(postId);
        const result = await Post.deleteOne({ _id: postId });
        if (result.deletedCount < 0) {
            throw new Error("something went wrong")
        }
        res.send({
            data: "post deleted",
            success: true
        })
    } catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }


}