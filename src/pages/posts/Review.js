import React, { useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip, Modal, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/Review.module.css";

const Review = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count: initialLikesCount,
    like_id: initialLikeId,
    title,
    author_name,
    isbn,
    content,
    image,
    updated_at,
    reviewPage,
    setReviews,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const history = useHistory();

  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [likeId, setLikeId] = useState(initialLikeId);

  const handleEdit = () => {
    history.push(`/reviews/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/posts/${id}/`);
      setShowDeleteModal(true); // modal after successful deletion
    } catch (err) {
      // console.log(err);
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    history.goBack();
  };

  const handleLike = async () => {
    try {
      if (likeId) {
        await axiosRes.delete(`/likes/${likeId}/`);
        setLikesCount((prev) => prev - 1);
        setLikeId(null);
      } else {
        const { data } = await axiosRes.post("/likes/", { post: id });
        setLikesCount((prev) => prev + 1);
        setLikeId(data.id);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
    <Card className={styles.Review}>
      <Card.Body>
        <Media className="align-items-center justify-content-between d-flex align-items-center cardy-top">
          <Link to={`/profiles/${profile_id}`} className={styles.linkStyle}>
            <Avatar src={profile_image} height={65} />
            <span className={styles.ownerStyle}>{owner}</span>
          </Link>
          <div className={styles.flexContainer}>
            <span className={styles.dateStyle}>{updated_at}</span>
            {is_owner && reviewPage && (
              <MoreDropdown
                className={styles.dropdownStyle}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/reviews/${id}`}>
        <Card.Img src={image} alt={title} className={styles.ReviewImage}/>
      </Link>
      <Card.Body>
      {title && <Card.Title className={styles.cardTitle}>{title}</Card.Title>}

        {author_name && <Card.Text className={styles.AuthorName}>{author_name}</Card.Text>}
        {isbn && <Card.Text className={styles.ISBN}>ISBN: {isbn}</Card.Text>}
        {content && <Card.Text className={styles.Content}>{content}</Card.Text>}
        <div className={styles.ReviewBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own review!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : likeId ? (
            <span onClick={handleLike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like reviews!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}

          <span className={styles.iconCount}>{likesCount}</span>
          <Link to={`/reviews/${id}`}>
            <i className="far fa-comments" />
          </Link>
          <span className={styles.iconCount}>{comments_count}</span>
        </div>
      </Card.Body>
    </Card>
    <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Review Deleted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your review has been successfully deleted.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Review;