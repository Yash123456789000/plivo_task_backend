// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema(
//   {
//     name: String,
//     price: Number,
//     description: String,
//     category: String,
//     rating: Number,
//     supply: Number,
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", ProductSchema);
// export default Product;
import mongoose from "mongoose";

const DatabaseSchema = new mongoose.Schema({
  CustomerID: {
    type: Number,
    required: true,
    unique: true
  },
  CustomerName: {
    type: String,
    required: true
  },
  CustomerEmail: {
    type: String,
    required: true
  },
  CustomerImage: {
    type: String, // store image URL or filename
    required: false
  },
  ProjectName: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    enum: ['Active', 'Pending', 'Completed', 'Canceled'],
    required: true
  },
  StatusBg: {
    type: String,
    required: false
  },
  Weeks: {
    type: String, // or Number if it's always numeric
    default: '0',
  },
  Budget: {
    type: String, // or Number (you'd need to parse "$2.4k" if so)
    default: '$100',
  },
  Location: {
    type: String,
    default: 'Global',
  }
}, {
  timestamps: true
});

const Database = mongoose.model('Database', DatabaseSchema);
export default Database;
