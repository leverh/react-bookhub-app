import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import btnStyles from "../styles/Button.module.css";

const ReadingListForm = () => {
    const [bookData, setBookData] = useState({
        title: "",
        author: ""
    });
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (event) => {
        setBookData({
            ...bookData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            // Directly create a new book and add it to the user's reading list
            await axiosReq.post("/reading-list/books/", JSON.stringify(bookData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            // After adding the book, redirect to the reading list page
            history.push("/reading-list");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };
    
    return (
        <Container>
            <h2>Add a Book</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Book Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={bookData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        value={bookData.author}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button
                    className={`${btnStyles.Button} ${btnStyles.Bright}`}
                    type="submit"
                >
                    Add to Reading List
                </Button>
            </Form>
            {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                    {message}
                </Alert>
            ))}
        </Container>
    );
};

export default ReadingListForm;
