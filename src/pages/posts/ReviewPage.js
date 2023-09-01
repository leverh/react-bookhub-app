import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import Review from "./Review";

function ReviewPage() {
    const { id } = useParams();
    const [review, setReview] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/${id}`);
                console.log(data);
                setReview(data);
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchReview();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Popular profiles for mobile</p>
                <Review {...review} setReview={setReview} reviewPage />
                <Container className={appStyles.Content}>Comments</Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                Popular profiles for desktop
            </Col>
        </Row>
    );
}

export default ReviewPage;