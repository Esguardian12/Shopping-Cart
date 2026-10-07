import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';

export default function Layout() {
    const [cart, setCart] = useState([]);

    // Calculate total items for the navbar badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const addToCart = (product, quantity) => {
        setCart(prevCart => {
            const existing = prevCart.find(item => item.id === product.id);
            if (existing) {
                return prevCart.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [ ...prevcart, { ...product, quantity}];
        });
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            setCart(prevCart => prevCart.filter(item => item.id !== id));
            return;
        }
        setCart(prevCart => prevCart.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    return (
        <>
        <Navbar cartCount={totalItems} />
        <main>
            <Outlet context={{ cart, addToCart, updateQuantity}} />
        </main>
        </>
    );
}