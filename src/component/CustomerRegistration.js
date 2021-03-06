import React from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import styled from 'styled-components'

let ProfileSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email('DAS IST KEINE GUELTIGE EMAIL ADRESSE, DU HONK!!!')
    .max(50, 'Too Long!')
    .required('Required'),
})

export default function CustomerRegistration({ onRegistration }) {
  return (
    <Formik
      initialValues={{ name: '', email: '' }}
      validationSchema={ProfileSchema}
      onSubmit={(values, { setSubmitting }) => {
        axios
          .post('http://localhost:2020/customers', {
            name: values.name,
            email: values.email,
          })
          .then(() => {
            alert('Danke für Ihre Daten. Wir werden sie demnächst verkaufen :P')
            onRegistration({
              name: values.name,
              email: values.email,
            })
            setSubmitting(false)
          })
          .catch((error) => {
            alert('Sie sind hier nicht willkommen.')
            console.log(error)
          })
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <FormStyled className="formik" onSubmit={handleSubmit}>
          <Field
            id="name"
            type="name"
            name="name"
            placeholder="Ihr werter Name"
          />
          <ErrorMessageStyled name="name" component="div" />
          <Field
            id="email"
            type="email"
            name="email"
            placeholder="Ihre elektronische Adresse"
          />
          <ErrorMessageStyled name="email" component="div" />
          <ButtonStyled type="submit" disabled={isSubmitting}>
            Submit
          </ButtonStyled>
        </FormStyled>
      )}
    </Formik>
  )
}

const ErrorMessageStyled = styled(ErrorMessage)`
  border: 2px dashed hotpink;
  color: hotpink;
  padding: 5px;
  margin-bottom: 10px;
`

const ButtonStyled = styled.button`
  color: white;
`
const FormStyled = styled.form`
  input {
    font-size: 1.2rem;
    margin-bottom: 15px;
    border: none;
    border-radius: 3px;
    padding: 5px;
    width: 80%;
  }

  button {
    font-size: 1.1rem;
    border: none;
    color: var(--base);
    background-color: var(--text);
    padding: 10px;
    border-radius: 3px;
  }
`
