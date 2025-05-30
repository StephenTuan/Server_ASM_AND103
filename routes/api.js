var express = require('express');
var router = express.Router();

const modelFruist = require('../models/fruist')
const modelCate = require('../models/category')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', async(req, res)=> {
  try {
    const data = await modelFruist.find({}).populate('id_category');
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to fetch fruits", details: error.message });
  }
});

// add fruist
router.post('/add_fruist', async(req, res)=>{
  try {
    // Kiểm tra category có tồn tại
    const category = await modelCate.findById(req.body.id_category);
    if (!category) {
      return res.status(400).send({ error: "Category not found" });
    }
    const model = new modelFruist(req.body);
    const data = await model.save();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to add fruit", details: error.message });
  }
});

router.put('/update_fruist/:id', async (req, res) => {
  try {
    const data = await modelFruist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).send({ error: "Fruist not found" });
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to update fruist", details: error.message });
  }
});

router.delete('/delete_fruist/:id', async (req, res) => {
  try {
    const data = await modelFruist.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send({ error: "Fruist not found" });
    }
    res.send({ message: "Fruist deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to delete fruist", details: error.message });
  }
});

// get product detail by id
router.get('/detail_fruist/:id', async(req, res) => {
  try {
    const data = await modelFruist.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to fetch product details", details: error.message });
  }
});

router.get('/list_cate', async(req, res)=> {
   const data = await modelCate.find({});
  try {
    res.send(data);
  } catch (error) {
    console.log(error)
  }
});

router.post('/add_cate', async(req, res)=>{
  try {
    const model = new modelCate(req.body);
    const data = await model.save();
    res.send(data);
  } catch (error) {
    console.log(error);
    // Send error response to client
    res.status(500).send({ error: "Failed to add user", details: error.message });
  }
})

router.put('/update_cate/:id', async (req, res) => {
  try {
    const data = await modelCate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to update user", details: error.message });
  }
});

router.delete('/delete_cate/:id', async (req, res) => {
  try {
    const data = await modelCate.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to delete user", details: error.message });
  }
});

// Get all products by category ID
router.get('/fruist_of_cate/:id', async (req, res) => {
  try {
    const products = await modelFruist.find({ id_category: req.params.id }).populate('id_category');
    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to fetch products", details: error.message });
  }
});

module.exports = router;
