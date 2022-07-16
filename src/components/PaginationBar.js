import { Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

const PaginationBar = ({ activePage, pageSize, totalPosts }) => {
  activePage = Number(activePage);
  pageSize = Number(pageSize);
  totalPosts = Number(totalPosts);
  let [searchParams, setSearchParams] = useSearchParams();
  const delta = 2;
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / pageSize);

  for (
    let i = Math.max(1, activePage - delta);
    i <= Math.min(totalPages, activePage + delta);
    i++
  ) {
    pageNumbers.push(i);
  }
  if (pageNumbers[0] > 2) {
    pageNumbers.splice(0, 0, '...');
  }
  if (pageNumbers[0] !== 1) {
    pageNumbers.splice(0, 0, 1);
  }
  if (pageNumbers[pageNumbers.length - 1] < totalPages - 1) {
    pageNumbers.push('...');
  }
  if (pageNumbers[pageNumbers.length - 1] !== totalPages) {
    pageNumbers.push(totalPages);
  }

  return (
    <>
      <Pagination>
        {pageNumbers.map((number, index) => {
          if (number === '...') {
            return <Pagination.Ellipsis key={index} disabled />;
          } else {
            return (
              <Pagination.Item
                key={index}
                active={number === activePage}
                onClick={() => {
                  let updatedSearchParams = new URLSearchParams(
                    searchParams.toString()
                  );
                  updatedSearchParams.set('page-num', number);
                  setSearchParams(updatedSearchParams.toString());
                }}
              >
                {number}
              </Pagination.Item>
            );
          }
        })}
      </Pagination>
    </>
  );
};

export default PaginationBar;
