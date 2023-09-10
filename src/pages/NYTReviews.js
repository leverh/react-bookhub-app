import React, { useState, useEffect } from 'react';
import { fetchNYTReviews, fetchNYTTopBooks } from '../api/nytAPI';

const NYTReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [topBooks, setTopBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 

    const getReviews = async (title) => {  
        try {
            setLoading(true);
            const reviewsData = await fetchNYTReviews(title);
            setReviews(reviewsData);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch reviews.');
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchTopBooks = async () => {
            try {
                const booksData = await fetchNYTTopBooks();
                setTopBooks(booksData);
            } catch (err) {
                console.error('Failed to fetch top books:', err);
            }
        };

        fetchTopBooks();
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        getReviews(searchTerm);
    };

    return (
        <div>
            <h2>New York Times Book Reviews</h2>
            
            <form onSubmit={handleFormSubmit}>
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    placeholder="Search for a book..."
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading reviews...</p>}
            {error && <p>Error: {error}</p>}
    
            {reviews.length === 0 && !loading && <p>No reviews found.</p>}
    
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <h3>{review.book_title}</h3>
                        <p>By: {review.book_author}</p>
                        <p>{review.summary}</p>
                        <a href={review.url} target="_blank" rel="noopener noreferrer">Read full review</a>
                    </li>
                ))}
            </ul>
            
            <h3>Top 10 NYT Books</h3>
            <ul>
                {topBooks.slice(0, 10).map((book, index) => (
                    <li key={index}>
                        <h4>{book.title}</h4>
                        <p>By: {book.author}</p>
                        {}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NYTReviews;
