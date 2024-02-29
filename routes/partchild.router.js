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
  
  // var urlValue= window.location.search;
  // var urlParams = new URLSearchParams(urlValue);
  // var id = urlParams.get('partId');
  

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
    
    var query = "SELECT * FROM Partdata WHERE Part_Id = " +id;
   
    return await pool.request()
    .query(query, function(err, data){
      
      res.json({data});
  
    });
  }
  if(action == "editPart"){
    var pool = await conn;
    // var id= req.body.partId;
    console.log(id);
    
    var query = `UPDATE Partdata SET Customer = @customer , Model = @model , Mold_No = @mold_no , Name_part = @namepart , Part_no = @part_no, Dia_no = @diano , Material= @material , Reg = @reg , 
      No_of_cav = @no_of_cav, Special_Cavity_Designation=@special_CD, Specifical_Cav=@specifical_cav, Rev_No=@rev_no, Ilustration=@ilustration, Apperance_Caution=@apperance_caution , Measure_instruction=@measuare_instruction, Drawing_file=@drawing_file, His_file=@his_file, DWGrey = @dwgrey  WHERE Part_Id = ` +id;
    return await pool.request()
      .input('customer', sql.NVarChar , req.body.customer)
      .input('model', sql.VarChar , req.body.model)
      .input('reg', sql.VarChar , req.body.reg)
      .input('dwgrey', sql.NVarChar , req.body.dwgrey)
      .input('material', sql.NVarChar , req.body.material)
      .input('no_of_cav', sql.VarChar , req.body.no_of_cav)
      .input('special_CD', sql.VarChar , req.body.special_CD)
      .input('specifical_cav', sql.NVarChar , req.body.specifical_cav)
      .input('rev_no', sql.VarChar , req.body.rev_no)
      .input('ilustration', sql.VarChar , req.body.ilustation)
      .input('apperance_caution', sql.VarChar , req.body.apperance_caution)
      .input('measuare_instruction', sql.VarChar , req.body.measuare_instruction)
      .input('drawing_file', sql.VarChar , req.body.drawing_file)
      .input('his_file', sql.VarChar , req.body.his_file)
      .input('diano', sql.VarChar , req.body.diano)
      .input('namepart', sql.VarChar , req.body.namepart)
      .input('mold_no', sql.VarChar , req.body.mold_no)
      .input('part_no', sql.VarChar , req.body.part_no)
      .input('factory_p', sql.VarChar , req.body.factory_p)
      .query(query, function(err, data){
        console.log(err);
        res.json({
          message : 'Data Edited'
        });

    });
  }
})