import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home-container" style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>Welcome to FakeStore!</h1>
            <p>Discover high-quality apparel, electronics, and jewelry at unbeatable prices.</p>
            <Link to="/shop">
                <button style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer'}}>
                    Shop Now
                </button>
            </Link>
        </div>
    );
}