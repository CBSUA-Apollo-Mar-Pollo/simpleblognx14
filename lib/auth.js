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
      if (token) {
        session.user = {
          id: token.activeProfileId || token.id,
          type: token.type || "user",
          name: token.activeName || token.name,
          image: token.activeImage || token.picture,
          handleName: token.handlename,
          bio: token.activeBio || token.bio,
          birthdate: token.type === "user" ? token.birthdate : null,
        };

        // keep real account separately if needed
        session.accountOwner = {
          id: token.accountOwnerId,
          email: token.accountOwnerEmail,
        };
      }

      return session;
    },

    async jwt({ token, trigger, user, session }) {
      console.log(token, "TOKEN");

      // 🔹 Handle profile switching (client calls update())
      if (trigger === "update" && session?.activeProfileId) {
        token.type = session.type; // "user" or "page"
        token.activeProfileId = session.activeProfileId;
      }

      // 🔹 Always load the account owner (main user) from DB
      const dbUser = await db.user.findFirst({
        where: { email: token.email },
      });

      if (!dbUser) {
        if (user) token.id = user.id; // fallback for first sign in
        return token;
      }

      const dbUserProfile = await db.userProfile.findFirst({
        where: {
          userId: dbUser.id,
        },
      });

      // If activeProfileId points to a Page, load that instead
      let activeProfile = dbUserProfile;
      if (token.type === "page" && token.activeProfileId) {
        const dbPage = await db.userProfile.findFirst({
          where: { userId: token.activeProfileId },
        });
        if (dbPage) {
          activeProfile = {
            ...dbPage,
            type: "page",
          };
        }
      }

      return {
        // real account owner (kept hidden unless needed in session)
        accountOwnerId: dbUser.id,
        accountOwnerEmail: dbUser.email,

        // active profile (user or page)
        id: activeProfile.id,
        name: activeProfile.name,
        handlename: activeProfile.handleName,
        picture: activeProfile.image,
        bio: activeProfile.bio,
        birthdate: activeProfile.birthdate,
        type: activeProfile.type || "user",
        activeProfileId: activeProfile.id,
        onboarded: dbUser.onboarded,
      };
    },
    // redirect() {
    //   return "/";
    // },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
