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
    res.json(await Admin.create({ email }));
  }

  if (req.method === 'GET') {
    res.json(await Admin.find());
  }
}
