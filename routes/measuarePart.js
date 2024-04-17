var express = require('express');
var router = express.Router();
var {conn, sql} = require('../connect');
var {port, parser} = require('../serialport');



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

router.get("/checkSheet", function(req, res){
  res.render("checkSheet")
});

router.get("/partData", function(req, res){
  res.render("partData")
});

router.get("/partData/acheckpoint",function(req, res){
  res.render("aCheckPoint")
})
router.get("/partData/bcheckpoint",function(req, res){
res.render("bCheckPoint")
})
// router.get("/PartChild", function(){
  
//   res.redirect("http://localhost:3000/PartChild")

// });
router.get("/partData/PartChild", function(req, res){
  
  res.render("partchild");

});

router.get("/measuare/measuarePart", function(req, res){
  res.render("measuarePart")
});

router.post("/actionPart", async function(req, res){
  var action = req.body.actionPart;
  var id = req.body.partId;
  var qa = req.body.qa;
  var iqpc= req.body.iqpc;
  var oqc = req.body.oqc;
//   var urlValue= window.location.search;
//   var urlParams = new URLSearchParams(urlValue);
//   var id = urlParams.get('partId');
  if(action == 'getAllPart'){
    var pool =await conn;
    
    var query = "SELECT * FROM ApprearanceCheckpoint WHERE Partid = " +id;
    
    return await pool.request()
    .query(query, function(err, data){
      res.json({
        data:data
      });
    });
    
    
  }
  if(action == 'getAllPartd'){
    var pool =await conn;
    var query = "SELECT * FROM Dim_checkpoint WHERE Partid = " + id ;
    return await pool.request()
    .query(query, function(err, data){
      res.json({
        data:data
      });
    });
  }
  if(action == 'getAllParte'){
    var pool =await conn;
    
    var query = "SELECT * FROM ApprearanceCheckpoint WHERE Partid = " +id;
    var queryQA = " AND QA = "+qa;
    var queryIQPC = " AND IQPC = "+iqpc;
    var queryOQC = " AND OQC = "+ oqc;
    
    if (qa == true){query +=queryQA};
    if (iqpc == true){query +=queryIQPC};
    if(oqc == true){query += queryOQC};
    console.log(query);
    
    return await pool.request()
    .query(query, function(err, data){
      res.json({
        data:data
      });
    });
    
    
  }
  if(action == 'getAllPartf'){
    var pool =await conn;
    var query = "SELECT * FROM Dim_checkpoint WHERE Partid = " + id ;
    var queryQA = " AND QA = "+qa;
    var queryIQPC = " AND IQPC = "+iqpc;
    var queryOQC = " AND OQC = "+ oqc;
    if (qa == true){query +=queryQA};
    if (iqpc == true){query +=queryIQPC};
    if(oqc == true){query += queryOQC};
    return await pool.request()
    .query(query, function(err, data){
      res.json({
        data:data
      });
    });
  }
})






module.exports = router;
