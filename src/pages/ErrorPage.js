import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div>
      Error - The requested resource could not be found. <br />
      Click <Link to="/">Here</Link> to go back to the home page
    </div>
  );
}

export default ErrorPage;
