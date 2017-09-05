var express = require('express');
var router = express.Router();
id="406474632:AAHKPJflVF8t6pimBiuzJeu9gLX9dH3kXc0";
/* GET users listing. */
router.get('/', function(req, res, next) {
  request('http://api.telegram.org/bot'+id, function (error, response, body) {
    console.body(body);
    res.render('index',{body});
    //cosole.body(response);
});
});
module.exports = router;
