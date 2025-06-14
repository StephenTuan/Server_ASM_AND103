var express = require('express');
var router = express.Router();

const modelFruist = require('../models/fruist')
const modelCate = require('../models/category')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    status: 200,
    message: 'API is working',
    data: 'respond with a resource'
  });
});

// get list fruist
router.get('/list_fruist', async(req, res)=> {
  try {
    const data = await modelFruist.find({}).populate('id_category');
    res.json({
      status: 200,
      message: 'Get list fruits successfully',
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Failed to fetch fruits',
      data: null
    });
  }
});

// add fruist
router.post('/add_fruist', async(req, res)=>{
  try {
    // Kiểm tra category có tồn tại
    const category = await modelCate.findById(req.body.id_category);
    if (!category) {
      return res.status(400).json({
        status: 400,
        message: 'Category not found',
        data: null
      });
    }
    const model = new modelFruist(req.body);
    const data = await model.save();
    res.status(200).json({
      status: 200,
      message: 'Add fruit successfully',
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Failed to add fruit',
      data: null
    });
  }
});

// update fruist
router.put('/update_fruist/:id', async (req, res) => {
  try {
    const data = await modelFruist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: 'Fruit not found',
        data: null
      });
    }
    res.json({
      status: 200,
      message: 'Update fruit successfully',
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Failed to update fruit',
      data: null
    });
  }
});

//delete fruist
router.delete('/delete_fruist/:id', async (req, res) => {
  try {
    const data = await modelFruist.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: 'Fruit not found',
        data: null
      });
    }
    res.json({
      status: 200,
      message: 'Delete fruit successfully',
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Failed to delete fruit',
      data: null
    });
  }
});

// get product detail by id
router.get('/detail_fruist/:id', async(req, res) => {
  try {
    const data = await modelFruist.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: 'Product not found',
        data: null
      });
    }
    res.json({
      status: 200,
      message: 'Get product detail successfully',
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Failed to fetch product details',
      data: null
    });
  }
});

router.get('/list_cate', async(req, res)=> {
  try {
    const data = await modelCate.find({});
    res.json({
      status: 200,
      message: 'Get list categories successfully',
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Failed to fetch categories',
      data: null
    });
  }
});

router.post('/add_cate', async(req, res)=>{
  try {
    const model = new modelCate(req.body);
    const data = await model.save();
    res.status(200).json({
      status: 200,
      message: 'Add category successfully',
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Failed to add category',
      data: null
    });
  }
})

router.put('/update_cate/:id', async (req, res) => {
  try {
    const data = await modelCate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: 'Category not found',
        data: null
      });
    }
    res.json({
      status: 200,
      message: 'Update category successfully',
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Failed to update category',
      data: null
    });
  }
});

router.delete('/delete_cate/:id', async (req, res) => {
  try {
    const data = await modelCate.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: 'Category not found',
        data: null
      });
    }
    res.json({
      status: 200,
      message: 'Delete category successfully',
      data: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Failed to delete category',
      data: null
    });
  }
});

// Get all products by category ID
router.get('/fruist_of_cate/:id', async (req, res) => {
  try {
    const products = await modelFruist.find({ id_category: req.params.id }).populate('id_category');
    res.json({
      status: 200,
      message: 'Get fruits by category successfully',
      data: products
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Failed to fetch products',
      data: null
    });
  }
});

module.exports = router;
