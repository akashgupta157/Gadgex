import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import dbConnect from "@/utils/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await dbConnect();
        try {
          let existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            existingUser = await User.create({
              name: user.name,
              email: user.email,
              password: null,
            });
          }
          user.id = existingUser._id.toString();
          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        const customToken = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET
        );
        token.token = customToken;

        await dbConnect();
        const fullUser = await User.findById(user.id)
          .select("_id name email address")
          .lean();
        token.user = {
          _id: fullUser._id.toString(),
          name: fullUser.name,
          email: fullUser.email,
          address: fullUser.address || {},
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          ...token.user,
          token: token.token,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
