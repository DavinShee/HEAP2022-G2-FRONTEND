import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center' }}>
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
    </div>
  );
}

export default ErrorPage;
