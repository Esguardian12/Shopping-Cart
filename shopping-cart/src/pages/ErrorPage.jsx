import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h2>Oh no, this route doesn't exist!</h2>
            <p>You might have followed a broken link or entered a URL that doesn't exist.</p>
            <Link to="/">Click here to go back home</Link>
        </div>
    );
}