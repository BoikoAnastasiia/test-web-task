import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

export default function ListComments() {
  const [comment, setComment] = useState([]);
  const [page, setPage] = useState([1]);

  useEffect(() => {
    fetch(`https://jordan.ashton.fashion/api/goods/30/comments?page=${page}`)
      .then(res => res.json())
      .then(json => setComment(json));
  }, [page]);

  const loadPage = () => setPage(page + 1);

  return (
    <div className="CommentsWrapper">
      <h1>Comments</h1>

      <pre> {JSON.stringify(comment.data)} </pre>
      <ul>
        {/* {JSON.stringify(comment.data).map(({ name, text, created_at, id }) => (
          <li key={id}>
            <h2>{name}</h2>
            <p>{text}</p>
            <p>{created_at}</p>
          </li>
        ))} */}
      </ul>
      <Button
        onClick={loadPage}
        variant="contained"
        color="secondary"
        style={{ margin: '60px auto 10px auto', display: 'block' }}
      >
        load more
      </Button>
    </div>
  );
}