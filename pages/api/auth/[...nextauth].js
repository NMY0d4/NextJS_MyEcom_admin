import clientPromise from '@/lib/mongodb';
import { mongooseConnect } from '@/lib/mongoose';
import { Admin } from '@/models/Admin';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// const adminEmails = ['newmastyoda27@gmail.com'];

async function isAdminEmail(email) {
  await mongooseConnect();
  const foundAdmin = await Admin.findOne({ email });

  return foundAdmin?.email === email;
}

export async function getUserFromMongoDB(email) {
  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection('users').findOne({ email });
  return user;
}

export const authOptions = {
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async (session, user) => {
      if (user) {
        const { email } = user;
        const userFromDB = await getUserFromMongoDB(email);
        session.user = {
          ...user,
          role: userFromDB.role,
        };
      }

      // console.log(session);
      if (
        session.user.role === 'admin' ||
        (await isAdminEmail(session?.user?.email))
      ) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);  
  if (
    session.user.role !== 'admin' &&
    !(await isAdminEmail(session?.user?.email))
  ) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}
