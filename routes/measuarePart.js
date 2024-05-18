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


// tool
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
});



router.post("/actionPart", async function(req, res){
  var action_saved = req.body.savedcheckpoint;
  var action_save = req. body.savedata;
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
  if(action =='getOnePart'){
    var pool = await conn;
    var query = "SELECT * FROM Partdata WHERE Part_Id = "+id;
   
    return await pool.request()
    .query(query, function(err, data){
      res.json({data})
    })
    // .query(query1, function(err, data){
    //   res.json({data})
    // } )
  }

  if(action == 'getBatch'){
    var pool = await conn;
    var id = req.body.partId;
    
    

    var query = `SELECT * FROM checksheet.batchData WHERE INJ_Date = @inj_date AND partId = `+ id
    
    return await pool.request()
    .input('inj_date', sql.NVarChar , req.body.inj_date)
    .query(query, function(err, data){
      console.log(err);
      res.json({data})
    })
  }

  if(action == 'checkBatch'){
    var pool = await conn;
    var id = req.body.partId;

    var query = `SELECT * FROM checksheet.batchData WHERE INJ_Date = @inj_date AND partId = `+id+` AND batch = @batch`
    return await pool.request()
    .input('inj_date', sql.NVarChar , req.body.inj_date)
    .query(query, function(){

    })
  }

  if(action=='editBatch'){
    var pool= await conn;
    var id = req.body.partId;
    var qty_cav = req.body.no_of_cav;
    var qty_a_item = req.body.qty_a_item;
    var data_a = req.body;    
    var qty_d_item = req.body.qty_d_item;
    var batch = req.body.batch;
    var query =``;


  }

  if(action=='showBatch'){
    var pool= await conn;
    var id = req.body.partId;
    var qty_cav = req.body.no_of_cav;
    var qty_a_item = req.body.qty_a_item;
    var data_a = req.body;    
    var qty_d_item = req.body.qty_d_item;
    var batch = req.body.batch;
    var query =`SELECT * FROM checksheet.batchData WHERE partId = `+id+` AND batch = `+batch+` AND INJ_Date = @inj_date
                `;

    return await pool.request()
    .input('inj_date', sql.NVarChar , req.body.inj_date)
    .query(query, function(err, data){
      console.log(err);
      res.json({data});
    })
  }

  if(action == 'showADataBatch'){
    var pool= await conn;
    var id = req.body.partId;
    var qty_cav = req.body.no_of_cav;
    var qty_a_item = req.body.qty_a_item;
    var data_a = req.body;    
    var qty_d_item = req.body.qty_d_item;
    var batch = req.body.batch;
    var query =`SELECT * FROM checksheet.aCheckPointData WHERE partId = `+id+` AND batch = `+batch+` AND injDate = @inj_date `
    return await pool.request()
    .input('inj_date', sql.NVarChar , req.body.inj_date)
    .query(query, function(err, data){
      console.log(err);
      res.json({data});
    })
  }

  if(action == 'showDDataBatch'){
    var pool= await conn;
    var id = req.body.partId;
    var qty_cav = req.body.no_of_cav;
    var qty_a_item = req.body.qty_a_item;
    var data_a = req.body;    
    var qty_d_item = req.body.qty_d_item;
    var batch = req.body.batch;
    var query =`SELECT * FROM checksheet.dCheckPointData WHERE partId = `+id+` AND batch = `+batch+` AND injDate = @inj_date `
    return await pool.request()
    .input('inj_date', sql.NVarChar , req.body.inj_date)
    .query(query, function(err, data){
      console.log(err);
      res.json({data});
    })
  }

  if(action == 'saveACheckPoint'){ 
    var pool = await conn;
    var id = req.body.partId;
    var qty_cav = req.body.no_of_cav;
    var qty_a_item = req.body.qty_a_item;
    var data_a = req.body;    
    var qty_d_item = req.body.qty_d_item;
    var batch = req.body.batch;
    var date = req.body.injDate;
    var qa = req.body.qa_1;
    var iqpc = req.body.iqpc_1;
    var oqc = req.body.oqc_1;


    var query = ``;

    for(var a = 0 ; a<qty_a_item; a++){
      for(var b = 1; b<= qty_cav; b++){
        var c= `a`+b+a;
        var d= data_a[c];
        var y;
        if(d==true){
          y= 1;
        }
        if(d== false){
          y=0;
        }
        
        query +=`INSERT INTO checksheet.aCheckPointData (batch, partId , Item_No , cav , injDate , check_OK_NG)
                  VALUES (`+batch+` , `+id+` , `+a+` , `+b+` , @inj_date  , `+ d +`)

        `
      }
    }

    var query1 = ``;
    for(var h = 0 ; h<qty_d_item; h++){
      for(var e=1; e<= qty_cav; e++){
        var f=`d`+e+h;
        var r=data_a[f];
        if (r==''){r=0};
        
        query1 +=`INSERT INTO checksheet.dCheckPointData (batch , partId , Iteam_No , cav , measuareResult , injDate)        
        VALUES (`+batch+` , `+id+ ` , `+ h + ` , ` + e + ` , `+ r + ` ,  @inj_date)
        `
      }
    }
    var query3 = `INSERT INTO checksheet.batchData 
                  (batch, INJ_Date , partId, MC, Shift_prod , Temp , Humidity , Note , QA , OQC , IQPC)
                  VALUES (`+batch+` , @inj_date , `+id+` , @mc , @shift , @temp , @humidity , @note , `+qa+` , `+iqpc+ ` , `+oqc+`)
    `;
    
    var query2= query1+query +query3;
    console.log(query2);
    return await pool.request()
      .input('inj_date', sql.NVarChar , req.body.injDate)
      .input('mc', sql.Int , req.body.mc)
      .input('shift', sql.VarChar , req.body.shift)
      .input('temp', sql.Float , req.body.temp)
      .input('humidity', sql.Float , req.body.humidity)
      .input('note', sql.Bit , req.body.note)
      // .input('qa', sql.Bit , req.body.qa_1)
      // .input('oqc', sql.Bit , req.body.oqc_1)
      // .input('iqpc', sql.Bit , req.body.iqpc_1)
      .query(query2, function(err, data){
        console.log(err);
        res.json({
          message : 'Data Added'
        });
       
      });
  }

  
})


module.exports = router;
