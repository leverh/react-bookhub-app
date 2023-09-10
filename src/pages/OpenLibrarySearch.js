
import React, { useState } from 'react';

const OpenLibrarySearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = () => {
        fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                setResults(data.docs);
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
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
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
        </div>
    );
}

export default OpenLibrarySearch;
