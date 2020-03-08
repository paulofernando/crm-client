import * as yup from 'yup'

const emailRequired = 'Please enter an email address'
const invalidEmail = 'email must be a valid email'
const nameNotLongEnough = 'name must be at least 3 characters'
const nameTooLong = 'name must be between 3 and 20 characters'
const descriptionTooLong = 'description must be a maximun of 5000 characters'
const fieldRequired = 'This field is required'
const invalidCase = 'Invalid case, please choose one from the list'

export const validSchema = yup.object().shape({
    email: yup
        .string()
        .max(100)
        .email(invalidEmail)
        .required(emailRequired),
    firstName: yup
        .string()
        .min(3, nameNotLongEnough)
        .max(20, nameTooLong)
        .required(fieldRequired),
    lastName: yup
        .string()
        .min(3, nameNotLongEnough)
        .max(20, nameTooLong)
        .required(fieldRequired),
    caseId: yup
        .string(),
    title: yup
        .string()
        .max(100)
        .required(fieldRequired),
    description: yup
        .string()
        .max(5000, descriptionTooLong),
    value: yup
        .number()
        .required(fieldRequired),
    courtDate: yup
        .date()
})