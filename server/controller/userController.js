const { User } = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.Register = async (req, res) => {
    try {
        const { data } = req.body;
        // console.log(req.body.data)
        const { username, email, password } = data;
        console.log(username);
        const checkUserName = await User.findOne({ username: username });
        const checkEmail = await User.findOne({ email: email });
        if (checkUserName) {
            throw new Error("user is already used");
        } else if (checkEmail) {
            throw new Error("email is already in used");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            username,
            email,
            password: hashedPassword
        })
        await user.save();
        res.send({
            success: true,
            message: "user created successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

exports.Login = async (req, res) => {
    try {
        const { data } = req.body;
        const { username, password } = data;
        // console.log(username, password);
        // console.log(username);
        const user = await User.findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        });
        if (!user) {
            throw new Error("user not found");
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) throw new Error("wrong password");
        const token = jwt.sign({ userid: user._id }, process.env.SECRET_TOKEN, { expiresIn: "1d" });
        res.send({
            message: "login successfully",
            data: token,
            success: true
        })
    } catch (error) {
        res.send(error.message);
    }
}

exports.currentUser = async (req, res) => {
    try {
        const userid = req.body.userid;
        // console.log(userid);
        const user = await User.findById(userid);
        res.send({
            data: user
        })
    } catch (error) {
        res.send(error.message);
    }
}