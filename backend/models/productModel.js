const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter Description'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter Price'],
      maxLength: [8, 'Price can not exceed 8 character'],
    },
    rating: {
      type: Number,
      required: [true, 'Please enter rading'],
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, 'Please enter category'],
    },
    Stock: {
      type: Number,
      required: [true, 'Please enter Stock'],
      maxLength: [4, 'Stock can not exceed 4 character'],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews:[
        {
            name:{
                type: String,
                required: true            
            },
            name:{
                type: Number,
                required: true            
            },
            Comment:{
                type: String,
                required: true
            }
        }
    ],

    user:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
      required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model ('Product', productSchema);
