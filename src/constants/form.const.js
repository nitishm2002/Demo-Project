export const FormValidationMessages = {
    EMAIL: {
        required: 'Email is required',
        invalid: 'Must be a valid email address',
    },
    PASSWORD: {
        required: 'Password is required',
        minLength: 8,
        minLengthErrorMessage: 'Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase',
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        patternErrorMessage: 'Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase'
    },
    FULL_NAME: {
        required: 'Full name is required',
        pattern: /^[a-zA-Z ]+$/,
        patternErrorMessage: 'Full name must be characters only'
    },
    MOBILE_NUMBER: {
        required: 'Mobile number is required',
        pattern: /^\d{10}$/,
        patternErrorMessage: 'Must contain only numeric digits and only 10 digits',
        matchMessage: "Mobile number must be exactly 10 digits"
    },
    CITY_NAME: {
        required: 'City Name is required',
    },
    COUNTRY: {
        required: 'Country is required',
    },
    IS_USER_CONSENT: {
        required: 'User Consent is required',
    }
}