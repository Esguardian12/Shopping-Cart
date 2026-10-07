import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../components/ProductCard';

const mockProduct = {id: 1, title: 'Fjallraven Backpack', price: 109.95 };

test('increments quantity and calls onAdd with correct data', async () => {
    const mockOnAdd = vi.fn();
    const user = userEvent.setup();

    render(<ProductCard product = {mockProduct} onAdd={mockOnAdd} />);

    const incrementBtn = screen.getByRole('button', { name: '+' });
    const input = screen.getByRole('spinbutton');
    const addBtn = screen.getByRole('button', { name: /add to cart/i });

    // Increment twice
    await user.click(incrementBtn);
    await user.click(incrementBtn);

    expect(input).toHaveValue(3);

    // Submit to cart
    await user.click(addBtn);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith(mockProduct, 3);
});