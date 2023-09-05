
import axios from 'axios';

const BASE_URL = 'https://bookhub-rdf-api-9aad7672239c.herokuapp.com/api';

// Fetch the reading list for the logged-in user
export const fetchReadingList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/books/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reading list:", error);
        throw error;
    }
}

// Add a book to the reading list
export const addBookToReadingList = async (bookId) => {
    try {
        const response = await axios.post(`${BASE_URL}/books/${bookId}/add/`);
        return response.data;
    } catch (error) {
        console.error("Error adding book to reading list:", error);
        throw error;
    }
}

// Remove a book from the reading list
export const removeBookFromReadingList = async (bookId) => {
    try {
        const response = await axios.post(`${BASE_URL}/books/${bookId}/remove/`);
        return response.data;
    } catch (error) {
        console.error("Error removing book from reading list:", error);
        throw error;
    }
}
