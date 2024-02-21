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
  var action = req.body.actionpc;
  var id = req.body.id;
  
  // const urlValue= window.location.search;
  // const urlParams = new URLSearchParams(urlValue);
  // const id = urlParams.get('partId');
    

    if(action == 'getAllPart'){
    var pool =await conn;
    var query = "SELECT * FROM ApprearanceCheckpoint ";
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
    
    var query = "SELECT * FROM ApprearanceCheckpoint WHERE Id = " +id;
   
    return await pool.request()
    .query(query, function(err, data){
      
      res.json({data});
  
    });
  }
  if(action == "addPart"){
    var pool = await conn;

    var query =  `
		INSERT INTO ApprearanceCheckpoint
		(Item_No , Check_content ,Specs, Tool , Eng , Sp_Jig , QA , QA_Sample_size, QA_Frequence, IQPC , IQPC_Sample_size, IQPC_Frequence, OQC , OQC_Sample_size, OQC_Frequence) 
		VALUES (@item_no, @check_content, @specs, @tool, @eng5 , @sp_jig, @qa, @qa_size, @qa_frequence, @iqpc, @iqpc_size, @iqpc_frequence, @oqc, @oqc_size, @oqc_frequence )
		`;
    
    return await pool.request()
      .input('item_no', sql.VarChar , req.body.item_no)
      .input('check_content', sql.NVarChar , req.body.check_content)
      .input('specs', sql.NVarChar , req.body.specs)
      .input('tool', sql.NVarChar , req.body.tool)
      .input('eng5', sql.Bit , req.body.eng5)
      .input('sp_jig', sql.NVarChar , req.body.sp_jig)
      .input('qa', sql.Bit , req.body.qa)
      .input('qa_size', sql.Bit , req.body.qa_size)
      .input('qa_frequence', sql.Bit , req.body.qa_frequence)
      .input('oqc', sql.Bit, req.body.oqc)
      .input('oqc_size', sql.Bit , req.body.oqc_size)
      .input('oqc_frequence', sql.Bit , req.body.oqc_frequence)
      .input('iqpc', sql.Bit , req.body.iqpc)
      .input('iqpc_size', sql.Bit , req.body.iqpc_size)
      .input('iqpc_frequence', sql.Bit , req.body.iqpc_frequence)
      .query(query, function(err, data){
        console.log(err);
        res.json({
          message : 'Data Added'
        });
      });

  }
  if(action == "editPart"){
    var pool = await conn;
    var id = req.params.id;
    console.log(id);
    var query = `UPDATE ApprearanceCheckpoint SET Check_content = @checkcontent , Name_part = @name_part , Factory = @factory_p , Dia_no= @dia_no  WHERE Id = ` +id;
    return await pool.request()
      .input('checkcontent', sql.VarChar , req.body.mold_no)
      .input('Specs', sql.VarChar , req.body.name_part)
      .input('tool', sql.VarChar , req.body.factory_p)
      .input('Eng', sql.NVarChar , req.body.part_no)
      .input('Sp_Jig', sql.NVarChar , req.body.dia_no)
        
      .query(query, function(err, data){
        console.log(err);
        res.json({
          message : 'Data Edited'
        });

    });
  }
})