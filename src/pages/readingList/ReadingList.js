
import React, { useState, useEffect } from 'react';
import {
    fetchReadingList,
    addBookToReadingList,
    removeBookFromReadingList
} from '../../api/readingListAPI';

const ReadingList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchReadingList();
                setBooks(data);
            } catch (error) {
                console.error("Error fetching reading list:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Reading List</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author}
                        <button onClick={() => removeBookFromReadingList(book.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            {/* Here you can add functionalities to search and add new books */}
        </div>
    );
}

export default ReadingList;
