const express = require('express');
const layout = require('express-layout');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

//app.get('/', (req, res) => res.send('Hello World!'))


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

db.connect(function(err) {
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
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
app.get('/signup', function(req, res) {
	res.render('signup');
});

//add recipe page
app.get('/add', function(req, res) {
	res.render('add-player');
});

//edit recipe page
app.get('/edit', function(req, res) {
	res.render('edit-player');
});

//dashboard page
app.get('/dashboard', function(req, res) {
	res.render('dashboard');
});
