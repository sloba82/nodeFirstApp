const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Some message in body' });
   // res.send('Hello World !!!');
 });

module.exports = router;