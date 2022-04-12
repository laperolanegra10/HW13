const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
  // find all categories
  // be sure to include its associated Products
router.get('/', (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product, 
          attributes: ['product_name']
        }
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product, 
          attributes: ['product_name']
        }
      ],
    });

    if(!categoryData) {
      res.status(404).json({message: 'Category not found'});
      return;
    };

    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});
 // create a new category
router.post('/', (req, res) => {
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
