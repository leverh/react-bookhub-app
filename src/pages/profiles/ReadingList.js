
import React, { useState, useEffect } from 'react';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
// import styles from '../../styles/ReadingList.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';

function ReadingList() {
    const [books, setBooks] = useState([]);
    const [author, setAuthor] = useState('');
    const [newBook, setNewBook] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchReadingList = async () => {
            try {
                const response = await axiosRes.get('/reading-list/books/');
                console.log("Server response:", response.data);

                if (Array.isArray(response.data.results)) {
                    setBooks(response.data.results);
                }
                 else {
                    setError('Unexpected data format received.');
                }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchReadingList();
    }, []);

    const handleAddBook = async () => {
        try {
            const response = await axiosReq.post('/reading-list/books/', { title: newBook, author: author }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            setBooks(prevBooks => [...prevBooks, response.data]);
            setNewBook('');
            setAuthor('');
        } catch (err) {
            setError(err.message);
        }
    };
    

    const handleRemoveBook = async (bookId) => {
        try {
            await axiosRes.delete(`/reading-list/books/${bookId}/remove/`);
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="reading-list-container">
            <h2>My Reading List</h2>
            
            {currentUser && (
                <div className="add-book">
                    <input 
                        type="text" 
                        placeholder="Book Title" 
                        value={newBook} 
                        onChange={e => setNewBook(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Author Name" 
                        value={author} 
                        onChange={e => setAuthor(e.target.value)} 
                    />
                    <button onClick={handleAddBook}>Add</button>
                </div>
            )}

<div className="book-list">
    {books.map(book => (
        <div key={book.id} className="book-item">
            <strong>Title:</strong> {book.title} <br />
            <strong>Author:</strong> {book.author} <br />
            {currentUser && (
                <button onClick={() => handleRemoveBook(book.id)}>Remove</button>
            )}
        </div>
    ))}
</div>

        </div>
    );
}

export default ReadingList;
