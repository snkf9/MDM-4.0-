var express = require('express');
var router = express.Router();
var {conn, sql} = require('../connect');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session : req.session });
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


router.post("/login", async function(req, res, next){

  var user = req.body.svnId;

  var user_password = req.body.password;

  if(user && user_password)
  {
    var pool = await conn;
    var query = "SELECT * FROM userTable WHERE SVN_Id = " + user;
      return await pool.request()
      .query(query, function(err, data){
        
                if(data.recordset.length > 0)
        {
          
            for(var count = 0; count < data.recordset.length; count++)
            {
              console.log(data.recordset[count].Passw);
                if(data.recordset[count].Passw == user_password)
                {
                  
                    // req.session.user_id = data.recordset[count].user_id;

                    res.redirect("http://localhost:3000/partData");
                }
                else
                {
                  
                  res.redirect("/");
                  
                }
            }
        }
        else
        {
          
          res.redirect("/");
          
        }
        res.end();

        });
        
        
      }

  
  else
  {
    res.redirect("/");

  }

});

router.get('/logout', function(request, response, next){

  request.session.destroy();

  response.redirect("/");

});


module.exports = router;


