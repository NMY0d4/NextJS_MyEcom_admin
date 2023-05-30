import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { isAdminRequest } from './auth/[...nextauth]';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  try {
    await isAdminRequest(req, res);

    if (method === 'GET') {
      if (req.query?.id) {
        res.json(await Product.findById(req.query.id));
      } else {
        res.json(await Product.find());
      }
    }

    if (method === 'POST') {
      const productDoc = await Product.create({ ...req.body });
      res.json(productDoc);
    }

    if (method === 'PUT') {
      await Product.updateOne({ _id: req.body._id }, { ...req.body });
      res.json(true);
    }

    if (method === 'DELETE') {
      if (req.query?.id) {
        await Product.deleteOne({ _id: req.query?.id });
        res.json(true);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
}
