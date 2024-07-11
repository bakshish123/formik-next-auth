'use client'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { signUpSchema } from '@/schema'
import { useRouter } from 'next/navigation'

const UserForm = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const initialValues = {
    name: '',
    email: '',
    password: '',
  }

  const onSubmit = async (values, { resetForm }) => {
    console.log('onSubmit function called with values:', values)
    try {
      const res = await fetch('/api/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      console.log('Fetch response status:', res.status)

      if (!res.ok) {
        const response = await res.json()
        setErrorMessage(response.message)
        console.log('Error response:', response)
      } else {
        setErrorMessage('')
        resetForm() 
        console.log('User created successfully, redirecting...')
        setTimeout(() => {
          router.push("/")
        }, 1000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrorMessage('An unexpected error occurred. Please try again later.')
    }
  }

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit,
  })

  return (
    <>
      <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-3 w-1/2">
        <h1>Create New User</h1>
        <div>
          <label>Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            required={true}
            value={values.name}
            className="m-2 bg-slate-400 rounded"
            onBlur={handleBlur}
          />
          {errors.name && touched.name ? <p className="form-error">{errors.name}</p> : null}
        </div>
        <div>
          <label>Email</label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={handleChange}
            required={true}
            value={values.email}
            className="m-2 bg-slate-400 rounded"
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? <p className="form-error">{errors.email}</p> : null}
        </div>
        <div>
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            required={true}
            value={values.password}
            className="m-2 bg-slate-400 rounded"
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? <p className="form-error">{errors.password}</p> : null}
        </div>
        <input type="submit" value="Create User" className="bg-blue-300 hover:bg-blue-100" />
      </form>
      {errorMessage && <p className="form-error">{errorMessage}</p>}
    </>
  )
}

export default UserForm
