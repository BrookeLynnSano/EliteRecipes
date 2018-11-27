let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Stormz!',
    database: 'recipe'

});

module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `recipes` ORDER BY name ASC"; // query database to get all the recipes

        // execute query
      //db.connect();
        //db.query('SELECT * from recipes', function(err, rows, fields){
        db.query(query, (err, result) => {
          if (err) {
              //  console.log('Error!!!!!!')
                res.redirect('/');
             }

             //console.log(rows);
             res.render('index.ejs', {
                title: "Welcome to Elite Recipes | View Recipes"
                ,recipes: result

            });
        });
    },
};
