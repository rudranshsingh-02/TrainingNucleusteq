import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Blog Viewer</h1>
      <Link href="/posts" className="text-blue-600 underline">
        Go to Posts Page →
      </Link>
    </div>
  );
}
