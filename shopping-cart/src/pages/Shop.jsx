import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading]= useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useOutletContext();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then((res) => {
            if (!res.ok) throw new Error('Network response failed');
            return res.json();
        })
        .then((data) => {
            setProducts(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="status-msg">Loading products...</div>;
    if (error) return <div className="status-msg error">Error: {error}</div>

    return (
        <div className="shop-container">
            <h2>Shop Collection</h2>
            <div className="product-grid">
                {products.map(product => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
            </div>
        </div>
    );

} 