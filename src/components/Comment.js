import { Col, Row } from 'react-bootstrap';
import UserIcon from '../components/UserIcon';

const Comment = ({ commentDetails }) => {
  const commentDate = new Date(commentDetails.dateTime).toLocaleDateString(
    'en-SG'
  );

  return (
    <div className="comment" style={{ margin: '5px' }}>
      <Row>
        <Col xs="auto">
          <UserIcon name={commentDetails.fullname} />
        </Col>
        <Col>
          <Row style={{ fontWeight: 'bold' }}>
            {commentDetails.fullname} &nbsp;&nbsp;&nbsp;{commentDate}
          </Row>
          <Row>{commentDetails.comment}</Row>
        </Col>
      </Row>
    </div>
  );
};

export default Comment;
