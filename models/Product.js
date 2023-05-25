import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

ProductSchema.set('toJSON', {
  versionKey: false,
});

export const Product = models.Product || model('Product', ProductSchema);