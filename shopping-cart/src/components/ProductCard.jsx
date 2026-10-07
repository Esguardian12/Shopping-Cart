import { useState } from 'react';

export default function ProductCard({ product,onAdd }) {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(q = q + 1);
    const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));
    const handleChange = (e) => {
        const val = parseInt(e.target.value);
        if (!NaN(val) && val > 0) setQuantity(val);
    };


    return (
        <div className="card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>

            <div className="controls">
                <button onClick={handleDecrement}>-</button>
                <input type="number" value={quantity} onChange={handleChange} min="1" />
                <button onClick={handleIncrement}>+</button>
            </div>

            <button onClick={() => onAdd(product, quantity)}>Add To Cart</button>
        </div>
    );
}