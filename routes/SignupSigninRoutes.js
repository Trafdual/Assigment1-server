
var bodyParser = require("body-parser");
const router = require("express").Router();
const UserModel = require("../models/UsersModels");
router.use(bodyParser.urlencoded({ extended: false }));
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var dir = './uploads';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage });
router.get("/manager", async (req, res) => {
 res.render('manager');
});
router.get("/signup", async (req, res) => {
    res.render("signup");
  });
  router.post("/signup",upload.single('image'), async (req, res) => {
    try {
      const{tenUser,email,password}=req.body
      const confirmpassword=req.body.confirmPassword
      const imageUrl =  req.file;
      const newUser1 = new UserModel({
        tenUser,email,password,imageUrl
      });
      await newUser1.save();
      
      if(password!=confirmpassword){
          res.render('signup',{
              passError: 'Nhập lại mật khẩu sai',
          });
          }else if(!/\S+@\S+\.\S+/.test(email)){
              res.render('signup', {
              emailError: 'Nhập sai định dạng Email'});
          }
          else{
              res.redirect('/login');
          }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  router.get("/login", async (req, res) => {
      res.render("login");
    });
    router.post("/login", async (req, res) => {
      try {
          const user = await UserModel.findOne({ tenUser: req.body.tenUser });
          
          if (!user) {
              return res.render('login',{
                  LoginError:'Sai tài khoản '
              });
          }
        
          if (!user.password) {
              return res.render('login',{
              Error:'Sai mật khẩu'
              });
          }
          if (user && user.password) {
              res.redirect('/manager')
          }
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
    });
module.exports = router;


