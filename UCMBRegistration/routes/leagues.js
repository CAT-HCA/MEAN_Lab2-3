var express = require("express");
var router = express.Router();
var fs = require('fs');

// http://localhost:3000/leagues
router.get('/', function(req, res, next) {
    res.render('leagues', { title: 'Leagues' });
});

// GET http://localhost:3000/leagues/data
router.get('/data', function(req, res, next) {
    try {
        res.end(fs.readFileSync('./data/leagues.json'));
    } catch (err) {
        res.end('[]');
    }
});

module.exports = router;