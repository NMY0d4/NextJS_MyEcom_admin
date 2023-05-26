import { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

ProductSchema.set('toJSON', {
  versionKey: false,
});

export const Category = models?.Category || model('Category', CategorySchema);
