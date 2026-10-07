import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading]= useState(true);
    const { addToCart } = useOutletContext();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading shop...</div>;

    return (
        <div className="product-grid">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
        </div>
    );

} 