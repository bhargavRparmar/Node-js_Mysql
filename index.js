const express = require('express');
const app = express();

require('dotenv').config();

const bodyParser = require('body-parser');
const cookie = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie());

app.use('/', require('./app/routes/route'));
app.use('/', require('./app/routes/categoryRoute'));
app.use('/', require('./app/routes/contactRouter'));
app.use('/', require('./app/routes/testimonialRoute'));
app.use('/', require('./app/routes/portfolioRoute'));

app.use(express.static('app/upload'));

app.listen('3000', () => {
    console.log('server started on port 3000');
});