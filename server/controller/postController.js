const Post = require('../model/Post');

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
        const topics = topic.toLowerCase();
        const data = await Post.find({ topicName: topics });
        // console.log(data);
        res.send({
            data: data,
            success: true,
        })
    } catch (error) {
        res.send(error);
    }
}

