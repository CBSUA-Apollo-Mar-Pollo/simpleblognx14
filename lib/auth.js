import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import { db } from "./db";
import { signInFormValidator } from "./validators/signInForm";
import { getUserByEmail, getUserById } from "@/data/user";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = signInFormValidator.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // allow oauth without email verifiication
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (!token) return session;

      if (token.isFirstSignIn) {
        session.user = {
          id: token.accountOwnerId,
          name: token.name,
          email: token.email,
          image: token.picture,
          onboarded: false,
        };
        return session;
      }

      session.user = {
        id: token.id,
        type: token.type,
        name: token.name,
        image: token.picture,
        handleName: token.handlename,
        bio: token.bio,
        birthdate: token.type === "user" ? token.birthdate : null,
      };

      session.accountOwner = {
        id: token.accountOwnerId,
        email: token.accountOwnerEmail,
      };

      return session;
    },
    async jwt({ token, trigger, user, session }) {
      // 🔹 FIRST SIGN IN (Credentials or OAuth)
      if (user && !token.accountOwnerId) {
        token.accountOwnerId = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      // 🔹 Handle profile switching
      if (trigger === "update" && session?.activeProfileId) {
        token.activeProfileId = session.activeProfileId;
        token.type = session.type ?? "user";
      }

      // 🔒 Hard guard — identity must exist
      if (!token.accountOwnerId) {
        return token;
      }

      // 🔹 Load real account owner
      const dbUser = await db.user.findUnique({
        where: { id: token.accountOwnerId },
      });

      if (!dbUser) {
        return token;
      }

      // 🔹 Load default user profile
      const userProfile = await db.userProfile.findFirst({
        where: { userId: dbUser.id },
      });

      // 🔹 First-time onboarding
      if (!userProfile) {
        return {
          ...token,
          isFirstSignIn: true,
          onboarded: dbUser.onboarded,
        };
      }

      let activeProfile = userProfile;

      // 🔹 Page profile switch
      if (token.type === "page" && token.activeProfileId) {
        const pageProfile = await db.userProfile.findUnique({
          where: { id: token.activeProfileId },
        });

        if (pageProfile) {
          activeProfile = {
            ...pageProfile,
            type: "page",
          };
        }
      }

      // 🔹 SAFE TOKEN MERGE
      return {
        ...token,

        // Account owner (hidden)
        accountOwnerId: dbUser.id,
        accountOwnerEmail: dbUser.email,

        // Active profile
        id: activeProfile.id,
        name: activeProfile.name,
        handlename: activeProfile.handleName,
        picture: activeProfile.image,
        bio: activeProfile.bio,
        birthdate: activeProfile.birthdate,
        type: activeProfile.type ?? "user",
        activeProfileId: activeProfile.id,
        onboarded: dbUser.onboarded,
      };
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
