//dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var passport = require('passport');
var session = require('express-session');

//controllers
var homeController = require('./controllers/home');
var authenticationController = require('./controllers/authentication');
var userController = require('./controllers/user');
var borrowerController = require('./controllers/borrower');
var inventoryController = require('./controllers/inventory');
var lendController = require('./controllers/lend');
var passportConfig = require('./config/passport');

var s3 = new aws.S3({
    secretAccessKey: process.env.AWS_SECRET,
    accessKeyId: process.env.AWS_KEY, 
});

var upload = multer({
    storage: multerS3({
        s3:s3,
        bucket: 'usdan-inventory-images',
        acl: 'public-read',
        region: 'us-west-2',
        metadata: function (req, file, cb) {
            cb(null, {originalName: file.originalname}); //use Date.now() for unique file keys
        },
        key: function(req, file, cb) {
            var extension = file.originalname.split('.');
            cb(null, Date.now().toString() + "." + extension[1]);
        }
    })
});

//models
var models = require('./models');

var app = express();

passport.use(passportConfig.OAuth2Strategy);


app.engine('.html', exphbs({extname: '.html', defaultLayout: 'main'}));
app.set('view engine', '.html');
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'fnaslknkjkewfnkwenknoifjgjejniewfifhiwn'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use((req,res,next)=>{
    if (req.path !== '/login' && req.path !== '/logout' && !req.path.match(/^\/auth/)){
        req.session.returnTo = req.path;
    } 
    next();
});

app.get('/', homeController.handler);

app.get('/login', authenticationController.handler);
app.post('/login', authenticationController.postLogin);
app.get('/logout', authenticationController.logout);

app.get('/auth/google', passport.authenticate('google', {scope:['email', 'profile']}));
app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), (req, res)=>{
    var returnTo = req.session.returnTo;
    req.session.returnTo = null;
    res.redirect(returnTo || '/');
});

app.get('/inventories', authenticationController.isAuthenticated, inventoryController.index);

app.get('/users', authenticationController.isAuthenticated, userController.index);
app.post('/users', authenticationController.isAuthenticated, userController.postUser);

app.get('/borrowers', authenticationController.isAuthenticated, borrowerController.index);


app.get('/lends', authenticationController.isAuthenticated, lendController.index);
app.post('/lends', authenticationController.isAuthenticated, lendController.postLend);

app.get('/api/borrowers', authenticationController.isAuthenticated, borrowerController.api.get);
app.post('/api/borrowers', authenticationController.isAuthenticated, bodyParser.json(), borrowerController.api.create);
app.put('/api/borrowers/:id', authenticationController.isAuthenticated, bodyParser.json(), borrowerController.api.update);
app.delete('/api/borrowers/:id', authenticationController.isAuthenticated, borrowerController.api.delete);

app.get('/api/inventories', authenticationController.isAuthenticated, inventoryController.api.get);
app.post('/api/inventories', authenticationController.isAuthenticated, upload.single('game_image'), inventoryController.api.create);
app.put('/api/inventories/:id', authenticationController.isAuthenticated, upload.single('game_image'), inventoryController.api.update);
app.delete('/api/inventories/:id', authenticationController.isAuthenticated, inventoryController.api.delete);

models.sequelize.sync().then(function(){
   app.listen(process.env.PORT || 8080); 
});
