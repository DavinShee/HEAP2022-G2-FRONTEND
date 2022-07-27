import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center' }}>
      <Row>
        <Col xs={3} height={'100vh'}>
          <img
            src="https:cdn-icons-png.flaticon.com/512/7465/7465691.png"
            alt="No Results!"
            height={'100px'}
          />
        </Col>
        <Col
          style={{
            display: 'flex',
            verticalAlign: 'middle',
            textAlign: 'center'
          }}
        >
          <span className="my-auto">
            Error - The requested resource could not be found. <br />
            Click{' '}
            <button className="link-button" onClick={() => navigate('/')}>
              Here
            </button>{' '}
            to go to the home page, or{' '}
            <button className="link-button" onClick={() => navigate(-1)}>
              Here
            </button>{' '}
            to go back.
          </span>
        </Col>
      </Row>
    </div>
  );
}

export default ErrorPage;
