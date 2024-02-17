var express = require('express');
var router = express.Router();
var {conn, sql} = require('../connect');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('home', { title: 'Express' });
// });
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
router.get("/partData/PartChild/PartChild", function(req, res){
  
  res.render("partchild")

});

router.get("/partData/PartChild/*",function(req, res){
  res.render("partchild")
})

router.post("/actionTool", async function(req, res){
  var action = req.body.actionTool;
  if(action == 'getAllTool'){
    var pool =await conn;
    var query = "SELECT * FROM Tool_measuare ";
    return await pool.request()
    .query(query, function(err, data){
      res.json({
        data:data
      });
    });
  }
  if(action == 'getOneTool')
  {
    var pool =await conn;
    var id = req.body.id;
    var query = "SELECT * FROM Tool_measuare WHERE Id = " +id;
    
    return await pool.request()
    .query(query, function(err, data){
      
      res.json({data});
  
    });
  }
  if(action == "addTool"){
    var pool = await conn;
    var query =  `
		INSERT INTO Tool_measuare
		(Name_t , Type_t , InUse , Factory_t , Id_Tool, uwave_r) 
		VALUES (@tool_name, @tool_type, 1 , @factory_t , @u_wave_r, @u_wave_r)
		`;
    return await pool.request()
      .input('tool_name', sql.NVarChar , req.body.tool_name)
      .input('tool_type', sql.NVarChar , req.body.tool_type)
      .input('factory_t', sql.NVarChar , req.body.factory_t)
      .input('u_wave_t', sql.Int , req.body.u_wave_t)
      .input('u_wave_r', sql.Int , req.body.u_wave_r)  
      .query(query, function(err, data){
        console.log(err);
        res.json({
          message : 'Data Added'
        });
      });

  }
  if(action == "editTool"){
    var pool = await conn;
    var id = req.body.id;
    var query = `UPDATE Tool_measuare SET Name_t = @tool_name , Type_t = @tool_type , InUse = 0 , Id_Tool= @u_wave_t, Factory_t = @factory_t , uwave_r = @u_wave_r WHERE Id = ` +id;
    return await pool.request()
      .input('tool_name', sql.NVarChar , req.body.tool_name)
      .input('tool_type', sql.NVarChar , req.body.tool_type)
      .input('u_wave_t', sql.Int , req.body.u_wave_t)
      .input('factory_t', sql.NVarChar , req.body.factory_t)
      .input('u_wave_r', sql.Int , req.body.u_wave_r)
      .query(query, function(err, data){
        console.log(err);
        res.json({
          message : 'Data Edited'
        });

    });
  }
  if(action == "deleteTool"){
    var pool = await conn;
    var id = req.body.id;
    var query = "DELETE FROM Tool_measuare WHERE Id = " +id;
    return await pool.request()
    .query(query, function(err, data){
      res.json({
				message : 'Data Deleted'
			});
    })
  }
})

module.exports = router;

