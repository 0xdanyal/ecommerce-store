import Product from '../models/productModel.js';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'name, description, price, category are required' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//======================================================

// PUT /api/products/edit/:id
// update a product by id nad only admin who created it can update
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // only the admin who created it can edit
    if (product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed to edit this product' });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/products/delte/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed to delete this product' });
    }

    await product.deleteOne();

    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};  