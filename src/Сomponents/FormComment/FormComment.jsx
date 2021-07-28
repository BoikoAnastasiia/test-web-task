import React from 'react';
import { Formik, Form } from 'formik';
import { TextField, Button, TextareaAutosize } from '@material-ui/core';
import * as yup from 'yup';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';

const validationSchema = yup.object({
  name: yup.string().required('Заполните все поля'),
  comment: yup.string().required('Заполните все поля'),
});

export default function FormComments() {
  return (
    <div>
      <h1>Ваш комментарий</h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: '',
          comment: '',
        }}
        onSubmit={async (values, { resetForm }) => {
          fetch('https://jordan.ashton.fashion/api/goods/30/comments', {
            method: 'POST',
            body: JSON.stringify(values, null, 2),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(response => response.json())
            .then(post => console.log(post))
            .catch(error => console.log(error));
          resetForm();
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className='formCommentsWrapper'>
            <TextField
              onChange={handleChange}
              name='name'
              placeholder='Имя'
              value={values.name}
            />

            <TextareaAutosize
              aria-label='empty textarea'
              onChange={handleChange}
              name='comment'
              placeholder='Комментарий'
              value={values.comment}
              style={{
                outline: 'none',
                border: '1px rgba(245, 0, 87, 0.5) solid',
                padding: 10,
                borderRadius: 4,
                fontFamily: 'Lato',
                '&::placeholder': {
                  fontFamily: 'Lato',
                },
              }}
            />

            <Button type='submit' variant='outlined' color='secondary'>
              отправить <ArrowForwardIosSharpIcon style={{ fontSize: 15 }} />
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}