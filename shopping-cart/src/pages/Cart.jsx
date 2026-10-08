import { useOutletContext, Link } from 'react-router-dom';

export default function Cart() {
    const { cart, updateQuantity } = useOutletContext();

    // Calculate the total price of all items in the cart
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            
            {/* 1. Check if the cart is empty */}
            {cart.length === 0 ? (
                <div>
                    <p>Your cart is currently empty.</p>
                    <Link to="/shop">Continue Shopping</Link>
                </div>
            ) : (
                <>
                    {/* 2. Map through the cart array to render each item */}
                    <ul className="cart-list" style={{ listStyle: 'none', padding: 0 }}>
                        {cart.map((item) => (
                            <li 
                                key={item.id} 
                                style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #ccc', padding: '1rem 0' }}
                            >
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    style={{ width: '60px', height: '60px', objectFit: 'contain' }} 
                                />
                                
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.title}</h4>
                                    <p style={{ margin: 0 }}>${item.price.toFixed(2)}</p>
                                </div>
                                
                                {/* 3. Quantity Controls */}
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>

                                {/* Item Subtotal */}
                                <div style={{ fontWeight: 'bold', width: '80px', textAlign: 'right' }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>

                                {/* 4. Remove Button (Sets quantity to 0) */}
                                <button 
                                    onClick={() => updateQuantity(item.id, 0)}
                                    style={{ marginLeft: '1rem', color: 'red' }}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* 5. Cart Summary */}
                    <div style={{ textAlign: 'right', marginTop: '2rem' }}>
                        <h3>Total: ${cartTotal.toFixed(2)}</h3>
                        <button style={{ padding: '0.5rem 2rem', fontSize: '1.1rem' }}>Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
}