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
  let textDisabled = !user;
  let submitDisabled = true;

  if (!user) {
    submitDisabled = true;
  } else if (commentsArray.some((comment) => comment.email === user.email)) {
    submitDisabled = true;
    textDisabled = true;
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
    // console.log(
    //   databaseURLs.rating,
    //   JSON.stringify({ noteId: id, rating: ratings })
    // );
    if (ratings === 0 || !userComment) {
      alert('Please rate the note and leave a comment!');
    } else if (!submitDisabled) {
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
        .then((_response) => {
          window.location.reload(false);
        })
        .catch((_error) => {
          alert('Failed to add comment. Please try again later.');
        });
    } else {
      alert('You sneaky bastard!');
    }
  };

  return (
    <div className="comment-form" style={{ margin: '5px' }}>
      <Row>
        <Col xs="auto">
          <UserIcon name={user ? user.fullname : '-'} />
        </Col>
        <Col style={{ paddingLeft: '0px' }}>
          <Row style={{ paddingLeft: '12px' }}>
            <Col style={{ paddingLeft: '0px' }}>
              {user ? user.fullname : 'Login/Signup to post a comment!'}
            </Col>
          </Row>
          <Form onSubmit={submitPost}>
            <Row>
              <Col style={{ textAlign: 'left' }}>
                <div className="star-rating">
                  {[...Array(5)].map((_star, index) => {
                    index += 1;
                    return (
                      <button
                        disabled={submitDisabled}
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
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    disabled={textDisabled}
                    value={userComment}
                    onChange={(event) => {
                      setUserComment(event.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={1}>
                <Button disabled={submitDisabled} type="submit">
                  Post
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CommentForm;
