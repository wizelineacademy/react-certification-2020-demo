import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Card from './Card.component';

const cardMock = {
  id: 1234,
  publishTime: Date.now(),
  title: 'Title',
  description: 'Description',
  img: 'image.jpg',
  onClick: jest.fn(),
};

describe('Card.component', () => {
  it('renders the Card elements', () => {
    render(<Card {...cardMock} />);

    const image = screen.getByTitle(cardMock.title);

    expect(screen.getByText(cardMock.title)).toBeTruthy();
    expect(screen.getByText(cardMock.description)).toBeTruthy();
    expect(image).toBeTruthy();
    expect(image.style.backgroundImage).toContain(cardMock.img);
  });

  it('handles click event', () => {
    render(<Card {...cardMock} />);

    const { onClick, ...eventPayload } = cardMock;

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledWith(expect.objectContaining(eventPayload));
  });
});
