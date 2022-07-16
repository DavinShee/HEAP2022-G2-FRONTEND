import { Container } from 'react-bootstrap';
import Comment from './Comment';
import CommentForm from './CommentForm';

const Comments = ({ commentsArray, user }) => {
  return (
    <Container>
      <CommentForm user={user} />
      {commentsArray.map((comment, index) => (
        <Comment key={index} commentDetails={comment} />
      ))}
    </Container>
  );
};

export default Comments;
