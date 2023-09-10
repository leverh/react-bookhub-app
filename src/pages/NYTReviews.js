import React, { useState, useEffect } from 'react';
import { fetchNYTReviews, fetchNYTTop10 } from '../api/nytAPI';

const NYTReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [top10, setTop10] = useState([]);  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 

    useEffect(() => {
        const fetchTop10Books = async () => {
            try {
                const books = await fetchNYTTop10();
                setTop10(books);
            } catch (err) {
                setError('Failed to fetch top 10 books.');
            }
        };

        fetchTop10Books();  // Fetch top 10 books on component mount
    }, []);

    const getReviews = async (title) => {  
        try {
            setLoading(true);
            const reviewsData = await fetchNYTReviews(title);
            console.log(reviewsData);

            setReviews(reviewsData);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch reviews.');
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>New York Times Book Reviews</h2>
            
            {/* Search input and button */}
            <input 
                type="text" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                placeholder="Search for a book..."
            />
            <button onClick={() => getReviews(searchTerm)}>Search</button>
    
            {loading && <p>Loading reviews...</p>}
            {error && <p>Error: {error}</p>}
            
            {reviews.length === 0 && !loading && <p>No reviews found.</p>}
            
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                    <h3>{review.book_title}</h3>
                    <p>By: {review.byline.slice(3)}</p>
                    <p>{review.summary}</p>
                    <a href={review.url} target="_blank" rel="noopener noreferrer">Read full review</a>
                </li>
                ))}
            </ul>
    
            {/* Display top 10 books */}
            <h3>Top 10 NYT Best Sellers</h3>
            <ul>
                {top10.map((book, index) => (
                    <li key={index}>
                        <h4>{book.title}</h4>
                        <p>By: {book.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
    
}
export default NYTReviews;