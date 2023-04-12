
var bodyParser = require("body-parser");
const UserModel = require("../models/UsersModels");
const router = require("express").Router();
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

router.use(bodyParser.urlencoded({ extended: false }));
router.get("/users", async (req, res) => {
  const data1 = await UserModel.find().lean();

  res.render("users", { data1 });
});

router.get("/addUser", async (req, res) => {
  res.render("addUsers");
});
router.post("/addUser",upload.single('image') ,async (req, res) => {
  try {
    const{tenUser,email,password}=req.body
    const imageUrl =  req.file;
    const newUser = new UserModel({
      tenUser,email,password,imageUrl
    });
    await newUser.save();
    res.redirect("users");
    // return res.status(200).json(newSanPham);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/editUser/:id", async (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)
    .then(data => {
      res.render("editUser", { data });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Internal server error");
    });
});
router.post("/editUser/:id", async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
 UserModel.findByIdAndUpdate(id, newData)
    .then(() => {
        
      res.redirect("/User/users");
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Internal server error");
    });
});

router.post("/deleteUser/:id", async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndDelete(id);
    res.redirect("/User/users");
  });
module.exports = router;


