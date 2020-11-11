require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const line = require('@line/bot-sdk');
const cors = require('cors');

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('/api/v1/unlink-richmenu', (req, res) => {
    client.unlinkRichMenuFromUser("U1b04d75f947b2b1d9119e19e579d4b4d");
    res.json({
        data: req.body.uid
    });
});

app.post('/api/v1/change-richmenu', (req, res) => {
    // save data in db
    const { StudentID, ThaiNationalid, email, userId } = req.body;
    client.linkRichMenuToUser(req.body.uid, "richmenu-da84fc185316adafa0b7876e4fdb1b2c");
    res.json({
        data: req.body.uid
    });
})

app.listen(3001, () => {
    console.log("Ready on port 3001");
});