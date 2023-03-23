var express = require('express');
var app = express();
var hbs = require('express-handlebars');
app.listen(8080);
var bodyParser = require("body-parser");
var session = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'zuogbicdic',
    resave: false,
    saveUninitialized: true
}));

app.engine(
    '.hbs',
    hbs.engine({
      extname: ".hbs",
      defaultLayout: false,
      layoutsDir: "views/layouts/"
    })
  );

app.use(express.static('manager.js'))


app.set('view engine', '.hbs');

//Signup
app.get('/signup', function(req, res){
    res.render('signup')
})

app.post('/signup', function(req, res){
    var names = req.body.names;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    var img = req.body.Avatar;

    //middleware
    req.session.user = {email, names, password, img};

    if(password!=confirmPassword){
    res.render('signup',{
        passError: 'Nhập lại mật khẩu sai',
    });
    }else if(!/\S+@\S+\.\S+/.test(email)){
        res.render('signup', {
        emailError: 'Nhập sai định dạng Email'});
    }
    else{
        res.redirect('/login');
        //res.send(names+' '+email+' '+password);
    }
})
//Login
app.get('/login', function(req, res){
    res.render('login')
})
app.post('/login', function(req,res){
    var EmailLogin = req.body.EmailLogin;
    var PassLogin = req.body.PassLogin;
    const user = req.session.user;
    if (!user || user.email !== EmailLogin || user.password !== PassLogin) {
    // Incorrect username or password
        return res.render('login',{
            LoginError:'Sai tài khoản hoặc mật khẩu'
        });
    }else{
        res.redirect('/manager')
    }
})



//manager
app.get('/manager', function(req, res){
    res.render('manager')
})
app.post('/manager', function(req,res){
    res.redirect('/products')
})

//product
app.get('/products', function(req, res){
    res.render('products')
})

app.post('/products', function(req, res){
    res.redirect('products')
})

//user
app.get('/users', function(req, res){
    res.render('users')
})

app.post('/users', function(req, res){
    res.redirect('users')
})
//add
app.get('/add', function(req, res){
    res.render('add')
})

app.post('/add', function(req, res){
    res.redirect('add')
})

