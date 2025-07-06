import React from 'react';

type Post = {
  id: string;
  title: string;
  content: string;
};

type PostDetailProps = {
  post: Post | null;
  onClose: () => void;
};

export const PostDetail: React.FC<PostDetailProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-xl max-w-md w-full relative">
        <button className="absolute top-2 right-2 text-gray-600 text-xl" onClick={onClose}>
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">{post.title}</h2>
        <p>{post.content}</p>
      </div>
    </div>
  );
};