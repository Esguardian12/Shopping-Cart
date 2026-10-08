import { useState } from 'react';

export default function ProductCard({ product, onAdd }) {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(q => q + 1);
    const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));
    const handleChange = (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val > 0) setQuantity(val);
    };


    return (
        <div className="card">
            <div className="img-container">
                <img src={product.image} alt={product.title} />
            </div>
            <h3 className="card-title">{product.title}</h3>
            <p className="card-price">${product.price.toFixed(2)}</p>

            <div className="card-controls">
                <button aria-label="decrement" onClick={handleDecrement}>-</button>
                <input 
                    type="number" 
                    value={quantity} 
                    onChange={handleChange} 
                    min="1" 
                />
                <button aria-label="increment" onClick={handleIncrement}>+</button>
            </div>

            <button className="add-btn" onClick={() => onAdd(product, quantity)}>Add To Cart</button>
        </div>
    );
}