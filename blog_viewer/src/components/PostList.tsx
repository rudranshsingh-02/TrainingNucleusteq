import React from 'react';

type Post = {
  id: string;
  title: string;
};

type PostListProps = {
  posts: Post[];
  onSelect: (id: string) => void;
};

export const PostList: React.FC<PostListProps> = ({ posts, onSelect }) => (
  <ul className="space-y-2">
    {posts.map((post) => (
      <li
        key={post.id}
        className="cursor-pointer text-blue-600 hover:underline"
        onClick={() => onSelect(post.id)}
      >
        {post.title}
      </li>
    ))}
  </ul>
);