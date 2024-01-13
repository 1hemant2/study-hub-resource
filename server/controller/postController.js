const Post = require('../model/Post');
const { google } = require('googleapis');
const fs = require('fs');

exports.createPost = async (req, res) => {
    try {
        const subject = req.body.subject;
        const topicName = req.body.topicName;
        const topicDetails = req.body.topicDetails;
        const downloadResource = req.body.downloadResource;
        console.log(subject, topicName, topicDetails);
        const posts = new Post({
            subject: subject,
            topicName: topicName,
            topicDetails: topicDetails,
            downloadResource: downloadResource
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

exports.getTopicDetials = async (req, res) => {
    try {
        const subject = req.query.subject;
        const topic = req.query.topic;
        // console.log(topic);
        // console.log(subject);
        const data = await Post.find({ subject: subject, topicName: topic });
        const topicDetails = data[0];
        // console.log(data);
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

