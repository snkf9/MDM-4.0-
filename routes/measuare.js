var express = require('express');
var router = express.Router();
var {conn, sql} = require('../connect');


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
  if(action == 'getAllPart'){
    var pool =await conn;
    var query = "SELECT * FROM Partdata ";
    return await pool.request()
    .query(query, function(err, data){
      res.json({
        data:data
      });
    });
  }
  if(action == 'getOnePart')
  {
    var pool =await conn;
    var id = req.body.id;    
    var query = "SELECT * FROM Partdata WHERE Part_Id = " +id;    
    return await pool.request()
    .query(query, function(err, data){      
      res.redirect('/measuare/measuarePart')               
    });
  }
})

module.exports = router;
