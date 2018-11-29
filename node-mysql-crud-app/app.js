const express = require('express');
const app = express();
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const path = require('path');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // parse form data client


const {getHomePage} = require('./routes/index');
const {addRecipePage, addRecipe, deleteRecipe, editRecipe, editRecipePage} = require('./routes/player');

const port = 3000;


//connecting to the database
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Stormz!',
    database: 'recipe'

});

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('connected to the MySQL server.');
});

global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine

app.use(fileUpload()); // configure fileupload
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// routes for the app
app.get('/', getHomePage);
app.get('/add', addRecipePage);
app.get('/edit/:id', editRecipePage);
app.get('/delete/:id', deleteRecipe);
app.post('/add', addRecipe);
app.post('/edit/:id', editRecipe);

//set the app to listen on the port
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//ROUTES
//sign up page
app.get('/signup', function (req, res) {
    res.render('signup');
});

//add recipe page
app.get('/add', function (req, res) {
    res.render('add-player');
});

//edit recipe page
app.get('/edit', function (req, res) {
    res.render('edit-player');
});

//dashboard page
app.get('/dashboard', function (req, res) {
    res.render('dashboard');
});

//recipe page
app.get('/recipe', function (req, res) {
    res.render('recipe');
})


//DATABASE
//Search item and render results page
app.get('/result', (req, res) => {
    let search = req.query.search;

    let input = [search]

    console.log(search);

    let query = "SELECT * FROM recipes WHERE name LIKE " + db.escape('%'+search+'%');

    db.query(query, input, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        var recipes = [];
        for (var i = 0;i < result.length; i++) {
            recipes.push({id: result[i].id, name: result[i].name, ingredients: result[i].ingrediants, instructions: result[i].instructions});
        }
        res.render('result', {
            recipes: recipes
        });

    });
})

//add recipe to database
app.get('/testdb', (req, res) => {
    let id = req.query.id;
    let name = req.query.name;
    let ingredients = req.query.ingredients;
    let instructions = req.query.instructions;

    let input = [id, name, ingredients, instructions]

    console.log(id + ' ' + name + ' ' + ingredients);

    let query = "INSERT INTO recipes (id, name, ingrediants, instructions) VALUES (?, ?, ?, ?)";
    db.query(query, input, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
})

//add user to the DATABASE
app.get('/testsignup', (req, res) => {
    let firstname = req.query.firstname;
    let lastname = req.query.lastname;
    let email = req.query.email;
    let skill = req.query.skill;
    let username = req.query.username;
    let password = req.query.password;

    let input = [firstname, lastname, email, skill, username, password]

    console.log(firstname + ' ' + lastname);

    let query = "INSERT INTO users (fname, lname, email, skill, username, password) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, input, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
		var user = {firstname: firstname, lastname: lastname, email: email, skill: skill, username: username, password: password};

        var recipes =[];

        res.render('dashboard', {
            user: user,
            recipes: recipes
        });
    });
})

//user authentication
app.get('/login', (req, res) => {
    let email = req.query.email;

    let input = [email]

    let query1 = "SELECT * FROM users WHERE email=" + db.escape(email);

    db.query(query1, input, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        var user = [];
        for (var i = 0;i < result.length; i++) {
            user.push({firstname: result[i].fname, lastname: result[i].lname, email: result[i].email, skill: result[i].skill, username: result[i].username, password: result[i].password});
        }

        //var recipes = [];
        //for (var i = 0;i < result.length; i++) {
        //    recipes.push({id: result[i].id, name: result[i].name, ingredients: result[i].ingrediants, instructions: result[i].instructions});
        //}

        res.render('dashboard', {
            users: user
            //recipes: recipes
        });
    });
})


//add recipe to user's cookbook
app.get('/star', (req, res) => {
    let id = req.query.id;

    let input = [id]

    console.log(id);

    let query = "INSERT INTO cookbook (id) VALUES (?)";

    db.query(query, input, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.redirect('/dashboard');
    });
})
