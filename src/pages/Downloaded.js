import { useContext } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { databaseURLs } from '../URLConstants';
import { UserContext } from '../components/UserContext';
import CardList from '../components/CardList';
import PaginationBar from '../components/PaginationBar';
import useFetch from '../hooks/useFetch';
import signinbackground from '../images/Search_bg.png';

const Downloaded = () => {
  const { user } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const pageNum = searchParams.get('page-num') || 1;
  const pageSize = searchParams.get('page-size') || 6;
  const { data, loading, error } = useFetch(
    databaseURLs.downloadHist + `/${user.email}?page-num=${pageNum}`
  );

  return (
    <div
      style={{
        backgroundImage: `url(${signinbackground})`,
        backgroundSize: '750px',
        height:'92vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover'
      }}
    >
    <div className="downloaded-notes">
      {loading && (
        <div className="loading">
          <Container>
            <Spinner animation="grow" variant="info" />
          </Container>
        </div>
      )}
      {error && <div>{error}</div>}
      {data && !loading && !error && (
        <>
          {data && data.data && data.data.downloadHistory && (
            <>
              <div className="search-header">
                <h1>Downloaded Notes ({data.data.numberOfDownloadHistory})</h1>
                <PaginationBar
                  activePage={pageNum}
                  pageSize={pageSize}
                  totalPosts={data.data.numberOfDownloadHistory}
                />
              </div>
              <CardList notes={data.data.downloadHistory} />
              <PaginationBar
                activePage={pageNum}
                pageSize={pageSize}
                totalPosts={data.data.numberOfDownloadHistory}
              />
            </>
          )}
        </>
      )}
    </div>
    </div>
  );
};

export default Downloaded;
