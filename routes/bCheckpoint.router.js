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
router.get("/partData/acheckpoint",function(req, res){
    res.render("aCheckPoint")
  })
router.get("/partData/bcheckpoint",function(req, res){
res.render("bCheckPoint")
})
module.exports = router;

router.post("/actionac", async function(req, res){
  var action = req.body.actionac;
  var id = req.body.id;
  
  // const urlValue= window.location.search;
  // const urlParams = new URLSearchParams(urlValue);
  // const id = urlParams.get('partId');
    

    if(action == 'getAllPart'){
    var pool =await conn;
    var query = "SELECT * FROM Dim_checkpoint WHERE Partid = " + id;
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
    
    var query = "SELECT * FROM Dim_checkpoint WHERE Partid = " +id;
   
    return await pool.request()
    .query(query, function(err, data){
      
      res.json({data});
  
    });
  }
  if(action == "addPart"){
    var pool = await conn;
    var id = req.body.id;
    var query =  `
		INSERT INTO Dim_checkpoint
		(Partid , Item_No , DimTool , Geometric_Tolerance ,Specs, Tolerance , Lower_limit, Upper_limit , FA_Accepted_min , FA_Accepted_max , Position , Eng , Supporting_Jig, QA , QA_SampleSize, QA_Frequence, IQPC , IQPC_Sample_size, IQPC_Frequence, OQC , OQC_Sample_size, OQC_Frequence) 
		VALUES (@partid, @item_no, @dimtool , @geometric_tolerance, @specs, @tolerance, @lowerlimit ,@upperlimit , @fa_accept_min, @fa_accept_max ,@position ,  @eng5 , @sp_jig, @qa, @qa_size, @qa_frequence, @iqpc, @iqpc_size, @iqpc_frequence, @oqc, @oqc_size, @oqc_frequence )
		`;
    
    return await pool.request()
      .input('item_no', sql.Int , req.body.item_no)
      .input('geometric_tolerance', sql.NVarChar , req.body.geometric_tolerance)
      .input('specs', sql.Float , req.body.specs)
      .input('tolerance', sql.Float , req.body.tolerance)
      .input('lowerlimit', sql.Float , req.body.lowerlimit)
      .input('upperlimit', sql.Float , req.body.upperlimit)
      .input('fa_accept_min', sql.Float , req.body.fa_accept_min)
      .input('fa_accept_max', sql.Float , req.body.fa_accept_max)
      .input('position', sql.NVarChar , req.body.position)
      .input('dimtool', sql.VarChar , req.body.dimtool)
      .input('eng5', sql.Bit , req.body.eng5)
      .input('sp_jig', sql.VarChar , req.body.sp_jig)
      .input('qa', sql.Bit , req.body.qa)
      .input('qa_size', sql.Float , req.body.qa_size)
      .input('qa_frequence', sql.Float , req.body.qa_frequence)
      .input('oqc', sql.Bit, req.body.oqc)
      .input('oqc_size', sql.Real , req.body.oqc_size)
      .input('oqc_frequence', sql.Float , req.body.oqc_frequence)
      .input('iqpc', sql.Bit , req.body.iqpc)
      .input('iqpc_size', sql.Float , req.body.iqpc_size)
      .input('iqpc_frequence', sql.Float , req.body.iqpc_frequence)
      .input('partid', sql.Int , req.body.partid)
      .query(query, function(err, data){
        console.log(err);
        res.json({
          message : 'Data Added'
        });
      });

  }
  if(action == "editPart"){
    var pool = await conn;
    
    console.log(id);
    var query = `UPDATE Dim_checkpoint SET Item_No=@item_no, Geometric_Tolerance= @geometric_tolerance, Specs=@specs, Tolerance= @tolerance, Lower_limit= @lowerlimit, Upper_limit = @upperlimit
                  FA_Accepted_min = @fa_accepted_min , Position = @position , DimTool= @dimtool, Supporting_Jig = @sp_jig , ENG= @eng5, QA= @qa, QA_SampleSize= @qa_size , QA_Frequence = @qa_frequence, IQPC= @iqpc, IQPC_sample_size = @iqpc_size , IQPC_Frequence = @iqpc_frequence , OQC = @oqc , OQC_sample_size = @oqc_size , OQC_Frequence = oqc_frequence WHERE Id = ` +id;
    return await pool.request()
      .input('item_no', sql.Int , req.body.item_no)
      .input('geometric_tolerance', sql.NVarChar , req.body.geometric_tolerance)
      .input('specs', sql.Float , req.body.specs)
      .input('tolerance', sql.Float , req.body.tolerance)
      .input('lowerlimit', sql.Float , req.body.lowerlimit)
      .input('upperlimit', sql.Float , req.body.upperlimit)
      .input('fa_accept_min', sql.Float , req.body.fa_accept_min)
      .input('fa_accept_max', sql.Float , req.body.fa_accept_max)
      .input('position', sql.NVarChar , req.body.position)
      .input('dimtool', sql.VarChar , req.body.dimtool)
      .input('eng5', sql.Bit , req.body.eng5)
      .input('sp_jig', sql.VarChar , req.body.sp_jig)
      .input('qa', sql.Bit , req.body.qa)
      .input('qa_size', sql.Float , req.body.qa_size)
      .input('qa_frequence', sql.Float , req.body.qa_frequence)
      .input('oqc', sql.Bit, req.body.oqc)
      .input('oqc_size', sql.Real , req.body.oqc_size)
      .input('oqc_frequence', sql.Float , req.body.oqc_frequence)
      .input('iqpc', sql.Bit , req.body.iqpc)
      .input('iqpc_size', sql.Float , req.body.iqpc_size)
      .input('iqpc_frequence', sql.Float , req.body.iqpc_frequence)
      .query(query, function(err, data){
        console.log(err);
        res.json({
          message : 'Data Edited'
        });

    });
  }

  if(action == "deletePart"){
    var pool = await conn;
    
    var query = "DELETE FROM Dim_checkpoint WHERE Id = " +id;
    return await pool.request()
    .query(query, function(err, data){
      res.json({
				message : 'Data Deleted'
			});
    })
  }
})