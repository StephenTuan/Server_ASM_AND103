var express = require('express');
var router = express.Router();

const modelCate = require('../models/category')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', async(req, res)=> {
   const data = await modelCate.find({});
  try {
    res.send(data);
  } catch (error) {
    console.log(error)
  }
});

// add fruist
router.post('/add', async(req, res)=>{
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

// update user by id
router.put('/update/:id', async (req, res) => {
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

// delete user by id
router.delete('/delete/:id', async (req, res) => {
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

module.exports = router;
