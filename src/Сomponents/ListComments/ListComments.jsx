import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios'

function dateformat(date) {
  const data = new Date(date)
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return data.toLocaleString('ru',options)
}


export default function ListComments() {
  const [comment, setComment] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [commentsPerPage, setCommentsPerPage]=useState(10)

  useEffect(() => {
    const fetchComments = async ()=>
    fetch(`https://jordan.ashton.fashion/api/goods/30/comments?page=${page}`)
      .then(res => res.json())
      .then(json => setComment(json));
  }, [page]);

  const loadPage = () => setPage(+page + 1);

  
  return (
    <div className="CommentsWrapper">
      <h1>Comments</h1>

      <ul>
         {comment.data && comment.data.map(({ name, text, created_at, id }) => (
          <li key={id}>
            <h2 className="name">{name}</h2>
            <p className="message">{text}</p>
            <p className="data">{dateformat(created_at)}</p>
          </li>
        ))}
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