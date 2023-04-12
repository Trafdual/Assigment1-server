var bodyParser = require("body-parser");
const SanPhamModel = require("../models/SanPhamModels");
const router = require("express").Router();

router.get("/products", async (req, res) => {
  const data = await SanPhamModel.find().lean();

  res.render("products", { data });
});
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/add", async (req, res) => {
  res.render("add");
});
router.post("/add", async (req, res) => {
  try {
    const tenSP = req.body.tenSP;
    const giaSP = req.body.giaSP;
    const mausac = req.body.mausac;
    const loaiSP = req.body.loaiSP;
    const tenKH = req.body.tenKH;
    const newSanPham = new SanPhamModel({
      tenSP,
      giaSP,
      mausac,
      loaiSP,
      tenKH
    });
    await newSanPham.save();
    res.redirect("products");
    // return res.status(200).json(newSanPham);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  SanPhamModel.findById(id)
    .then(data => {
      res.render("editSP", { data });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Internal server error");
    });
});
router.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  SanPhamModel.findByIdAndUpdate(id, newData)
    .then(() => {
        
      res.redirect("/sanpham/products");
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Internal server error");
    });
});

router.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await SanPhamModel.findByIdAndDelete(id);
    res.redirect("/sanpham/products");
  });
module.exports = router;
