import * as yub from 'yup'

export const loginSchema = yub.object().shape({
    username: yub.string().required(),
    password: yub.string().min(4).required()
})