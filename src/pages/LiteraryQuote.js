import React, { useState, useEffect } from 'react';

function LiteraryQuote() {
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                setQuote(data);
            })
            .catch(err => {
                console.error('Error fetching quote:', err);
            });
    }, []);

    return (
        <div style={{ fontStyle: 'italic', border: '1px solid #ccc', padding: '20px', margin: '20px 0' }}>
            {quote ? (
                <>
                    <p>"{quote.content}"</p>
                    <p>- {quote.author}</p>
                </>
            ) : (
                <p>Loading quote...</p>
            )}
        </div>
    );
}

export default LiteraryQuote;
