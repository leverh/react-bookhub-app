import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Alert, Image } from "react-bootstrap";
import styles from "../../styles/ReviewCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";
import defaultBookCover from "../../assets/defaultBookCover.jpg";
import Upload from "../../assets/upload.jpg";
import Asset from "../../componenets/Asset";

const ReviewCreateForm = () => {
    const [reviewData, setReviewData] = useState({
      book_title: "",
      review_text: "",
      book_cover: defaultBookCover,
    });
    const { book_title, review_text, book_cover } = reviewData;
  
    const [errors, setErrors] = useState({});
  
    const history = useHistory();
  
    const handleChange = (event) => {
      setReviewData({
        ...reviewData,
        [event.target.name]: event.target.value,
      });
    };
  
    const handleImageChange = (event) => {
      if (event.target.files.length) {
        URL.revokeObjectURL(book_cover);
        setReviewData({
          ...reviewData,
          book_cover: URL.createObjectURL(event.target.files[0]),
        });
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("book_title", book_title);
      formData.append("review_text", review_text);
      formData.append(
        "book_cover",
        book_cover ? book_cover : defaultBookCover
      );
  
      try {
        await axios.post("/reviews/create/", formData);
        history.push("/reviews");
      } catch (err) {
        setErrors(err.response?.data);
      }
    };

    return (
      <Container className={`${appStyles.Content} ${styles.Container}`}>
        <h1 className={styles.Header}>Add a Book Review</h1>
  
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="book_title">
            <Form.Label>Book Title</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              placeholder="Enter book title"
              name="book_title"
              value={book_title}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.book_title?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}
  
          <Form.Group controlId="review_text">
            <Form.Label>Review</Form.Label>
            <Form.Control
              className={styles.Input}
              as="textarea"
              rows={3}
              placeholder="Write your review here"
              name="review_text"
              value={review_text}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.review_text?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}
  
          <Form.Group className="text-center">
            {book_cover ? (
              <>
                <figure>
                  <Image className={appStyles.Image} src={book_cover} rounded />
                </figure>
                <div>
                  <Form.Label
                    className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                    htmlFor="image-upload"
                  >
                    Change the image
                  </Form.Label>
                </div>
              </>
            ) : (
              <Form.Label
                className="d-flex justify-content-center"
                htmlFor="image-upload"
              >
                <Asset
                  src={Upload}
                  message="Click or tap to upload an image"
                />
              </Form.Label>
            )}
            <Form.File
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
  
          <Button
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
            type="submit"
          >
            Submit Review
          </Button>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} variant="warning" className="mt-3">
              {message}
            </Alert>
          ))}
        </Form>
      </Container>
    );
  };
  
  export default ReviewCreateForm;