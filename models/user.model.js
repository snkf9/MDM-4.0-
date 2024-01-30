var {conn, sql} = require('../connect');
module.exports = function(){
    this.getAll = async function(result){
        var pool = await conn;
        var sqlString ="SELECT * FROM userTable ";
        return await pool.request()
        .query(sqlString, function(err, data){
            if(data.recordset.length >0){
                result(null, data.recordset);

            }
            else{
                result(true, null);
                console.log(err);
            }
        });
    };
    

    this.getOne = async function(newData, result){
        var pool =await conn;
        var sqlString = "SELECT * FROM userTable WHERE Id=@id";
        return await pool.request()
        .input('id', sql.Int, newData.Id)
        .query(sqlString, function (err, data){
            if (data.recordset.length >0){
                result(null, data.recordset[0]);
            }
            else{
                result(true, null);
                console.log(err);
            }
        });
    }

    this. create = async function(newData, result){

        var pool = await conn;

        // var Svn_id = newData.svn_id;
        // var Name = newData.name;
        // var dept = newData.dept;
        // var factory = newData.factory;
        // var level_user = newData.level_user;
        // var passw = newData.passw;
        // console.log(newData);
        var sqlString = `
		INSERT INTO userTable 
		(SVN_Id , Name , Dept , Factory , Level_user , Passw) 
		VALUES (@svn_id, @name, @dept, @factory, @level_user, @passw)
		`;
        return await pool.request()
        .input('svn_id', sql.NVarChar , newData.svn_id)
        .input('name', sql.NVarChar , newData.name)
        .input('dept', sql.NVarChar , newData.dept)
        .input('level_user', sql.Int , newData.level_user)
        .input('factory', sql.NVarChar , newData.factory)
        .input('passw', sql.Int , newData.passw)  
        .query(sqlString, function(err, data){
            if(err){
                result(true, newData);
                console.log(newData);
            }
            else{
                result(null, newData)
                console.log(newData);
            }
        });

    }

    this.update = async function(newData, result){
        var pool = await conn;
        var sqlString = "UPDATE userTable SET SVN_Id = @svn_id , Name = @name , Dept = @dept ,Level_user= @level_user, Factory = @factory , Passw = @passw WHERE Id = @id";
        return await pool.request()
        .input('svn_id', sql.NVarChar , newData.svn_id)
        .input('name', sql.NVarChar , newData.name)
        .input('dept', sql.NVarChar , newData.dept)
        .input('level_user', sql.Int , newData.level_user)
        .input('factory', sql.NVarChar , newData.factory)
        .input('passw', sql.Int , newData.passw) 
        .query(sqlString, function(err, data){
            if(err){
                result(true, newData);
                console.log(err);
            }
            else{
                result(null, newData);
            }
        });
    }

    this.delete = async function(newData , result){
        var pool = await conn;
        var sqlString = "DELETE FROM userTable WHERE Id = @id";
        return await pool.request()
        .input('id', sql.Int , newData.Id)
        .query(sqlString, function (err, data){
            if(err){
                result(true, null);
                console.log(err);
            }
            else{
                result(null, data);
            }
        });
    }
}