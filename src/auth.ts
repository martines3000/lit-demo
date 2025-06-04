import NextAuth, { User } from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      async profile(profile) {
        return {
          ...profile,
          id: profile.id.toString(),
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, account }) {
      console.log(account);
      if (user) {
        token.user = user;
      }

      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },
    session({ session, token }) {
      session.profile = token.user;
      session.accessToken = token.access_token;

      return session;
    },
  },
});
