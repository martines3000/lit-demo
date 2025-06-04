import { auth } from '@/auth';
import { Home } from './Home';

export default async function Page() {
  const session = await auth();

  return (
    <main>
      <Home session={session} />
    </main>
  );
}
