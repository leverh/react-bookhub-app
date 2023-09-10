import React, { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

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

    return (
        <div>
            <h2>Search Books on OpenLibrary</h2>
            <input 
                type="text" 
                placeholder="Search for books..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <button onClick={() => handleSearch(true)}>Search</button>
            {error && <p>{error}</p>}
            {searchInitiated && (
                <InfiniteScroll
                    dataLength={results.length}
                    next={() => handleSearch(false)}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <ul>
                        {results.map(book => (
                            <li key={book.key}>
                                <img src={book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg` : ''} alt={book.title} />
                                <h3>{book.title}</h3>
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
