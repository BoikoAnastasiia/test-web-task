import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Pagination from '../Pagination';

function dateformat(date) {
  const data = new Date(date);
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return data.toLocaleString('ru', options);
}

export default function ListComments() {
  const [comment, setComment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [commentsPerPage] = useState(10);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://jordan.ashton.fashion/api/goods/30/comments`
      );
      setComment(res.data);
      setLoading(false);
    };
    fetchComments();
  }, []);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfTheFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comment?.data?.slice(
    indexOfTheFirstComment,
    indexOfLastComment
  );
  console.log(currentComments);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='CommentsWrapper'>
      <h1>Comments</h1>

      <ul>
        {!loading &&
          currentComments.map(({ name, text, created_at, id }) => (
            <li key={id}>
              <h2 className='name'>{name}</h2>
              <p className='message'>{text}</p>
              <p className='data'>{dateformat(created_at)}</p>
            </li>
          ))}
      </ul>
      <Button
        onClick={loadPage}
        variant='contained'
        color='secondary'
        style={{ margin: '60px auto 10px auto', display: 'block' }}
      >
        load more
      </Button>
      <Pagination
        commentsPerPage={commentsPerPage}
        totalComments={comment.length}
        paginate={paginate}
      />
    </div>
  );
}
