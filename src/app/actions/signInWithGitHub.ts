'use server';

import { signIn } from '@/auth';

export const signInWithGitHub = async () => {
  await signIn('github');
};
