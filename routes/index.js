var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
router.get("/tool", function(req, res){
  res.render("tool")
});

router.get("/manager", function(req, res){
  res.render("manager")
});

router.get("/measuare", function(req, res){
  res.render("measuare")
});

router.get("/measuare/measuarePart", function(req, res){
  res.render("measuarePart")
});

router.get("/checkSheet", function(req, res){
  res.render("checkSheet")
});

router.get("/partData", function(req, res){
  res.render("partData")
});

router.get("/partData/PartChild",function(req, res){
  res.render("partchild")
})
router.get("/partData/acheckpoint",function(req, res){
  res.render("aCheckPoint")
})
router.get("/partData/bcheckpoint",function(req, res){
res.render("bCheckPoint")
})

module.exports = router;


