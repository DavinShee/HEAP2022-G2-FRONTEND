import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { databaseURLs } from '../URLConstants';
import UserIcon from './UserIcon';

const CommentForm = ({ user }) => {
  if (!user) {
    user = null;
  }

  const { id } = useParams();
  const [userComment, setUserComment] = useState('');
  const textDisabled = !user;
  const submitDisabled = !userComment;

  const requestHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  const submitPost = (event) => {
    event.preventDefault();
    event.stopPropagation();
    axios
      .patch(
        databaseURLs.search + `/${id}`,
        JSON.stringify({
          comment: { fullname: user.fullname, comment: userComment }
        }),
        { headers: requestHeader }
      )
      .then((response) => {
        // console.log(response);
        window.location.reload(false);
      })
      .catch((error) => {
        // console.log(error);
        alert('Failed to add comment. Please try again later.');
      });
  };

  return (
    <div className="comment-form" style={{ margin: '5px' }}>
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
