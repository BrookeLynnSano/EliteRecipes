const fs = require('fs');

module.exports = {
    addRecipePage: (req, res) => {
        res.render('add-player.ejs', {
            title: "Welcome to Elite Recipes | Add a new recipe"
            ,message: ''
        });

    },
    addRecipe: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }
console.log("in the addRecipe part");

  /*   const response = {
          id: req.body.id,
          name: req.body.name,
          ingredient: req.body.ingredients,
          instruct: req.body.instructions,
        }; */
      
      //  let fileExtension = uploadedFile.mimetype.split('/')[1];
        //image_name = username + '.' + fileExtension;

        let nameQuery = "SELECT * FROM `recipes` WHERE name = '" + name + "'";

        db.query(nameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log("after the nameQUery");
            if (result.length > 0) {
                message = 'Recipe already exists';
                  console.log("recipe already exists should be on the screen");
                res.render('add-player.ejs', {
                    message,
                    title: "Welcome to Elite Recipes | Add a new recipe"
                });
              }
            else {
                // check the filetype before uploading it
              //  if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                  // uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                      //  if (err) {
                      //      return res.status(500).send(err);
                        //}
                        // send the player's details to the database
                          console.log("about to insert into the database");
                        let query = "INSERT INTO `recipes` (id, name, ingredients, instructions) VALUES ('" + id + "', '" + name + "', '" + ingredients + "', '" + instructions + "')";
                                db.query(query, (err, result) => {
                                    if (err) {
                                       return res.status(500).send(err);
                                  }
                                  res.redirect('/');
                            });
                    /*    con.connect(function(err) {
                        if (err) throw err;
                        console.log("Connected!");
                        var sql = "INSERT INTO recipes (Name, Value.title, Value.ingredients, Value.instructions) VALUES ('" +
                            id + "', '" + name + "', '" + ingredients + "', '" + instruct + "')";

                        //(Name, , address, email, skill) VALUES ('001', 'Brooke Lynn', 'Highway 37', 'bls@gmail.com', 'beginner')";
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("1 record inserted");
                           });
                        });

*/

                       // let query = "INSERT INTO `recipes` (Name, Value.title, Value.ingredients, Value.instructions) VALUES ('" +
                         //   Name + "', '" + Value.title + "', '" + Value.ingredients + "', '" + Value.instructions + "')";

                   //});
                 }  /*else {
                    message = "did not enter into database.";
                    res.render('add-player.ejs', {
                        message,
                        title: "Welcome to Elite Recipes | Add a new recipe"
                    }); */
              //  }
            //}
        });
    },

    editRecipePage: (req, res) => {
        let recId = req.params.id;
        let query = "SELECT * FROM `recipes` WHERE Name = '" + recId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: "Edit  Recipe"
                ,recipes: result[0]
                ,message: ''
            });
        });
    },

    editRecipe: (req, res) => {
        let recId = req.params.id;
        let title = req.body.title;
        let ingredients = req.body.ingredients;
        let instructions = req.body.instructions;

        let query = "UPDATE `recipes` SET `title` = '" + title + "', `Value.ingredients` = '" + ingredients + "', `Value.instructions` = '" + instructions + "',  WHERE `recipes`.`Name` = '" + recId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },

    deleteRecipe: (req, res) => {
        let recId = req.params.id;
        //let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
        let deleteRecipeQuery = 'DELETE FROM recipes WHERE Name = "' + recID + '"';

    /*  db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        }); */
    }
};
