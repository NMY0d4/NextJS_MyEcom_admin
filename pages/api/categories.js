import { mongooseConnect } from '@/lib/mongoose';
import { Category } from './models/Category';
import { isAdminRequest } from './auth/[...nextauth]';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
  }

  if (method === 'POST') {
    const { name, parentCategory, properties } = req.body;

    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });

    res.json(categoryDoc);
  }

  if (method === 'PUT') {
    const { name, parentCategory, properties, _id } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      { name, parent: parentCategory, properties }
    );
    res.json(categoryDoc);
  }

  if (method === 'DELETE') {
    if (req.query?._id) {
      try {
        await Category.deleteOne({ _id: req.query._id });
        res.json(true);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: 'An error occurred while deleting the category' });
      }
    } else {
      res.status(400).json({ error: 'Missing category ID' });
    }
  }
}
