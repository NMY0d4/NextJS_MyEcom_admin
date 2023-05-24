import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import mongoose from 'mongoose';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === 'POST') {
    const productDoc = await Product.create({ ...req.body });
    res.json(productDoc);
  }
}
