import React, { useState } from 'react';
import { Card, Button, Container, Form, Row, Col } from 'react-bootstrap'

import axios from 'axios'

const addReview = () => {
  // review rating  description
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')

  useEffect(() => {

    const getSingleReviewData = async () => {
      const { data } = await axios.get('/api/reviews/add')
      console.log(data)

      setDescription(data.description)
      setReviews(data.review)


    }
    getSingleReviewData()

  })
  const addReviewHandler = async (e) => {

    e.preventDefault()

    let review = {
      product_id: id,
      rating: rating,
      description: description
    }

    await axios.post(`/api/Review/addReview/${id}`, review)

    history.push('/Review')
  }

  return (
    <>
      <Container className="mt-10 p-4">
        <h2 className='text-center'>Add Review</h2>
        <hr />


        <Row>

          <Col md={4} lg={4} sm={4}>

            <Form onSubmit={addReviewHandler}>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  type="number"
                />
              </Form.Group>



              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  as="textarea"
                />
              </Form.Group>


              <Button variant="primary" type="submit">
                Add Review
              </Button>
            </Form>

            <br />

            <h5>Product Reviews</h5>
            <hr />

            {reviews.length > 0 ? (
              reviews.map(review => {
                return <p key={review.id}>Rating: {review.rating} <br /> {review.description}</p>
              })
            ) : (<p> No reviews for this product </p>)}


          </Col>
        </Row>




      </Container>





    </>
  )

}



export default addReview;