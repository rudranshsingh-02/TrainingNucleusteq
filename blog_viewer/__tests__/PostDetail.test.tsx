import { render, screen, fireEvent } from '@testing-library/react';
import { PostDetail } from '../src/components/PostDetail';
import React from 'react';

describe('PostDetail', () => {
  const post = { id: '1', title: 'Hello', content: 'World' };

  it('renders post title and content', () => {
    render(<PostDetail post={post} onClose={() => {}} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('renders nothing if post is null', () => {
    const { container } = render(<PostDetail post={null} onClose={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<PostDetail post={post} onClose={onClose} />);
    fireEvent.click(screen.getByText('×'));
    expect(onClose).toHaveBeenCalled();
  });
});
