const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Define a route for the root path
app.get('/', (req, res) => {
    // Send a welcome message
    res.send('<p>Welcome to DressStore application.</p>');
  });

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error(err);
  });

// Product model
const Product = require('./models/product');

// Product controller
const productController = require('./controllers/productController');

// Routes for CRUD operations
app.get('/products', productController.getAllProducts);                             // Get all products
app.get('/products/:id', productController.getProductById);                         // Get a product by id
app.post('/products', productController.createProduct);                             // Create a new product
app.put('/products/:id', productController.updateProduct);                          // Update a product by id
app.delete('/products/:id', productController.deleteProduct);                       // Delete a product by id
app.delete('/products', productController.deleteAllProducts);                       // Delete all products
app.get('/products/search', productController.findProductsByName);                  // Find all products whose name contains 'kw'

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
