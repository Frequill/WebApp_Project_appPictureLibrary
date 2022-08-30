
  console.log("1Connected!");

var mysql = require('mysql');
console.log("2Connected!");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password123",
  database: "picturelibrary"
});
console.log("3Connected!");

con.connect(function(err) {
  if (err){
    throw err;
    console.log(err + "ERROR WAS FOUND!"); 
  }
  console.log("4Connected!");
});


/* console.log("tor01");

const {
     createPool 
    } = require('mysql');

    const con = createPool({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password123",
        database: "appPictureLibrary",
        connectionLimit: 10
    })

    const result = con.query('SELECT * FROM picturelibrary.image_names;');
    //console.log(result);
    console.log("tor02");
    console.table(result);


    con.query(`SELECT * FROM picturelibrary.image_names`, (err, result, fields) => {
        if (err) {
            return console.log(err);
        }
        return console.log(result);
    })

    /* console.log(pool.query(`SELECT * FROM image_names;`)); */
    
    /*
    var result = pool.query(`SELECT * FROM picturelibrary.image_names;`);
    console.log(result);    
    */
    