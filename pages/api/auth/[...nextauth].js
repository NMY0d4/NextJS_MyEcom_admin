import clientPromise from '@/lib/mongodv';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

async function getUserFromMongoDB(email) {
  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection('users').findOne({ email });
  return user;
}

export default NextAuth({
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
        const { email } = user; // Assurez-vous que 'user' est défini avant de déstructurer ses propriétés
        const userFromDB = await getUserFromMongoDB(email);
        session.user = {
          ...user,
          ...userFromDB,
        };
      }
      return session;
    },
  },
});
