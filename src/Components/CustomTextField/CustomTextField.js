import React from 'react'
import {useField} from 'formik'
import TextField from '@material-ui/core/TextField'

const CustomTextField = ({placeholder, type='text', ...props}) => {
  const [field, meta] = useField(props)
  const {touched, error} = meta
  const errorText = error && touched ? error : ""
  return (
    <TextField
    placeholder={placeholder}
    {...field}
    type={type}
    helperText={errorText}
    error={!!errorText}
    />
  )
}

export default CustomTextField