let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Stormz!',
    database: 'recipe'

});

module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `recipes` ORDER BY Value.title ASC"; // query database to get all the recipes

        // execute query
        db.query(query, (err, result) => {
          if (err) {
                res.redirect('/');
             }

y             res.render('index.ejs', {
                title: "Welcome to Elite Recipes | View Recipes"
                ,recipes: result
            });
        });
    },
};
