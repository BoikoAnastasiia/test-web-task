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

const fetchComments = ({ currentPage = 1 }) => {
  return axios
    .get(
      `https://jordan.ashton.fashion/api/goods/30/comments?page=${currentPage}`
    )
    .then(response => response.data.data);
};

export default function ListComments() {
  const [comment, setComment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const [allPages, setAllPages] = useState(1);

  useEffect(() => {
    const getComments = () => {
      fetchComments({ currentPage })
        .then(response => {
          setComment(response);
        })
        .catch(console.log());
    };
    getComments();
  }, [currentPage]);

  useEffect(() => {
    const allCommentsData = () => {
      return axios
        .get(`https://jordan.ashton.fashion/api/goods/30/comments`)
        .then(res => setAllPages(res.data.total));
    };
    allCommentsData();
  }, []);

  console.log(comment);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfTheFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comment.slice(
    indexOfTheFirstComment,
    indexOfLastComment
  );
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const updatePage = () => {
    setCurrentPage(prevPage => +prevPage + 1);
  };

  return (
    <div className='CommentsWrapper'>
      <h1>Comments</h1>

      <ul>
        {comment &&
          comment.map(({ name, text, created_at, id }) => (
            <li key={id}>
              <h2 className='name'>{name}</h2>
              <p className='message'>{text}</p>
              <p className='data'>{dateformat(created_at)}</p>
            </li>
          ))}
      </ul>
      <Button
        onClick={updatePage}
        variant='contained'
        color='secondary'
        style={{ margin: '60px auto 10px auto', display: 'block' }}
      >
        load more
      </Button>
      <Pagination
        commentsPerPage={commentsPerPage}
        totalComments={allPages}
        paginate={paginate}
      />
    </div>
  );
}
