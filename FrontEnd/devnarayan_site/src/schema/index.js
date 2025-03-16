import * as Yup from 'yup';

export const loginFormScheama = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email address is required"),
    password: Yup.string().required("Password is required")
})

export const signupFormSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email address is required"),
    username: Yup.string().trim()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username can be at most 20 characters')
        .matches(/^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/, 'Special characters is not allowed')
        .test(
            'no-leading-trailing-special',
            'Username cannot start or end with special characters',
            value => {
                return !/^[^a-zA-Z0-9]|[^a-zA-Z0-9]$/.test(value);
            }
        )
        .required('Username is required'),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Password can be at most 50 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
        )
        .required('Password is required'),

    confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
        
    mobile_number : Yup.string()
        .matches(/^[6-9]\d{9}$/, 'Invalid phone number')
        .required('Phone number is required')
});