import { render, screen, fireEvent } from '@testing-library/react';
import { PostList } from '../src/components/PostList';
import React from 'react';

describe('PostList', () => {
  const posts = [
    { id: '1', title: 'First Post' },
    { id: '2', title: 'Second Post' },
  ];

  it('renders post titles', () => {
    render(<PostList posts={posts} onSelect={jest.fn()} />);
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
  });

  it('calls onSelect when a post title is clicked', () => {
    const onSelect = jest.fn();
    render(<PostList posts={posts} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Second Post'));
    expect(onSelect).toHaveBeenCalledWith('2');
  });
});
