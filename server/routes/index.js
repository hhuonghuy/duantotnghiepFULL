var express = require('express');
var router = express.Router();

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/type/:id', function(req, res, next) {
  let id = req.params.id;
  res.render('loai', { id: id });

});
router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  res.render('detail-product', { id: id });

});
module.exports = router;
