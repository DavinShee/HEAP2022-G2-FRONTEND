import { Pagination } from 'react-bootstrap';

const PaginationPreloaded = ({
  activePage,
  pageSize,
  setCurrentPage,
  totalComments
}) => {
  const delta = 2;
  const pageNumbers = [];
  const totalPages = Math.ceil(totalComments / pageSize);

  // Logic to get the page numbers to be displayed.
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

  return totalPages <= 1 ? (
    <></>
  ) : (
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
                setCurrentPage(number);
              }}
            >
              {number}
            </Pagination.Item>
          );
        }
      })}
    </Pagination>
  );
};

export default PaginationPreloaded;
