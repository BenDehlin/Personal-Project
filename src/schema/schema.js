import * as yup from 'yup'

export const loginSchema = yup.object({
  username: yup.string().required().min(4).max(20),
  password: yup.string().required().min(10).max(30)
})

export const postSchema = yup.object({
  post_title: yup.string().required().min(5).max(20),
  post_content: yup.string().required().max(2500),
  post_img: yup.string().url().notRequired().max(200)
})

const registerSchema = yup.object({
  username: yup.string().required().max(20),
  first: yup.string().required().max(20),
  last: yup.string().required().max(20),
  age: yup.number().notRequired().integer().max(150),
  email: yup.string().email().required().max(200),
  img: yup.string().url().notRequired().max(200),
  password: yup.string().required().min(10).max(30)
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})/,
  "Must contain Uppercase, Lowercase, Number, Special Character"),
  confirm: yup.string().required().min(10).max(30)
  .oneOf([yup.ref('password'), 'Passwords must match'])
})

export default registerSchema