import { useState } from 'react';
import { GetStaticProps } from 'next';
import { PostList } from '../components/PostList';
import { PostDetail } from '../components/PostDetail';

export type Post = {
  id: string;
  title: string;
  content: string;
};

type Props = {
  posts: Post[];
};

export default function PostsPage({ posts }: Props) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleSelect = (id: string) => {
    const post = posts.find((p) => p.id === id) || null;
    setSelectedPost(post);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Blog Posts</h1>
      <PostList posts={posts} onSelect={handleSelect} />
      <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/posts');
  const posts = await res.json();
  return { props: { posts } };
};
