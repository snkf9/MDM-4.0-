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


router.get("/partData/PartChild",function(req, res){
  res.render("partchild")
})
module.exports = router;

router.post("/actionpc", async function(req, res){
  var action = req.body.actionpc;
  var id = req.body.id;
  
  // const urlValue= window.location.search;
  // const urlParams = new URLSearchParams(urlValue);
  // const id = urlParams.get('partId');
    

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
    
    var query = "SELECT * FROM Partdata WHERE Id = " +id;
   
    return await pool.request()
    .query(query, function(err, data){
      
      res.json({data});
  
    });
  }
  if(action == "editPart"){
    var pool = await conn;
    var id = req.params.id;
    console.log(id);
    var query = `UPDATE Partdata SET Mold_No = @mold_no , Name_part = @name_part , Factory = @factory_p , Dia_no= @dia_no  WHERE Id = ` +id;
    return await pool.request()
      .input('mold_no', sql.VarChar , req.body.mold_no)
      .input('name_part', sql.VarChar , req.body.name_part)
      .input('factory_p', sql.VarChar , req.body.factory_p)
      .input('part_no', sql.NVarChar , req.body.part_no)
      .input('dia_no', sql.NVarChar , req.body.dia_no)
        
      .query(query, function(err, data){
        console.log(err);
        res.json({
          message : 'Data Edited'
        });

    });
  }
})