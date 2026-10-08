import { render, screen } from '@testing-library/react';
import { vi, describe, test, expect, afterEach } from 'vitest';
import Shop from '../pages/Shop';

// Mock react-router-dom context
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useOutletContext: () => ({ addToCart: vi.fn() }),
    };
});

describe('Shop Page', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('displays loading state initially and then renders fetched products', async () => {
        const mockProducts = [
            { id: 1, title: 'Fjallraven Backpack', price: 109.95, image: 'https://fakestoreapi.com/img/1.jpg'},
            { id: 2, title: 'Mens Casual T-Shirt', price: 22.3, image: 'https://fakestoreapi.com/img/2.jpg'},
        ];

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockProducts,
        });

        render(<Shop />);

        expect(screen.getByText(/loading products.../i)).toBeInTheDocument();

        const product1 = await screen.findByText('Fjallraven Backpack');
        const product2 = await screen.findByText('Mens Casual T-Shirt');

        expect(product1).toBeInTheDocument();
        expect(product2).toBeInTheDocument();
    });

    test('displays error message when fetch fails', async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error('Failed to load'));

        render(<Shop />);

        const errorMsg = await screen.findByText(/error: failed to load/i);
        expect(errorMsg).toBeInTheDocument();
    });
});