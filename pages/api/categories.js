import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/category';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
  }

  if (method === 'POST') {
    const { name, parentCategory } = req.body;

    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
    });

    res.json(categoryDoc);
  }

  if (method === 'PUT') {
    const { name, parentCategory, _id } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      { name, parent: parentCategory }
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
