import { Button } from '@material-ui/core';

export default function Pagination({
  commentsPerPage,
  totalComments,
  paginate,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul>
      {pageNumbers.map(number => (
        <li key={number}>
          <Button
            color='primary'
            variant='outlined'
            onClick={() => paginate(number)}
          >
            {number}
          </Button>
        </li>
      ))}
    </ul>
  );
}
