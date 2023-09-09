import React from 'react';
import styles from './BookOfTheWeek.module.css'; // You can create a CSS module for styling

function BookOfTheWeek({ book }) {
  if (!book) return null;

  return (
    <div className={styles.bookOfTheWeekContainer}>
      <h2>Book of the Week</h2>
      <img src={book.image_url} alt="Book cover" className={styles.bookCover} />
      <h3>{book.title}</h3>
      <p>By: {book.author_name}</p>
      <p>{book.content}</p>
      <div>Likes: {book.likes_count}</div>
      <div>Comments: {book.comments_count}</div>
    </div>
  );
}

export default BookOfTheWeek;
