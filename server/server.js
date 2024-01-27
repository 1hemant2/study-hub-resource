const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const cors = require('cors');
app.use(cors({ origin: '*' }))
const port = process.env.PORT || 8080;

const database = require('../server/config/Database');
const postRoute = require('../server/routes/PostRoute');
app.use('/api/Posts', postRoute);



const server = app.listen(port, () => {
    console.log(`server has been started on port ${port}`)
})

