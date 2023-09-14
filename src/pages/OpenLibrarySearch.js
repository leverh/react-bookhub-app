import React, { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import appStyles from '../App.module.css';
import btnStyles from "../styles/Button.module.css";
import styles from '../styles/OpenLibrarySearch.module.css'


const OpenLibrarySearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [offset, setOffset] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const [searchInitiated, setSearchInitiated] = useState(false);

    const handleSearch = (newSearch = false) => {
        if (newSearch) {
            setResults([]);
            setOffset(0);
            setSearchInitiated(true);
        }

        fetch(`https://openlibrary.org/search.json?q=${searchTerm}&page=${offset}`)
            .then(response => response.json())
            .then(data => {
                if (data.docs.length === 0) {
                    setHasMore(false);
                } else {
                    setResults(prevResults => [...prevResults, ...data.docs]);
                    setOffset(prevOffset => prevOffset + 1);
                    setHasMore(true);
                }
                setError(null);
            })
            .catch(err => {
                setError('Failed to fetch results. Please try again later.');
                setResults([]);
            });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSearch(true);
    };

    return (
        <div className={`${styles.searchContainer} ${appStyles.containerClass}`}>
            <h2 className={styles.searchHeader}>Search Books on OpenLibrary</h2>
            <form onSubmit={handleFormSubmit}>  {/* Wrap the input and button within this form */}
                <input 
                    type="text" 
                    className={styles.searchInput}
                    placeholder="Search for books..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button className={`${btnStyles.Button} ${styles.searchButton}`} type="submit">Search</button>
            </form>
            {error && <p>{error}</p>}
            {searchInitiated && (
                <InfiniteScroll
                    dataLength={results.length}
                    next={() => handleSearch(false)}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <ul className={styles.searchResults}>
                        {results.map(book => (
                            <li key={book.key}>
                                <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer">
                                    <img src={book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg` : ''} alt={book.title} />
                                    <h3>{book.title}</h3>
                                </a>
                                <p>Author: {book.author_name && book.author_name.join(', ')}</p>
                                <p>First Published: {book.first_publish_year}</p>
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>
            )}
        </div>
    );
}

export default OpenLibrarySearch;
