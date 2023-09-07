import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, ListGroup, Alert } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import btnStyles from "../styles/Button.module.css";

const ReadingListPage = () => {
    const [readingList, setReadingList] = useState([]);
    const [errors, setErrors] = useState({});
    const history = useHistory();  // <-- Define history here

    useEffect(() => {
        // Fetch the user's reading list from the backend.
        const fetchReadingList = async () => {
            try {
                const response = await axiosReq.get("/reading-list/");
                setReadingList(response.data.results);
            } catch (err) {
                setErrors(err.response?.data);
            }
        };

        fetchReadingList();
    }, []);

    return (
        <Container>
            <h2>Your Reading List</h2>
            <ListGroup>
                {readingList.map((book) => (
                    <ListGroup.Item key={book.id}>
                        {book.title} by {book.author}
                        {/* Optionally add a delete button here */}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <div className="d-flex justify-content-center mt-3">
                <Button
                    className={`${btnStyles.Button} ${btnStyles.Bright}`}
                    onClick={() => history.push("/reading-list/add")}
                >
                    Add a Book
                </Button>
            </div>
            {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                    {message}
                </Alert>
            ))}
        </Container>
    );
};

export default ReadingListPage;
