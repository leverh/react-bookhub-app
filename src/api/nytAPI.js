const NYT_API_KEY = 'rSGhhI8F45E4JgI8myNemmjWx7YXu43h';
const NYT_ENDPOINT = 'https://api.nytimes.com/svc/books/v3/reviews.json';

export const fetchNYTReviews = async (title = "The Seven Moons of Maali Almeida") => {
    try {
        const response = await fetch(`${NYT_ENDPOINT}?title=${encodeURIComponent(title)}&api-key=${NYT_API_KEY}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        throw error;
    }
}

export const fetchNYTTopBooks = async () => {
    const NYT_BEST_SELLERS_ENDPOINT = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json';

    try {
        const response = await fetch(`${NYT_BEST_SELLERS_ENDPOINT}?api-key=${NYT_API_KEY}`);
        const data = await response.json();
        return data.results.books; 
    } catch (error) {
        throw error;
    }
}

