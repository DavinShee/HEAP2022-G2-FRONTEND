import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Comment from './Comment';
import CommentForm from './CommentForm';
import PaginationPreloaded from './PaginationPreloaded';

const Comments = ({ commentsArray, user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(10);
  const lastCommentIndex = currentPage * commentsPerPage;
  const firstCommentIndex = lastCommentIndex - commentsPerPage;
  const currentComments = commentsArray.slice(
    firstCommentIndex,
    lastCommentIndex
  );

  return (
    <Container>
      <CommentForm user={user} commentsArray={commentsArray} />
      <hr />
      {currentComments.map((comment, index) => (
        <>
          <Comment key={index} commentDetails={comment} />
          {index !== currentComments.length - 1 ? <hr /> : <></>}
        </>
      ))}
      <PaginationPreloaded
        activePage={currentPage}
        pageSize={commentsPerPage}
        setCurrentPage={setCurrentPage}
        totalComments={commentsArray.length}
      />
    </Container>
  );
};

export default Comments;
