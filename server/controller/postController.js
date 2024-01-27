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
            message: error
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
        res.send(error)
    }
}

//this api is used to get the details of the topic 
exports.getTopicDetials = async (req, res) => {
    try {
        const subject = req.query.subject;
        const topic = req.query.topic;
        // console.log(topic);
        // console.log(subject);
        const data = await Post.find({ subject: subject, topicName: topic });
        const topicDetails = data[0];
        // console.log(topicDetails);

        res.send({
            data: topicDetails,
            success: true
        })
    } catch (error) {
        res.send(error);
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
        res.send(error);
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
            subtopicName, currentSubtopicName,
            subtopicDetails, currentSubtopicDetails,
            subtopicCode, currentSubtopicCode,
            subtopicOutput, currentSubtopicOutput,
            postId } = req.body;
        // console.log(codes);
        const post = await Post.findById(postId);
        if (!post) {
            return;
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
        if (subtopicName) {
            const subtopicIndex = post.subtopics.findIndex(sub => sub.name === currentSubtopicName);
            post.subtopics[subtopicIndex].name = subtopicName;
        }
        if (subtopicDetails) {
            const subtopicIndex = post.subtopics.findIndex(sub => sub.details === currentSubtopicDetails);
            post.subtopics[subtopicIndex].details = subtopicDetails;
        }
        if (subtopicCode) {
            const subtopicIndex = post.subtopics.findIndex(sub => sub.code === currentSubtopicCode);
            post.subtopics[subtopicIndex].code = subtopicCode;
        }
        if (subtopicOutput) {
            const subtopicIndex = post.subtopics.findIndex(sub => sub.output === currentSubtopicOutput);
            post.subtopics[subtopicIndex].output = subtopicOutput;
        }
        await post.save();
        res.send("post updated successfully")
    } catch (error) {
        res.send(error);
    }
}