// import React, { useEffect, useState } from "react";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";
// import Review from "./Review";
// import Asset from "../../components/Asset";
// import appStyles from "../../App.module.css";
// import styles from "../../styles/ReviewsPage.module.css";
// import { useLocation } from "react-router";
// import { axiosReq } from "../../api/axiosDefaults";
// import NoResults from "../../assets/no-results.png";
// import Form from "react-bootstrap/Form";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { fetchMoreData } from "../../utils/utils";
// import PopularProfiles from "../profiles/PopularProfiles";

// function ReviewsPage({ message, filter = "" }) {
//   const [reviews, setReviews] = useState({ results: [], next: null });
//   const [hasLoaded, setHasLoaded] = useState(false);
//   const { pathname } = useLocation();
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
//         console.log('Fetched Data:', data);
//         setReviews(data);
//         setHasLoaded(true);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       }
//     };

//     setHasLoaded(false);
//     const timer = setTimeout(() => {
//       fetchReviews();
//     }, 1000);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [filter, query, pathname]);

//   return (
//     <Row className="h-100">
//       <Col className="py-2 p-0 p-lg-2" lg={8}>
//         <p>Popular profiles mobile</p>
//         <i className={`fas fa-search ${styles.SearchIcon}`} />
//         <Form
//           className={styles.SearchBar}
//           onSubmit={(event) => event.preventDefault()}
//         >
//           <Form.Control
//             value={query}
//             onChange={(event) => setQuery(event.target.value)}
//             type="text"
//             className="mr-sm-2"
//             placeholder="Search posts"
//           />
//         </Form>

//         {hasLoaded ? (
//           <>
//             {reviews.results.length ? (
//               <InfiniteScroll
//               dataLength={reviews.results.length}
//               next={() => fetchMoreData(reviews, setReviews)}
//               hasMore={!!reviews.next}
//               loader={<Asset spinner />}
//           >
//                 {reviews.results.map((review) => (
//                   <Review key={review.id} {...review} setReviews={setReviews} />
//                 ))}
//               </InfiniteScroll>
//             ) : (
//               <Container className={`${appStyles.Content} ${styles.container}`}>
//                 <Asset src={NoResults} message={message} />
//               </Container>
//             )}
//           </>
//         ) : (
//           <Container className={`${appStyles.Content} ${styles.container}`}>
//             <Asset spinner />
//           </Container>
//         )}
//       </Col>
//       <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
//         <PopularProfiles />
//       </Col>
//     </Row>
//   );
// }

// export default ReviewsPage;

import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Review from "./Review";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/ReviewsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import Form from "react-bootstrap/Form";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function ReviewsPage({ message, filter = "" }) {
  const [reviews, setReviews] = useState({ results: [], next: null });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        console.log('Fetched Data:', data);
        setReviews(data);
        setHasLoaded(true);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchReviews();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>

        {hasLoaded ? (
          <>
            {reviews.results.length ? (
              <InfiniteScroll
                dataLength={reviews.results.length}
                next={() => fetchMoreData(reviews, setReviews)}
                hasMore={!!reviews.next}
                loader={<Asset spinner />}
              >
                {reviews.results.map((review) => (
                  <Review key={review.id} {...review} setReviews={setReviews} />
                ))}
              </InfiniteScroll>
            ) : (
              <Container className={`${appStyles.Content} ${styles.container}`}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={`${appStyles.Content} ${styles.container}`}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ReviewsPage;
