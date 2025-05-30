var express = require('express');
var router = express.Router();

const modelFruist = require('../models/fruist')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', async(req, res)=> {
   const data = await modelFruist.find({});
  try {
    res.send(data);
  } catch (error) {
    console.log(error)
  }
});

//get list category
router.get('/list_cate', async(req, res) => {
  try {
    const categories = await modelFruist.distinct('category');
    res.send(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to fetch categories", details: error.message });
  }
});

// add fruist
router.post('/add', async(req, res)=>{
  try {
    const model = new modelFruist(req.body);
    const data = await model.save();
    res.send(data);
  } catch (error) {
    console.log(error);
    // Send error response to client
    res.status(500).send({ error: "Failed to add user", details: error.message });
  }
})

// update user by id
router.put('/update/:id', async (req, res) => {
  try {
    const data = await modelFruist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to update user", details: error.message });
  }
});

// delete user by id
router.delete('/delete/:id', async (req, res) => {
  try {
    const data = await modelFruist.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to delete user", details: error.message });
  }
});

// get product detail by id
router.get('/detail/:id', async(req, res) => {
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

module.exports = router;
