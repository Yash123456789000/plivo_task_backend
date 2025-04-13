import mongoose from "mongoose";

const WebsiteSchema = new mongoose.Schema({
  traffic: {
    type: String,
    default: '1K',
  },
  owner: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: String, // or Date if you're storing proper ISO date strings
    default: new Date().toISOString(),
  },
  company: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    default: 'USA',
  },
  Status: {
    type: String,
    enum: ['pending', 'active', 'complete', 'canceled', 'rejected'],
    required: true,
  },
  StatusBg: {
    type: String,
    default: '#03C9D7',
  },
  ProductImage: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // adds createdAt and updatedAt fields automatically
});

const Website = mongoose.model('Website', WebsiteSchema);
export default Website;
