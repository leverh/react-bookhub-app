import React from 'react';
import styles from '../styles/AboutUs.module.css'; 

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <h2>About BookHub</h2>
      <div className={`${styles['arrow-divider']}`}></div>
      <p>Welcome to BookHub, the ultimate platform for book enthusiasts around the world. At 
         BookHub, we believe that books have the power to change lives, spark conversations, and 
         bring people together.
      </p>

        <h3>Our Mission</h3>
        <div className={`${styles['arrow-divider']}`}></div>
        <p>Our mission is to create a digital space where users can share their thoughts on books, 
           discover new titles, and connect with a community of like-minded readers. Whether you're 
           searching for your next read, writing a review, or simply browsing through the latest New
           York Times Best Sellers, BookHub has something for everyone.
        </p>
        

        <h3>Features</h3>
        <div className={`${styles['arrow-divider']}`}></div>
        <ul>
            <li><span>Book Reviews:</span> Share your thoughts on the books you've read and discover reviews from other members.</li>
            <li><span>NYT Best Sellers:</span> Stay updated with the latest top 10 books from the New York Times Best Sellers list.</li>
            <li><span>User Profiles:</span> Create your own profile, follow other users, and build your reading community.</li>
            <li><span>Open Library Search:</span> Dive deep into the vast collections <a href='https://openlibrary.org/'>OpenLibrary</a> and find any book you're looking for.</li>
        </ul>
        <div className={`${styles['arrow-divider']}`}></div>
        <h4>Become a part of our growing community and embark on a literary journey like no other. Dive deep into the world of books and let your voice be heard.</h4>

      
    </div>
  );
}

export default AboutUs;
