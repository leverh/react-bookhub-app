import React from 'react';
import styles from '../styles/BookOfTheWeek.module.css';

function BookOfTheWeek({ book }) {
  if (!book) {
    return (
      <div className={styles.bookOfTheWeekContainer}>
        <h2>Book of the Week</h2>
        <p>No books found.</p>
      </div>
    );
  }

  return (
    <div className={styles.bookOfTheWeekContainer}>
      <h2>Book of the Week</h2>
      <h3>{book.title}</h3>
      <p>By: {book.author_name}</p>
    </div>
  );
}

export default BookOfTheWeek;