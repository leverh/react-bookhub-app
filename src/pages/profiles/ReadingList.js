import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReadingList({ user }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://my-json-server.typicode.com/typicode/demo/posts`);
        setBooks(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h2>My Reading List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadingList;



// import React, { useState, useEffect } from 'react';
// import { axiosReq, axiosRes } from '../../api/axiosDefaults';
// import { useCurrentUser } from '../../contexts/CurrentUserContext';
// import { useParams } from "react-router-dom";

// function ReadingList() {
//     const [books, setBooks] = useState([]);
//     const [author, setAuthor] = useState('');
//     const [newBook, setNewBook] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const currentUser = useCurrentUser();
//     const [isOwner, setIsOwner] = useState(false); // New state to determine ownership
//     const { userId } = useParams();

//     useEffect(() => {
//         const fetchReadingList = async () => {
//             try {
//                 let endpoint = '/reading-list/books/';
//                 if (userId) {
//                     endpoint = `/users/${userId}/books/`;
//                 }
//                 const response = await axiosRes.get(endpoint);
//                 console.log("Server response:", response.data);
        
//                 if (Array.isArray(response.data.results)) {
//                     setBooks(response.data.results);
//                 } else {
//                     setError('Unexpected data format received.');
//                 }
        
//                 setIsOwner(response.data.is_owner);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };
        
        
//         fetchReadingList();
//     }, [userId]);

//     const handleAddBook = async () => {
//         try {
//             const bookResponse = await axiosReq.post('/reading-list/books/', { title: newBook, author: author }, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
            
//             const addResponse = await axiosReq.post(`/reading-list/books/${bookResponse.data.id}/add/`);
            
//             if (addResponse.status === 200) {
//                 setBooks(prevBooks => [...prevBooks, bookResponse.data]);
//             }
//             setNewBook('');
//             setAuthor('');
//         } catch (err) {
//             setError(err.message);
//         }
//     };
    
    

//     const handleRemoveBook = async (bookId) => {
//         try {
//             await axiosRes.delete(`/reading-list/books/${bookId}/remove/`);
//             setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="reading-list-container">
//             <h2>My Reading List</h2>
            
//             {isOwner && (
//                 <div className="add-book">
//                     <input 
//                         type="text" 
//                         placeholder="Book Title" 
//                         value={newBook} 
//                         onChange={e => setNewBook(e.target.value)} 
//                     />
//                     <input 
//                         type="text" 
//                         placeholder="Author Name" 
//                         value={author} 
//                         onChange={e => setAuthor(e.target.value)} 
//                     />
//                     <button onClick={handleAddBook}>Add</button>
//                 </div>
//             )}

// <div className="book-list">
//     {books.map(book => (
//         <div key={book.id} className="book-item">
//             <strong>Title:</strong> {book.title} <br />
//             <strong>Author:</strong> {book.author} <br />
//             {isOwner &&  (
//                 <button onClick={() => handleRemoveBook(book.id)}>Remove</button>
//             )}
//         </div>
//     ))}
// </div>

//         </div>
//     );
// }

// export default ReadingList;
