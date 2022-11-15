import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ListComponent from '../src/components/List';

describe('ListComponent', () => {
  it('should display title', () => {
    act(() => {
      render(<ListComponent />);
    });
    expect(screen.findByText('To Do List')).toBeDefined();
  })

  it('should add to list', () => {
    act(() => {
      render(<ListComponent />);
    });
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'lorem ipsum' } });
    act(() => {
      screen.getByRole('button', {name: 'Add'}).click();
    });
    expect(screen.findByRole('lorem ipsum')).toBeDefined();
  })
})