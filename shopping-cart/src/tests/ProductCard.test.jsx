import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, test, expect} from 'vitest';
import ProductCard from '../components/ProductCard';

const mockProduct = {
    id: 1,
    title: 'Fjallraven Backpack',
    price: 109.95,
    image: 'https://fakeStoreapi.com/img/1.jpg'
};

describe('ProductsCard Component', () => {
    test('renders product information correctly', () => {
        render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);

        expect(screen.getByText('Fjallraven Backpack')).toBeInTheDocument();
        expect(screen.getByText('$109.95')).toBeInTheDocument();
        expect(screen.getByRole('spinbutton')).toHaveValue(1);
    });

    test('increments and decrements quantity state', async () => {
        const user = userEvent.setup();
        render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);

        const incBtn = screen.getByRole('button', { name: /increment/i });
        const decBtn = screen.getByRole('button', { name: /decrement/i });
        const input = screen.getByRole('spinbutton');

        await user.click(incBtn);
        expect(input).toHaveValue(2);

        await user.click(decBtn);
        expect(input).toHaveValue(1);

        //Quantity should not drop below 1
        await user.click(decBtn);
        expect(input).toHaveValue(1);
    });

    test('calls onAdd with product details and current quantity', async () => {
        const mockOnAdd = vi.fn();
        const user = userEvent.setup();
        render(<ProductCard product={mockProduct} onAdd={mockOnAdd} />);

        const incBtn = screen.getByRole('button', { name: /increment/i });
        const addBtn = screen.getByRole('button', { name: /add to cart/i });

        await user.click(incBtn); // quantity = 2
        await user.click(addBtn);

        expect(mockOnAdd).toHaveBeenCalledTimes(1);
        expect(mockOnAdd).toHaveBeenCalledWith(mockProduct, 2);
    });
});