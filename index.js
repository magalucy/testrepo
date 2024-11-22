const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongo-crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));

// Define Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});

// Create Product Model
const Product = mongoose.model('Product', productSchema);

// Add Products
const addProducts = async () => {
    const product1 = new Product({ name: 'Laptop', price: 50000, category: 'Electronics' });
    const product2 = new Product({ name: 'Smartphone', price: 30000, category: 'Electronics' });
    const product3 = new Product({ name: 'Table', price: 10000, category: 'Furniture' });
    
    await product1.save();
    await product2.save();
    await product3.save();

    console.log("Products added with ID:", product1._id, product2._id, product3._id);
};

// List All Products
const listProducts = async () => {
    const products = await Product.find();
    console.log("Listing all products:");
    products.forEach(product => {
        console.log(product);
    });
};

// Update Product (Example)
const updateProduct = async () => {
    const result = await Product.updateOne(
        { name: 'Smartphone' },
        { $set: { price: 35000 } }
    );
    console.log(`Updated ${result.nModified} product(s).`);
};

// Delete Product (Example)
const deleteProduct = async () => {
    const result = await Product.deleteOne({ name: 'Table' });
    console.log(`Deleted ${result.deletedCount} product(s).`);
};

// Main function to execute CRUD operations
const main = async () => {
    await addProducts();
    await listProducts();
    await updateProduct();
    await listProducts();
    await deleteProduct();
    await listProducts();

    mongoose.connection.close();
};

main().catch(err => console.log(err));
