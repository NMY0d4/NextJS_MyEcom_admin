import { mongooseConnect } from '@/lib/mongoose';
import { isAdminRequest } from './auth/[...nextauth]';
import { Admin } from '@/models/Admin';

export default async function handle(req, res) {
  await mongooseConnect();
  try {
    await isAdminRequest(req, res);
  } catch (error) {
    console.error(error);
  }

  if (req.method === 'POST') {
    const { email } = req.body;
    if (await Admin.findOne({ email })) {
      res.status(400).json({ message: 'admin already exists!' });
    } else {
      res.json(await Admin.create({ email }));
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    await Admin.findByIdAndDelete(id);
    res.json(true);
  }

  if (req.method === 'GET') {
    res.json(await Admin.find());
  }
}
