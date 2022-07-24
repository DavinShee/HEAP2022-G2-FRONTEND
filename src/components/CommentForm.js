import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { databaseURLs } from '../URLConstants';
import UserIcon from './UserIcon';

const CommentForm = ({ user, commentsArray }) => {
  if (!user) {
    user = null;
  }

  const [ratings, setRatings] = useState(0);
  const [hover, setHover] = useState(0);
  const { id } = useParams();
  const [userComment, setUserComment] = useState('');
  const textDisabled = !user;
  let submitDisabled = true;

  if (!user) {
    submitDisabled = true;
  } else if (commentsArray.some((comment) => comment.email === user.email)) {
    console.log('comment alrd exists?');
    submitDisabled = true;
  } else {
    submitDisabled = false;
  }

  const requestHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  const requestHeader2 = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  const submitPost = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(
      databaseURLs.rating,
      JSON.stringify({ noteId: id, rating: ratings })
    );
    if (!submitDisabled) {
      axios.post(
        databaseURLs.rating,
        JSON.stringify({ noteId: id, rating: ratings }),
        { headers: requestHeader2 }
      );

      axios
        .patch(
          databaseURLs.search + `/${id}`,
          JSON.stringify({
            comment: {
              fullname: user.fullname,
              email: user.email,
              comment: userComment
            }
          }),
          { headers: requestHeader }
        )
        .then((response) => {
          window.location.reload(false);
        })
        .catch((error) => {
          alert('Failed to add comment. Please try again later.');
        });
    } else {
      alert('You sneaky bastard!');
    }
  };

  return (
    <div className="comment-form" style={{ margin: '5px' }}>
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || ratings) ? 'on' : 'off'}
              onClick={() => setRatings(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(ratings)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
      <Row>
        <Col xs="auto">
          <UserIcon name={user ? user.fullname : '-'} />
        </Col>
        <Col>
          <Row>{user ? user.fullname : 'Login/Signup to post a comment!'}</Row>
          <Form onSubmit={submitPost}>
            <Form.Group>
              <Form.Label>Comments:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                disabled={textDisabled}
                value={userComment}
                onChange={(event) => {
                  setUserComment(event.target.value);
                }}
              />
            </Form.Group>
            <Button disabled={submitDisabled} type="submit">
              Post
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CommentForm;
