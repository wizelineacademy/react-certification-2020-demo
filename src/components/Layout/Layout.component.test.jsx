import React from 'react';
import { render, screen } from '@testing-library/react';

import Layout from './Layout.component';

jest.mock('../Navbar', () => () => <nav>Mocked Navbar</nav>);
jest.mock('../Menu', () => () => <div>Mocked Menu</div>);

const mockedProps = {
  children: <div>Test child content</div>,
};

describe('Layout.component', () => {
  it('renders Layout elements', () => {
    render(<Layout {...mockedProps} />);

    expect(screen.getByText('Mocked Navbar')).toBeTruthy();
    expect(screen.getByText('Mocked Menu')).toBeTruthy();
    expect(screen.getByText('Test child content')).toBeTruthy();
  });
});
