import { Profile } from 'next-auth';
import type { GitHubProfile } from 'next-auth/providers/github';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    profile: Omit<GitHubProfile, 'id'> & {
      id?: string;
    };
  }

  interface User extends GitHubProfile {
    id: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends JWT {
    user: Omit<GitHubProfile, 'id'> & {
      id?: string;
    };
  }
}
