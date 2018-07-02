var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/scrape', indexController.scrape);

module.exports = router;
