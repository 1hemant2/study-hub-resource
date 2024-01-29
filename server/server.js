const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const cors = require('cors');
app.use(cors({ origin: '*' }))
const port = process.env.PORT || 8080;

const database = require('../server/config/Database');
const postRoute = require('../server/routes/PostRoute');
const userRoute = require('../server/routes/UserRoute');
app.use('/api/Posts', postRoute);
app.use('/api/Users', userRoute);


const server = app.listen(port, () => {
    console.log(`server has been started on port ${port}`)
})

