// import mongoose from "mongoose";

// const ProductStatSchema = new mongoose.Schema(
//   {
//     productId: String,
//     yearlySalesTotal: Number,
//     yearlyTotalSoldUnits: Number,
//     year: Number,
//     monthlyData: [
//       {
//         month: String,
//         totalSales: Number,
//         totalUnits: Number,
//       },
//     ],
//     dailyData: [
//       {
//         date: String,
//         totalSales: Number,
//         totalUnits: Number,
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const ProductStat = mongoose.model("ProductStat", ProductStatSchema);
// export default ProductStat;
import mongoose from "mongoose";

const APISchema = new mongoose.Schema({
  EmployeeID: {
    type: Number,
    required: true,
    unique: true
  },
  api: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: String, // or Date if you want actual timestamps
    default: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
  },
  Country: {
    type: String,
    default: "Global" // Placeholder
  },
  employee: {
    type: String,
    required: true
  }
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

const Api = mongoose.model('Api', APISchema);
export default Api;
